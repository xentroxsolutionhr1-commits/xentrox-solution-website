const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/$/, '');
const SESSION_TOKEN_KEY = 'xentrox-admin-token';
const SESSION_USER_KEYS = ['xentrox-admin-id', 'xentrox-admin-name', 'xentrox-admin-email'];

export function readAdminSession() {
  const token = sessionStorage.getItem(SESSION_TOKEN_KEY);
  const [id, name, email] = SESSION_USER_KEYS.map((key) => sessionStorage.getItem(key));
  if (!token || !id || !name || !email) return null;
  return { token, user: { id, name, email, role: 'SUPER_ADMIN' } };
}

export function clearAdminSession() {
  sessionStorage.removeItem(SESSION_TOKEN_KEY);
  SESSION_USER_KEYS.forEach((key) => sessionStorage.removeItem(key));
}

export function storeAdminSession(result) {
  sessionStorage.setItem(SESSION_TOKEN_KEY, result.accessToken);
  sessionStorage.setItem(SESSION_USER_KEYS[0], String(result.user.id));
  sessionStorage.setItem(SESSION_USER_KEYS[1], result.user.name);
  sessionStorage.setItem(SESSION_USER_KEYS[2], result.user.email);
}

export function adminAssetUrl(path) {
  if (!path || /^https?:\/\//i.test(path)) return path;
  return `${API_BASE_URL}${path}`;
}

export async function adminRequest(path, { token, ...options } = {}) {
  const headers = new Headers(options.headers);
  if (options.body && !(options.body instanceof FormData)) headers.set('Content-Type', 'application/json');
  if (token) headers.set('Authorization', `Bearer ${token}`);

  const response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });
  if (!response.ok) {
    let message = `Request failed (${response.status})`;
    try {
      const body = await response.json();
      if (body.error) message = body.error;
    } catch {
      if (response.status === 401) message = 'Your session has expired. Please sign in again.';
      else if (response.status === 403) message = 'This account does not have permission to manage the admin panel.';
    }
    const error = new Error(message);
    error.status = response.status;
    throw error;
  }
  if (response.status === 204) return null;
  return response.json();
}

export function formatAdminDate(value) {
  if (!value) return '—';
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(value));
}

export function adminInitials(name = '') {
  return name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase() || 'U';
}
