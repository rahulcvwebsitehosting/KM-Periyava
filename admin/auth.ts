export const ADMIN_PASSWORD = 'JayaJayaSankara123';
const ADMIN_SESSION_KEY = 'km_periyava_admin_auth';
const APPS_SCRIPT_URL =
  (import.meta as any).env?.VITE_APPS_SCRIPT_URL || '';

export interface AnushamEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  programs?: string[];
  donors?: string[];
  mediaUrl: string;
}

export const isAdminAuthenticated = (): boolean => {
  return sessionStorage.getItem(ADMIN_SESSION_KEY) === 'true';
};

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

const buildUrl = (params: Record<string, string>): string => {
  const base = APPS_SCRIPT_URL;
  if (!base) {
    throw new Error(
      'VITE_APPS_SCRIPT_URL is not set. See admin/apps-script.gs for setup instructions.'
    );
  }
  const url = new URL(base);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) url.searchParams.append(k, v);
  });
  return url.toString();
};

const callAppsScript = async (params: Record<string, string>): Promise<any> => {
  const url = buildUrl(params);
  const res = await fetch(url, { method: 'GET', redirect: 'follow' });
  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }
  return res.json();
};

export const fetchAnushamEvents = async (): Promise<AnushamEvent[]> => {
  const data = await callAppsScript({ action: 'list' });
  if (data && Array.isArray(data.events)) return data.events as AnushamEvent[];
  return [];
};

export const createAnushamEvent = async (event: AnushamEvent): Promise<AnushamEvent> => {
  const data = await callAppsScript({
    action: 'create',
    token: ADMIN_PASSWORD,
    event: JSON.stringify(event),
  });
  if (data?.error) throw new Error(data.error);
  return data.event as AnushamEvent;
};

export const updateAnushamEvent = async (event: AnushamEvent): Promise<AnushamEvent> => {
  const data = await callAppsScript({
    action: 'update',
    token: ADMIN_PASSWORD,
    event: JSON.stringify(event),
  });
  if (data?.error) throw new Error(data.error);
  return data.event as AnushamEvent;
};

export const deleteAnushamEvent = async (id: string): Promise<void> => {
  const data = await callAppsScript({
    action: 'delete',
    token: ADMIN_PASSWORD,
    id,
  });
  if (data?.error) throw new Error(data.error);
};

export const isAppsScriptConfigured = (): boolean => {
  return Boolean(APPS_SCRIPT_URL);
};
