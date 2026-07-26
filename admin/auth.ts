import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL =
  (import.meta as any).env?.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY =
  (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '';

export const ADMIN_PASSWORD = 'JayaJayaSankara123';
const ADMIN_SESSION_KEY = 'km_periyava_admin_auth';
const STORAGE_BUCKET = 'event-images';

export interface AnushamEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  programs?: string[];
  donors?: string[];
  mediaUrl: string;
  coverImage?: string | null;
  gallery?: string[];
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const isSupabaseConfigured = (): boolean =>
  Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

export const isAdminAuthenticated = (): boolean =>
  sessionStorage.getItem(ADMIN_SESSION_KEY) === 'true';

export const adminLogin = (password: string): boolean => {
  if (password === ADMIN_PASSWORD) {
    sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
    return true;
  }
  return false;
};

export const adminLogout = (): void => {
  sessionStorage.removeItem(ADMIN_SESSION_KEY);
};

const dbRowToEvent = (row: any): AnushamEvent => ({
  id: row.id,
  title: row.title,
  date: row.date,
  description: row.description ?? '',
  programs: row.programs ?? [],
  donors: row.donors ?? [],
  mediaUrl: row.media_url ?? '',
  coverImage: row.cover_image ?? null,
  gallery: row.gallery ?? [],
});

const eventToDbRow = (event: AnushamEvent) => ({
  id: event.id,
  title: event.title,
  date: event.date,
  description: event.description,
  programs: event.programs ?? [],
  donors: event.donors ?? [],
  media_url: event.mediaUrl ?? '',
  cover_image: event.coverImage ?? null,
  gallery: event.gallery ?? [],
});

export const fetchAllEvents = async (): Promise<AnushamEvent[]> => {
  if (!isSupabaseConfigured()) return [];
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []).map(dbRowToEvent);
};

export const fetchAnushamEvents = async (): Promise<AnushamEvent[]> => {
  const all = await fetchAllEvents();
  return all.filter(e => (e.title || '').toUpperCase().includes('ANUSHAM'));
};

export const fetchEventById = async (id: string): Promise<AnushamEvent | null> => {
  if (!isSupabaseConfigured()) return null;
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data ? dbRowToEvent(data) : null;
};

export const createAnushamEvent = async (event: AnushamEvent): Promise<AnushamEvent> => {
  const { data, error } = await supabase
    .from('events')
    .insert(eventToDbRow(event))
    .select('*')
    .single();
  if (error) throw new Error(error.message);
  return dbRowToEvent(data);
};

export const updateAnushamEvent = async (event: AnushamEvent): Promise<AnushamEvent> => {
  const { data, error } = await supabase
    .from('events')
    .update(eventToDbRow(event))
    .eq('id', event.id)
    .select('*')
    .single();
  if (error) throw new Error(error.message);
  return dbRowToEvent(data);
};

export const deleteAnushamEvent = async (id: string): Promise<void> => {
  const { error } = await supabase.from('events').delete().eq('id', id);
  if (error) throw new Error(error.message);
};

export const uploadEventImage = async (file: File, eventId: string): Promise<string> => {
  const ext = file.name.split('.').pop() || 'jpg';
  const path = `${eventId}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase
    .storage
    .from(STORAGE_BUCKET)
    .upload(path, file, { cacheControl: '3600', upsert: false });
  if (error) throw new Error(error.message);
  const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);
  return data.publicUrl;
};

export const deleteEventImage = async (publicUrl: string): Promise<void> => {
  try {
    const parts = publicUrl.split(`/object/public/${STORAGE_BUCKET}/`);
    if (parts.length < 2) return;
    const path = parts[1];
    await supabase.storage.from(STORAGE_BUCKET).remove([path]);
  } catch {
    // ignore - URL might be from elsewhere
  }
};
