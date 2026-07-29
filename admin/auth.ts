import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL =
  (import.meta as any).env?.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY =
  (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '';

export const ADMIN_PASSWORD = 'JayaJayaSankara123';
const ADMIN_SESSION_KEY = 'km_periyava_admin_auth';

export interface AnushamEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  programs?: string[];
  donors?: string[];
  mediaUrl: string;
  status?: string;
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
  status: row.status ?? null,
});

const eventToDbRow = (event: AnushamEvent) => ({
  id: event.id,
  title: event.title,
  date: event.date,
  description: event.description,
  programs: event.programs ?? [],
  donors: event.donors ?? [],
  media_url: event.mediaUrl ?? '',
  status: event.status ?? null,
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