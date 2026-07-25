const ADMIN_PASSWORD_KEY = 'km_periyava_admin_auth';
const ADMIN_EDIT_DATA_KEY = 'km_periyava_admin_edits';

export const isAdminAuthenticated = (): boolean => {
  return sessionStorage.getItem(ADMIN_PASSWORD_KEY) === 'true';
};

export const adminLogin = (password: string): boolean => {
  if (password === 'JayaJayaSankara123') {
    sessionStorage.setItem(ADMIN_PASSWORD_KEY, 'true');
    return true;
  }
  return false;
};

export const adminLogout = (): void => {
  sessionStorage.removeItem(ADMIN_PASSWORD_KEY);
};

export interface EditableEventFields {
  description?: string;
  programs?: string[];
  donors?: string[];
}

export const getAdminEdits = (): Record<string, EditableEventFields> => {
  const raw = localStorage.getItem(ADMIN_EDIT_DATA_KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
};

export const saveAdminEdit = (eventId: string, fields: EditableEventFields): void => {
  const edits = getAdminEdits();
  edits[eventId] = fields;
  localStorage.setItem(ADMIN_EDIT_DATA_KEY, JSON.stringify(edits));
};

export const deleteAdminEdit = (eventId: string): void => {
  const edits = getAdminEdits();
  delete edits[eventId];
  localStorage.setItem(ADMIN_EDIT_DATA_KEY, JSON.stringify(edits));
};