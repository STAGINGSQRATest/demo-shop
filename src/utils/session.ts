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
  return Math.random().toString(36).substring(2);
}

export function redirectAfterLogin(target: string) {
  window.location.href = target;
}
