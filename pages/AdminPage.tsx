import React, { useState, useEffect } from 'react';
import { adminLogout, getAdminEdits, saveAdminEdit, deleteAdminEdit } from '../admin/auth';
import { eventsData, getMergedEvents } from '../data/events';

interface AdminPageProps {
  onLogout: () => void;
  navigate: (path: string) => void;
}

const defaultPrograms = [
  'Avahanthi Homam',
  'Periyava Panchalogha Vighragham & Padhukha Purappadu along with Uthagashanthi parayanam',
  'Annadhanam'
];

const AdminPage: React.FC<AdminPageProps> = ({ onLogout, navigate }) => {
  const [selectedEventId, setSelectedEventId] = useState<string>('');
  const [edits, setEdits] = useState(getAdminEdits());
  const [message, setMessage] = useState('');

  const mergedEvents = getMergedEvents();
  const anushamEvents = eventsData.filter(e => e.title === 'ANUSHAM POOJA');

  const selected = anushamEvents.find(e => e.id === selectedEventId);
  const selectedEdit = selected ? edits[selected.id] : null;

  const getFieldValue = <K extends 'description' | 'programs' | 'donors'>(
    field: K
  ): NonNullable<typeof selectedEdit>[K] => {
    if (selectedEdit && selectedEdit[field] !== undefined) {
      return selectedEdit[field] as any;
    }
    if (selected) {
      const val = selected[field];
      if (val !== undefined) return val as any;
    }
    if (field === 'description') return '';
    if (field === 'programs') return [...defaultPrograms];
    if (field === 'donors') return [];
    return undefined as any;
  };

  const currentDescription = selected ? getFieldValue('description') : '';
  const currentPrograms = selected ? getFieldValue('programs') : [...defaultPrograms];
  const currentDonors = selected ? getFieldValue('donors') : [];

  const [editDescription, setEditDescription] = useState(currentDescription);
  const [editPrograms, setEditPrograms] = useState<string[]>([...currentPrograms]);
  const [editDonors, setEditDonors] = useState<string[]>([...currentDonors]);
  const [newProgram, setNewProgram] = useState('');
  const [newDonor, setNewDonor] = useState('');

  useEffect(() => {
    if (selected) {
      setEditDescription(getFieldValue('description'));
      setEditPrograms([...getFieldValue('programs')]);
      setEditDonors([...getFieldValue('donors')]);
      setMessage('');
    }
  }, [selectedEventId]);

  const handleSave = () => {
    if (!selected) return;
    saveAdminEdit(selected.id, {
      description: editDescription,
      programs: editPrograms,
      donors: editDonors,
    });
    setEdits(getAdminEdits());
    setMessage('Saved successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleReset = () => {
    if (!selected) return;
    deleteAdminEdit(selected.id);
    setEdits(getAdminEdits());
    setEditDescription(selected.description || '');
    setEditPrograms(selected.programs ? [...selected.programs] : [...defaultPrograms]);
    setEditDonors(selected.donors ? [...selected.donors] : []);
    setMessage('Reset to original values.');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleViewEvent = () => {
    if (!selected) return;
    navigate(`events/${selected.id}`);
  };

  const addProgram = () => {
    const trimmed = newProgram.trim();
    if (trimmed && !editPrograms.includes(trimmed)) {
      setEditPrograms([...editPrograms, trimmed]);
      setNewProgram('');
    }
  };

  const removeProgram = (index: number) => {
    setEditPrograms(editPrograms.filter((_, i) => i !== index));
  };

  const addDonor = () => {
    const trimmed = newDonor.trim();
    if (trimmed && !editDonors.includes(trimmed)) {
      setEditDonors([...editDonors, trimmed]);
      setNewDonor('');
    }
  };

  const removeDonor = (index: number) => {
    setEditDonors(editDonors.filter((_, i) => i !== index));
  };

  const hasEdits = selectedEdit !== undefined;

  return (
    <div className="py-24 bg-[#FFFCF7] min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
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

        <div className="grid md:grid-cols-[280px_1fr] gap-8">
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
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-4">
              Select Event
            </h2>
            <div className="space-y-2">
              {anushamEvents.map(event => {
                const isEdited = !!edits[event.id];
                return (
                  <button
                    key={event.id}
                    onClick={() => setSelectedEventId(event.id)}
                    className={`w-full text-left px-4 py-3 rounded-2xl font-bold text-sm transition-all border ${
                      selectedEventId === event.id
                        ? 'bg-primary text-white border-primary shadow-md'
                        : 'bg-white/50 border-orange-100/30 hover:bg-orange-50 text-text-dark'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{event.date}</span>
                      {isEdited && (
                        <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          selectedEventId === event.id
                            ? 'bg-white/20 text-white'
                            : 'bg-primary/10 text-primary'
                        }`}>
                          Edited
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {selected ? (
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
                    {selected.title}
                  </h2>
                  <p className="text-secondary font-bold uppercase tracking-widest text-xs mt-1">
                    {selected.date}
                  </p>
                </div>
                <button
                  onClick={handleViewEvent}
                  className="text-primary font-bold uppercase tracking-widest text-xs hover:underline transition-colors"
                >
                  View Public Page →
                </button>
              </div>

              {/* Description */}
              <div className="space-y-4 mb-8">
                <label className="text-xs font-bold uppercase tracking-[0.3em] text-primary block">
                  Description
                </label>
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  rows={3}
                  className="w-full px-5 py-4 bg-orange-50/30 border border-orange-100/50 rounded-2xl text-text-dark font-bold text-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                />
              </div>

              {/* Programs */}
              <div className="space-y-4 mb-8">
                <label className="text-xs font-bold uppercase tracking-[0.3em] text-primary block">
                  Programs Scheduled
                </label>
                <ul className="space-y-3">
                  {editPrograms.map((prog, i) => (
                    <li key={i} className="flex items-center gap-3 bg-orange-50/20 border border-orange-100/30 rounded-2xl p-4 group">
                      <input
                        value={prog}
                        onChange={(e) => {
                          const updated = [...editPrograms];
                          updated[i] = e.target.value;
                          setEditPrograms(updated);
                        }}
                        className="flex-1 bg-transparent text-text-dark font-bold outline-none border-b border-transparent focus:border-primary/30 transition-colors"
                      />
                      <button
                        onClick={() => removeProgram(i)}
                        className="text-gray-300 hover:text-red-400 transition-colors"
                      >
                        ✕
                      </button>
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
                  <button
                    onClick={addProgram}
                    className="bg-primary text-white px-5 py-3 rounded-2xl font-bold text-sm hover:bg-primary-dark transition-colors"
                  >
                    + Add
                  </button>
                </div>
              </div>

              {/* Donors */}
              <div className="space-y-4 mb-10">
                <label className="text-xs font-bold uppercase tracking-[0.3em] text-primary block">
                  Donor Names
                </label>
                <div className="grid sm:grid-cols-2 gap-3">
                  {editDonors.map((donor, i) => (
                    <div key={i} className="flex items-center gap-3 bg-orange-50/20 border border-orange-100/30 rounded-2xl p-4 group">
                      <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                        {donor.replace(/^(Mr\.|Mrs\.|Ms\.|Dr\.|Shri|Smt\.|Sri)\s+/i, '').charAt(0).toUpperCase()}
                      </div>
                      <input
                        value={donor}
                        onChange={(e) => {
                          const updated = [...editDonors];
                          updated[i] = e.target.value;
                          setEditDonors(updated);
                        }}
                        className="flex-1 bg-transparent text-text-dark font-bold text-sm outline-none border-b border-transparent focus:border-primary/30 transition-colors"
                      />
                      <button
                        onClick={() => removeDonor(i)}
                        className="text-gray-300 hover:text-red-400 transition-colors"
                      >
                        ✕
                      </button>
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
                  <button
                    onClick={addDonor}
                    className="bg-primary text-white px-5 py-3 rounded-2xl font-bold text-sm hover:bg-primary-dark transition-colors"
                  >
                    + Add
                  </button>
                </div>
              </div>

              {message && (
                <div className={`mb-6 px-5 py-3 rounded-2xl font-bold text-sm text-center ${
                  message.includes('error')
                    ? 'bg-red-50 text-red-600 border border-red-100'
                    : 'bg-green-50 text-green-700 border border-green-100'
                }`}>
                  {message}
                </div>
              )}

              <div className="flex gap-4 pt-4 border-t border-orange-50">
                <button
                  onClick={handleSave}
                  className="flex-1 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-primary/20 transition-all uppercase tracking-widest text-sm"
                >
                  Save Changes
                </button>
                {hasEdits && (
                  <button
                    onClick={handleReset}
                    className="px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm border-2 border-orange-200 text-secondary hover:bg-orange-50 transition-all"
                  >
                    Reset to Original
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div
              className="rounded-3xl p-12 text-center flex items-center justify-center"
              style={{
                background: 'rgba(255, 252, 247, 0.75)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 200, 150, 0.25)',
                boxShadow: '0 8px 32px rgba(139, 69, 19, 0.08)'
              }}
            >
              <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">
                Select an Anusham event from the list to edit its details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;