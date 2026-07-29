import React, { useEffect, useState, useCallback } from 'react';
import {
  adminLogout,
  AnushamEvent,
  createAnushamEvent,
  updateAnushamEvent,
  deleteAnushamEvent,
  isSupabaseConfigured,
} from '../admin/auth';
import { getAnushamEvents, invalidateRemoteCache, Event } from '../data/events';

interface AdminPageProps {
  onLogout: () => void;
  navigate: (path: string) => void;
}

const defaultPrograms = [
  'Avahanthi Homam',
  'Periyava Panchalogha Vighragham & Padhukha Purappadu along with Uthagashanthi parayanam',
  'Annadhanam'
];

const defaultDescriptionFor = (date: string) =>
  `Anusham pooja for Sri Mahaperiyava held on ${date}.`;

const formatDateInput = (raw: string) => {
  if (!raw) return '';
  const d = new Date(raw);
  if (isNaN(d.getTime())) return raw;
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

const todayDateInputValue = () => {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const uniqueId = (date: string) =>
  `anusham-${slugify(date) || Date.now().toString()}`;

interface DonorRow {
  name: string;
  city: string;
}

const parseDonors = (donors: string[] = []): DonorRow[] =>
  donors.map(d => {
    const m = d.match(/^(.*)\s+\(([^)]+)\)$/);
    return m ? { name: m[1].trim(), city: m[2].trim() } : { name: d, city: '' };
  });

const serializeDonors = (donors: DonorRow[]): string[] =>
  donors.map(d => d.city ? `${d.name} (${d.city})` : d.name);

interface FormState {
  id: string;
  title: string;
  date: string;
  dateInput: string;
  description: string;
  programs: string[];
  donors: DonorRow[];
  mediaUrl: string;
  status: string;
}

const computeAutoStatus = (date: string) => {
  return new Date(date + ' 00:00:00') > new Date() ? 'upcoming' : 'completed';
};

const eventToForm = (e: Event): FormState => ({
  id: e.id,
  title: e.title,
  date: e.date,
  dateInput: '',
  description: e.description || '',
  programs: e.programs ? [...e.programs] : [...defaultPrograms],
  donors: parseDonors(e.donors),
  mediaUrl: e.mediaUrl || '',
  status: e.status || '',
});

const newEventForm = (): FormState => {
  const today = new Date();
  const formatted = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  return {
    id: '',
    title: 'ANUSHAM POOJA',
    date: formatted,
    dateInput: todayDateInputValue(),
    description: defaultDescriptionFor(formatted),
    programs: [...defaultPrograms],
    donors: [],
    mediaUrl: '',
    status: '',
  };
};

const AdminPage: React.FC<AdminPageProps> = ({ onLogout, navigate }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [selectedId, setSelectedId] = useState<string>('');
  const [form, setForm] = useState<FormState | null>(null);
  const [newProgram, setNewProgram] = useState('');
  const [newDonorName, setNewDonorName] = useState('');
  const [newDonorCity, setNewDonorCity] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const refresh = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      invalidateRemoteCache();
      const list = await getAnushamEvents();
      setEvents(list);
      if (list.length > 0 && !selectedId && !isCreating) {
        setSelectedId(list[0].id);
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to load events');
    } finally {
      setLoading(false);
    }
  }, [selectedId, isCreating]);

  useEffect(() => {
    refresh();
  }, []);

  useEffect(() => {
    if (isCreating) {
      setForm(newEventForm());
      return;
    }
    if (selectedId) {
      const e = events.find(ev => ev.id === selectedId);
      if (e) setForm(eventToForm(e));
    } else {
      setForm(null);
    }
  }, [selectedId, events, isCreating]);

  const setPrograms = (programs: string[]) => form && setForm({ ...form, programs });
  const setDonorsField = (donors: DonorRow[]) => form && setForm({ ...form, donors });

  const addProgram = () => {
    if (!form) return;
    const t = newProgram.trim();
    if (t && !form.programs.includes(t)) { setPrograms([...form.programs, t]); setNewProgram(''); }
  };
  const removeProgram = (i: number) => form && setPrograms(form.programs.filter((_, idx) => idx !== i));

  const addDonor = () => {
    if (!form) return;
    const name = newDonorName.trim();
    if (!name) return;
    setDonorsField([...form.donors, { name, city: newDonorCity.trim() }]);
    setNewDonorName('');
    setNewDonorCity('');
  };
  const removeDonor = (i: number) => form && setDonorsField(form.donors.filter((_, idx) => idx !== i));

  const autoStatus = form ? computeAutoStatus(form.date) : 'upcoming';

  const handleSave = async () => {
    if (!form) return;
    setSaving(true);
    setMessage('');
    try {
      const finalId = form.id || uniqueId(form.date);
      const payload: AnushamEvent = {
        id: finalId,
        title: form.title || 'ANUSHAM POOJA',
        date: form.date,
        description: form.description,
        programs: form.programs,
        donors: form.donors.map(d => d.city ? `${d.name} (${d.city})` : d.name),
        status: form.status || undefined,
        mediaUrl: form.mediaUrl,
      };
      if (isCreating) {
        const created = await createAnushamEvent(payload);
        setMessage('Event created successfully!');
        setIsCreating(false);
        setSelectedId(created.id);
      } else {
        await updateAnushamEvent(payload);
        setMessage('Saved successfully!');
      }
      await refresh();
      setTimeout(() => setMessage(''), 3000);
    } catch (err: any) {
      setMessage('Error: ' + (err?.message || 'Failed to save'));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!form || isCreating) return;
    if (!confirm('Delete this event? This cannot be undone.')) return;
    setSaving(true);
    setMessage('');
    try {
      await deleteAnushamEvent(form.id);
      setMessage('Event deleted.');
      setSelectedId('');
      await refresh();
      setTimeout(() => setMessage(''), 3000);
    } catch (err: any) {
      setMessage('Error: ' + (err?.message || 'Failed to delete'));
    } finally {
      setSaving(false);
    }
  };

  const handleViewEvent = () => {
    if (!form || isCreating) return;
    navigate(`events/${form.id}`);
  };

  const handleNewEvent = () => {
    setIsCreating(true);
    setSelectedId('');
  };

  const handleSelectExisting = (id: string) => {
    setIsCreating(false);
    setSelectedId(id);
  };

  if (!isSupabaseConfigured()) {
    return (
      <div className="py-24 bg-[#FFFCF7] min-h-screen">
        <div className="container mx-auto px-6 max-w-2xl">
          <div className="flex items-center justify-between mb-10">
            <h1 className="text-3xl font-bold heading-font text-text-dark">Admin Dashboard</h1>
            <button onClick={onLogout} className="text-gray-400 hover:text-red-500 font-bold uppercase tracking-widest text-xs transition-colors">Logout</button>
          </div>
          <div className="rounded-3xl p-8 md:p-12" style={{ background: 'rgba(255,252,247,0.75)', border: '1px solid rgba(255,200,150,0.25)', boxShadow: '0 8px 32px rgba(139,69,19,0.08)' }}>
            <h2 className="text-xl font-bold heading-font text-text-dark mb-4">Setup Required</h2>
            <p className="text-gray-600 font-medium mb-6 leading-relaxed">
              The admin panel needs Supabase configured. Run the SQL script in <code>admin/schema.sql</code>, then add env vars and redeploy.
            </p>
            <pre className="bg-orange-50/40 border border-orange-100/50 rounded-2xl p-4 text-xs text-text-dark overflow-x-auto font-mono">{`# .env (or Vercel env vars)\nVITE_SUPABASE_URL=https://pavycvvocbmmybmkkhub.supabase.co\nVITE_SUPABASE_ANON_KEY=<your anon key>`}</pre>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-24 bg-[#FFFCF7] min-h-screen">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold heading-font text-text-dark">Admin Dashboard</h1>
            <p className="text-secondary font-bold uppercase tracking-widest text-xs mt-2">Manage Anusham Pooja Details</p>
          </div>
          <button onClick={onLogout} className="text-gray-400 hover:text-red-500 font-bold uppercase tracking-widest text-xs transition-colors">Logout</button>
        </div>

        {error && (<div className="mb-6 px-5 py-3 rounded-2xl font-bold text-sm bg-red-50 text-red-600 border border-red-100">{error}</div>)}

        <div className="grid md:grid-cols-[300px_1fr] gap-8">
          <div className="rounded-3xl p-6 h-fit" style={{ background:'rgba(255,252,247,0.75)', backdropFilter:'blur(12px)', WebkitBackdropFilter:'blur(12px)', border:'1px solid rgba(255,200,150,0.25)', boxShadow:'0 8px 32px rgba(139,69,19,0.08)' }}>
            <button onClick={handleNewEvent} className="w-full mb-4 bg-gradient-to-r from-primary to-primary-dark text-white px-4 py-3 rounded-2xl font-bold uppercase tracking-widest text-xs shadow-md hover:shadow-lg transition-all">+ New Anusham Event</button>
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-4">Existing Events</h2>
            {loading ? (<p className="text-gray-400 text-xs font-bold uppercase tracking-widest py-4">Loading...</p>) : events.length === 0 ? (<p className="text-gray-400 text-xs font-bold uppercase tracking-widest py-4">No events yet.</p>) : (
              <div className="space-y-2">
                {events.map(event => (
                  <button key={event.id} onClick={() => handleSelectExisting(event.id)}
                    className={`w-full text-left px-4 py-3 rounded-2xl font-bold text-sm transition-all border ${!isCreating && selectedId===event.id ? 'bg-primary text-white border-primary shadow-md' : 'bg-white/50 border-orange-100/30 hover:bg-orange-50 text-text-dark'}`}
                  >{event.date}</button>
                ))}
              </div>
            )}
          </div>

          {form ? (
            <div className="rounded-3xl p-8 md:p-10" style={{ background:'rgba(255,252,247,0.75)', backdropFilter:'blur(12px)', WebkitBackdropFilter:'blur(12px)', border:'1px solid rgba(255,200,150,0.25)', boxShadow:'0 8px 32px rgba(139,69,19,0.08), inset 0 1px 0 rgba(255,255,255,0.5)' }}>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-xl font-bold heading-font text-text-dark">{isCreating ? 'New Anusham Event' : form.title}</h2>
                  <p className="text-secondary font-bold uppercase tracking-widest text-xs mt-1">{form.date}</p>
                </div>
                {!isCreating && (<button onClick={handleViewEvent} className="text-primary font-bold uppercase tracking-widest text-xs hover:underline transition-colors">View Public Page →</button>)}
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-8">
                <div>
                  <label className="text-xs font-bold uppercase tracking-[0.3em] text-primary block mb-3">Date</label>
                  <input type="date" value={form.dateInput} onChange={(e) => { const f = formatDateInput(e.target.value); setForm({...form, dateInput:e.target.value, date:f }); }} className="w-full px-5 py-3 bg-orange-50/30 border border-orange-100/50 rounded-2xl text-text-dark font-bold focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-[0.3em] text-primary block mb-3">Media URL (Photos Album)</label>
                  <input value={form.mediaUrl} onChange={(e) => setForm({...form, mediaUrl:e.target.value})} placeholder="https://photos.app.goo.gl/..." className="w-full px-5 py-3 bg-orange-50/30 border border-orange-100/50 rounded-2xl text-text-dark font-bold focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" />
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <label className="text-xs font-bold uppercase tracking-[0.3em] text-primary block">Description</label>
                <textarea value={form.description} onChange={(e) => setForm({...form, description:e.target.value})} rows={3} className="w-full px-5 py-4 bg-orange-50/30 border border-orange-100/50 rounded-2xl text-text-dark font-bold text-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none" />
              </div>

              {/* Status Toggle */}
              <div className="space-y-4 mb-8">
                <label className="text-xs font-bold uppercase tracking-[0.3em] text-primary block">Status</label>
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mb-2">
                  Auto-detected: <span className={autoStatus === 'upcoming' ? 'text-green-600' : 'text-gray-500'}>{autoStatus === 'upcoming' ? 'Upcoming' : 'Completed'}</span> (based on date)
                </p>
                <div className="flex gap-3">
                  <button onClick={() => setForm({...form, status:'upcoming'})} className={`px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest border-2 transition-all ${form.status==='upcoming'?'bg-green-100 text-green-700 border-green-300':'bg-white text-gray-400 border-gray-200 hover:border-green-300'}`}>Upcoming</button>
                  <button onClick={() => setForm({...form, status:'completed'})} className={`px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest border-2 transition-all ${form.status==='completed'?'bg-gray-100 text-gray-600 border-gray-300':'bg-white text-gray-400 border-gray-200 hover:border-gray-300'}`}>Completed</button>
                  <button onClick={() => setForm({...form, status:''})} className={`px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest border-2 transition-all ${!form.status?'bg-orange-50 text-primary border-primary/50':'bg-white text-gray-400 border-gray-200 hover:border-orange-200'}`}>Auto</button>
                </div>
              </div>

              {/* Programs */}
              <div className="space-y-4 mb-8">
                <label className="text-xs font-bold uppercase tracking-[0.3em] text-primary block">Programs Scheduled</label>
                <ul className="space-y-3">
                  {form.programs.map((prog,i) => (
                    <li key={i} className="flex items-center gap-3 bg-orange-50/20 border border-orange-100/30 rounded-2xl p-4">
                      <input value={prog} onChange={(e) => { const u=[...form.programs]; u[i]=e.target.value; setPrograms(u); }} className="flex-1 bg-transparent text-text-dark font-bold outline-none border-b border-transparent focus:border-primary/30 transition-colors" />
                      <button onClick={() => removeProgram(i)} className="text-gray-300 hover:text-red-400">✕</button>
                    </li>
                  ))}
                </ul>
                <div className="flex gap-3">
                  <input value={newProgram} onChange={(e) => setNewProgram(e.target.value)} onKeyDown={(e) => { if(e.key==='Enter') {e.preventDefault(); addProgram();} }} placeholder="Add new program..." className="flex-1 px-4 py-3 bg-orange-50/30 border border-orange-100/50 rounded-2xl text-text-dark font-bold text-sm focus:outline-none focus:border-primary transition-all" />
                  <button onClick={addProgram} className="bg-primary text-white px-5 py-3 rounded-2xl font-bold text-sm hover:bg-primary-dark">+ Add</button>
                </div>
              </div>

              {/* Donors */}
              <div className="space-y-4 mb-8">
                <label className="text-xs font-bold uppercase tracking-[0.3em] text-primary block">Donor Names</label>
                <div className="space-y-3">
                  {form.donors.map((d,i) => (
                    <div key={i} className="flex items-center gap-3 bg-orange-50/20 border border-orange-100/30 rounded-2xl p-4">
                      <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold text-sm shrink-0">{d.name.replace(/^(Mr\.|Mrs\.|Ms\.|Dr\.|Shri|Smt\.|Sri)\s+/i,'').charAt(0).toUpperCase()}</div>
                      <div className="flex-1 flex flex-col md:flex-row gap-2">
                        <input value={d.name} placeholder="Full name" onChange={(e) => {
                          const u=[...form.donors]; u[i]={...u[i], name:e.target.value}; setDonorsField(u);
                        }} className="flex-1 bg-transparent text-text-dark font-bold text-sm outline-none border-b border-transparent focus:border-primary/30 transition-colors" />
                        <input value={d.city} placeholder="City" onChange={(e) => {
                          const u=[...form.donors]; u[i]={...u[i], city:e.target.value}; setDonorsField(u);
                        }} className="w-32 bg-transparent text-gray-400 font-bold text-xs outline-none border-b border-transparent focus:border-primary/30 transition-colors" />
                      </div>
                      <button onClick={() => removeDonor(i)} className="text-gray-300 hover:text-red-400">✕</button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <input value={newDonorName} onChange={(e) => setNewDonorName(e.target.value)} onKeyDown={(e) => { if(e.key==='Enter') {e.preventDefault(); addDonor();}} } placeholder="Full name (e.g. Mr. Krishnan)" className="flex-1 px-4 py-3 bg-orange-50/30 border border-orange-100/50 rounded-2xl text-text-dark font-bold text-sm focus:outline-none focus:border-primary" />
                  <input value={newDonorCity} onChange={(e) => setNewDonorCity(e.target.value)} onKeyDown={(e) => { if(e.key==='Enter') {e.preventDefault(); addDonor();}} } placeholder="City (e.g. Chennai)" className="w-36 px-4 py-3 bg-orange-50/30 border border-orange-100/50 rounded-2xl text-gray-500 font-bold text-xs focus:outline-none focus:border-primary" />
                  <button type="button" onClick={addDonor} className="bg-primary text-white px-5 py-3 rounded-2xl font-bold text-sm hover:bg-primary-dark">+ Add</button>
                </div>
              </div>

              {message && (
                <div className={`mb-6 px-5 py-3 rounded-2xl font-bold text-sm text-center ${message.toLowerCase().includes('error')||message.toLowerCase().includes('failed')?'bg-red-50 text-red-600 border border-red-100':'bg-green-50 text-green-700 border border-green-100'}`}>{message}</div>
              )}

              <div className="flex gap-4 pt-4 border-t border-orange-50">
                <button onClick={handleSave} disabled={saving} className="flex-1 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-primary/20 transition-all uppercase tracking-widest text-sm disabled:opacity-50">{saving?'Saving...':isCreating?'Create Event':'Save Changes'}</button>
                {isCreating && (<button onClick={() => { setIsCreating(false); setSelectedId(events[0]?.id||''); }} className="px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm border-2 border-orange-200 text-secondary hover:bg-orange-50">Cancel</button>)}
                {!isCreating && (<button onClick={handleDelete} disabled={saving} className="px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm border-2 border-red-200 text-red-500 hover:bg-red-50 disabled:opacity-50">Delete</button>)}
              </div>
            </div>
          ) : loading ? (
            <div className="rounded-3xl p-12 text-center flex items-center justify-center" style={{ background:'rgba(255,252,247,0.75)', border:'1px solid rgba(255,200,150,0.25)', boxShadow:'0 8px 32px rgba(139,69,19,0.08)' }}><p className="text-gray-400 font-bold uppercase tracking-widest text-sm">Loading events...</p></div>
          ) : (
            <div className="rounded-3xl p-12 text-center flex flex-col items-center justify-center gap-4" style={{ background:'rgba(255,252,247,0.75)', border:'1px solid rgba(255,200,150,0.25)', boxShadow:'0 8px 32px rgba(139,69,19,0.08)' }}>
              <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">No events yet</p>
              <button onClick={handleNewEvent} className="bg-primary text-white px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs">+ Create your first Anusham event</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;