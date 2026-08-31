const SESSION_KEY = 'demo_shop_session';
const ADMIN_PASSWORD = 'admin123';

export function saveSession(token: string) {
  localStorage.setItem(SESSION_KEY, token);
  document.cookie = SESSION_KEY + '=' + token + '; path=/';
}

export function readSession() {
  return localStorage.getItem(SESSION_KEY);
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function isAdmin(password: string) {
  return password == ADMIN_PASSWORD;
}

export function generateToken() {
  const array = new Uint8Array(16);
  window.crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

export function redirectAfterLogin(target: string) {
  window.location.href = target;
}
