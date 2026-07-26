import React, { useEffect, useState, useCallback } from 'react';
import {
  adminLogout,
  AnushamEvent,
  createAnushamEvent,
  updateAnushamEvent,
  deleteAnushamEvent,
  uploadEventImage,
  deleteEventImage,
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

interface FormState {
  id: string;
  title: string;
  date: string;
  dateInput: string;
  description: string;
  programs: string[];
  donors: string[];
  mediaUrl: string;
  coverImage: string | null;
  gallery: string[];
}

const eventToForm = (e: Event): FormState => ({
  id: e.id,
  title: e.title,
  date: e.date,
  dateInput: '',
  description: e.description || '',
  programs: e.programs ? [...e.programs] : [...defaultPrograms],
  donors: e.donors ? [...e.donors] : [],
  mediaUrl: e.mediaUrl || '',
  coverImage: e.coverImage ?? null,
  gallery: e.gallery ?? [],
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
    coverImage: null,
    gallery: [],
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
  const [newDonor, setNewDonor] = useState('');
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
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
  const setDonors = (donors: string[]) => form && setForm({ ...form, donors });

  const addProgram = () => {
    if (!form) return;
    const trimmed = newProgram.trim();
    if (trimmed && !form.programs.includes(trimmed)) {
      setPrograms([...form.programs, trimmed]);
      setNewProgram('');
    }
  };
  const removeProgram = (i: number) => form && setPrograms(form.programs.filter((_, idx) => idx !== i));

  const addDonor = () => {
    if (!form) return;
    const trimmed = newDonor.trim();
    if (trimmed && !form.donors.includes(trimmed)) {
      setDonors([...form.donors, trimmed]);
      setNewDonor('');
    }
  };
  const removeDonor = (i: number) => form && setDonors(form.donors.filter((_, idx) => idx !== i));

  const handleCoverUpload = async (file: File) => {
    if (!form) return;
    setUploading(true);
    setMessage('');
    try {
      const tempId = form.id || uniqueId(form.date);
      const publicUrl = await uploadEventImage(file, tempId);
      if (form.coverImage) await deleteEventImage(form.coverImage);
      setForm({ ...form, coverImage: publicUrl });
      setMessage('Cover image uploaded. Click Save to confirm.');
    } catch (err: any) {
      setMessage('Image upload failed: ' + (err?.message || ''));
    } finally {
      setUploading(false);
    }
  };

  const handleGalleryUpload = async (files: FileList) => {
    if (!form) return;
    setUploading(true);
    setMessage('');
    try {
      const tempId = form.id || uniqueId(form.date);
      const urls: string[] = [];
      for (const file of Array.from(files)) {
        const url = await uploadEventImage(file, tempId);
        urls.push(url);
      }
      setForm({ ...form, gallery: [...form.gallery, ...urls] });
      setMessage(`Uploaded ${urls.length} image(s). Click Save to confirm.`);
    } catch (err: any) {
      setMessage('Image upload failed: ' + (err?.message || ''));
    } finally {
      setUploading(false);
    }
  };

  const removeGalleryImage = async (index: number) => {
    if (!form) return;
    const url = form.gallery[index];
    const updated = form.gallery.filter((_, i) => i !== index);
    setForm({ ...form, gallery: updated });
    try { await deleteEventImage(url); } catch {}
  };

  const clearCoverImage = async () => {
    if (!form || !form.coverImage) return;
    const url = form.coverImage;
    setForm({ ...form, coverImage: null });
    try { await deleteEventImage(url); } catch {}
  };

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
        donors: form.donors,
        mediaUrl: form.mediaUrl,
        coverImage: form.coverImage,
        gallery: form.gallery,
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
      if (form.coverImage) await deleteEventImage(form.coverImage).catch(() => {});
      for (const url of form.gallery) await deleteEventImage(url).catch(() => {});
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
            <button
              onClick={onLogout}
              className="text-gray-400 hover:text-red-500 font-bold uppercase tracking-widest text-xs transition-colors"
            >
              Logout
            </button>
          </div>
          <div
            className="rounded-3xl p-8 md:p-12"
            style={{
              background: 'rgba(255, 252, 247, 0.75)',
              border: '1px solid rgba(255, 200, 150, 0.25)',
              boxShadow: '0 8px 32px rgba(139, 69, 19, 0.08)'
            }}
          >
            <h2 className="text-xl font-bold heading-font text-text-dark mb-4">Setup Required</h2>
            <p className="text-gray-600 font-medium mb-6 leading-relaxed">
              The admin panel needs Supabase configured so changes are visible to all users.
              Run the SQL script in <code>admin/schema.sql</code> in the Supabase SQL editor,
              then add the following env vars and redeploy:
            </p>
            <pre className="bg-orange-50/40 border border-orange-100/50 rounded-2xl p-4 text-xs text-text-dark overflow-x-auto font-mono">
{`# .env (or Vercel env vars)
VITE_SUPABASE_URL=https://pavycvvocbmmybmkkhub.supabase.co
VITE_SUPABASE_ANON_KEY=<your anon key>`}
            </pre>
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
            <h1 className="text-3xl md:text-4xl font-bold heading-font text-text-dark">
              Admin Dashboard
            </h1>
            <p className="text-secondary font-bold uppercase tracking-widest text-xs mt-2">
              Manage Anusham Pooja Details
            </p>
          </div>
          <button
            onClick={onLogout}
            className="text-gray-400 hover:text-red-500 font-bold uppercase tracking-widest text-xs transition-colors"
          >
            Logout
          </button>
        </div>

        {error && (
          <div className="mb-6 px-5 py-3 rounded-2xl font-bold text-sm bg-red-50 text-red-600 border border-red-100">
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-[300px_1fr] gap-8">
          <div
            className="rounded-3xl p-6 h-fit"
            style={{
              background: 'rgba(255, 252, 247, 0.75)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 200, 150, 0.25)',
              boxShadow: '0 8px 32px rgba(139, 69, 19, 0.08)'
            }}
          >
            <button
              onClick={handleNewEvent}
              className="w-full mb-4 bg-gradient-to-r from-primary to-primary-dark text-white px-4 py-3 rounded-2xl font-bold uppercase tracking-widest text-xs shadow-md hover:shadow-lg transition-all"
            >
              + New Anusham Event
            </button>

            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-4">
              Existing Events
            </h2>

            {loading ? (
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest py-4">Loading...</p>
            ) : events.length === 0 ? (
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest py-4">
                No events yet. Create one to get started.
              </p>
            ) : (
              <div className="space-y-2">
                {events.map(event => (
                  <button
                    key={event.id}
                    onClick={() => handleSelectExisting(event.id)}
                    className={`w-full text-left px-4 py-3 rounded-2xl font-bold text-sm transition-all border ${
                      !isCreating && selectedId === event.id
                        ? 'bg-primary text-white border-primary shadow-md'
                        : 'bg-white/50 border-orange-100/30 hover:bg-orange-50 text-text-dark'
                    }`}
                  >
                    {event.date}
                    {event.coverImage && <span className="ml-2 text-[10px]">🖼️</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {form ? (
            <div
              className="rounded-3xl p-8 md:p-10"
              style={{
                background: 'rgba(255, 252, 247, 0.75)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 200, 150, 0.25)',
                boxShadow: '0 8px 32px rgba(139, 69, 19, 0.08), inset 0 1px 0 rgba(255,255,255,0.5)'
              }}
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-xl font-bold heading-font text-text-dark">
                    {isCreating ? 'New Anusham Event' : form.title}
                  </h2>
                  <p className="text-secondary font-bold uppercase tracking-widest text-xs mt-1">
                    {form.date}
                  </p>
                </div>
                {!isCreating && (
                  <button
                    onClick={handleViewEvent}
                    className="text-primary font-bold uppercase tracking-widest text-xs hover:underline transition-colors"
                  >
                    View Public Page →
                  </button>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-8">
                <div>
                  <label className="text-xs font-bold uppercase tracking-[0.3em] text-primary block mb-3">
                    Date
                  </label>
                  <input
                    type="date"
                    value={form.dateInput}
                    onChange={(e) => {
                      const formatted = formatDateInput(e.target.value);
                      setForm({ ...form, dateInput: e.target.value, date: formatted });
                    }}
                    className="w-full px-5 py-3 bg-orange-50/30 border border-orange-100/50 rounded-2xl text-text-dark font-bold focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-[0.3em] text-primary block mb-3">
                    Media URL (Photos Album)
                  </label>
                  <input
                    value={form.mediaUrl}
                    onChange={(e) => setForm({ ...form, mediaUrl: e.target.value })}
                    placeholder="https://photos.app.goo.gl/..."
                    className="w-full px-5 py-3 bg-orange-50/30 border border-orange-100/50 rounded-2xl text-text-dark font-bold focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <label className="text-xs font-bold uppercase tracking-[0.3em] text-primary block">
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="w-full px-5 py-4 bg-orange-50/30 border border-orange-100/50 rounded-2xl text-text-dark font-bold text-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                />
              </div>

              {/* Cover Image */}
              <div className="space-y-4 mb-8">
                <label className="text-xs font-bold uppercase tracking-[0.3em] text-primary block">
                  Cover Image
                </label>
                {form.coverImage ? (
                  <div className="relative inline-block">
                    <img
                      src={form.coverImage}
                      alt="Cover"
                      className="rounded-2xl max-h-48 object-cover border border-orange-100/50"
                    />
                    <button
                      onClick={clearCoverImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center font-bold shadow-md hover:bg-red-600"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <input
                    type="file"
                    accept="image/*"
                    disabled={uploading}
                    onChange={(e) => e.target.files?.[0] && handleCoverUpload(e.target.files[0])}
                    className="block text-sm text-gray-500 file:mr-4 file:py-3 file:px-5 file:rounded-full file:border-0 file:bg-primary file:text-white file:font-bold file:uppercase file:tracking-widest file:text-xs hover:file:bg-primary-dark"
                  />
                )}
              </div>

              {/* Programs */}
              <div className="space-y-4 mb-8">
                <label className="text-xs font-bold uppercase tracking-[0.3em] text-primary block">
                  Programs Scheduled
                </label>
                <ul className="space-y-3">
                  {form.programs.map((prog, i) => (
                    <li key={i} className="flex items-center gap-3 bg-orange-50/20 border border-orange-100/30 rounded-2xl p-4">
                      <input
                        value={prog}
                        onChange={(e) => {
                          const updated = [...form.programs];
                          updated[i] = e.target.value;
                          setPrograms(updated);
                        }}
                        className="flex-1 bg-transparent text-text-dark font-bold outline-none border-b border-transparent focus:border-primary/30 transition-colors"
                      />
                      <button onClick={() => removeProgram(i)} className="text-gray-300 hover:text-red-400 transition-colors">✕</button>
                    </li>
                  ))}
                </ul>
                <div className="flex gap-3">
                  <input
                    value={newProgram}
                    onChange={(e) => setNewProgram(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addProgram(); } }}
                    placeholder="Add new program..."
                    className="flex-1 px-4 py-3 bg-orange-50/30 border border-orange-100/50 rounded-2xl text-text-dark font-bold text-sm focus:outline-none focus:border-primary transition-all"
                  />
                  <button onClick={addProgram} className="bg-primary text-white px-5 py-3 rounded-2xl font-bold text-sm hover:bg-primary-dark transition-colors">+ Add</button>
                </div>
              </div>

              {/* Donors */}
              <div className="space-y-4 mb-8">
                <label className="text-xs font-bold uppercase tracking-[0.3em] text-primary block">
                  Donor Names
                </label>
                <div className="grid sm:grid-cols-2 gap-3">
                  {form.donors.map((donor, i) => (
                    <div key={i} className="flex items-center gap-3 bg-orange-50/20 border border-orange-100/30 rounded-2xl p-4">
                      <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                        {donor.replace(/^(Mr\.|Mrs\.|Ms\.|Dr\.|Shri|Smt\.|Sri)\s+/i, '').charAt(0).toUpperCase()}
                      </div>
                      <input
                        value={donor}
                        onChange={(e) => {
                          const updated = [...form.donors];
                          updated[i] = e.target.value;
                          setDonors(updated);
                        }}
                        className="flex-1 bg-transparent text-text-dark font-bold text-sm outline-none border-b border-transparent focus:border-primary/30 transition-colors"
                      />
                      <button onClick={() => removeDonor(i)} className="text-gray-300 hover:text-red-400 transition-colors">✕</button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <input
                    value={newDonor}
                    onChange={(e) => setNewDonor(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addDonor(); } }}
                    placeholder="Add donor (e.g. Mr. Name (Chennai))..."
                    className="flex-1 px-4 py-3 bg-orange-50/30 border border-orange-100/50 rounded-2xl text-text-dark font-bold text-sm focus:outline-none focus:border-primary transition-all"
                  />
                  <button onClick={addDonor} className="bg-primary text-white px-5 py-3 rounded-2xl font-bold text-sm hover:bg-primary-dark transition-colors">+ Add</button>
                </div>
              </div>

              {/* Gallery */}
              <div className="space-y-4 mb-8">
                <label className="text-xs font-bold uppercase tracking-[0.3em] text-primary block">
                  Gallery Images
                </label>
                {form.gallery.length > 0 && (
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mb-3">
                    {form.gallery.map((url, i) => (
                      <div key={i} className="relative">
                        <img src={url} alt={`Gallery ${i + 1}`} className="w-full h-24 object-cover rounded-xl border border-orange-100/50" />
                        <button
                          onClick={() => removeGalleryImage(i)}
                          className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-md hover:bg-red-600"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  disabled={uploading}
                  onChange={(e) => e.target.files && handleGalleryUpload(e.target.files)}
                  className="block text-sm text-gray-500 file:mr-4 file:py-3 file:px-5 file:rounded-full file:border-0 file:bg-primary file:text-white file:font-bold file:uppercase file:tracking-widest file:text-xs hover:file:bg-primary-dark"
                />
              </div>

              {uploading && (
                <div className="mb-6 px-5 py-3 rounded-2xl font-bold text-sm text-center bg-blue-50 text-blue-700 border border-blue-100">
                  Uploading image(s)...
                </div>
              )}

              {message && (
                <div className={`mb-6 px-5 py-3 rounded-2xl font-bold text-sm text-center ${
                  message.toLowerCase().includes('error') || message.toLowerCase().includes('failed')
                    ? 'bg-red-50 text-red-600 border border-red-100'
                    : 'bg-green-50 text-green-700 border border-green-100'
                }`}>
                  {message}
                </div>
              )}

              <div className="flex gap-4 pt-4 border-t border-orange-50">
                <button
                  onClick={handleSave}
                  disabled={saving || uploading}
                  className="flex-1 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-primary/20 transition-all uppercase tracking-widest text-sm disabled:opacity-50"
                >
                  {saving ? 'Saving...' : isCreating ? 'Create Event' : 'Save Changes'}
                </button>
                {isCreating && (
                  <button
                    onClick={() => { setIsCreating(false); setSelectedId(events[0]?.id || ''); }}
                    className="px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm border-2 border-orange-200 text-secondary hover:bg-orange-50 transition-all"
                  >
                    Cancel
                  </button>
                )}
                {!isCreating && (
                  <button
                    onClick={handleDelete}
                    disabled={saving}
                    className="px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm border-2 border-red-200 text-red-500 hover:bg-red-50 transition-all disabled:opacity-50"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ) : loading ? (
            <div
              className="rounded-3xl p-12 text-center flex items-center justify-center"
              style={{ background: 'rgba(255, 252, 247, 0.75)', border: '1px solid rgba(255, 200, 150, 0.25)', boxShadow: '0 8px 32px rgba(139, 69, 19, 0.08)' }}
            >
              <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">Loading events...</p>
            </div>
          ) : (
            <div
              className="rounded-3xl p-12 text-center flex flex-col items-center justify-center gap-4"
              style={{ background: 'rgba(255, 252, 247, 0.75)', border: '1px solid rgba(255, 200, 150, 0.25)', boxShadow: '0 8px 32px rgba(139, 69, 19, 0.08)' }}
            >
              <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">No events yet</p>
              <button onClick={handleNewEvent} className="bg-primary text-white px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs">
                + Create your first Anusham event
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
