const TOKEN_KEY = 'anga:token';

export function getToken(): string | null {
  try {
    return window.localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setToken(token: string | null): void {
  try {
    if (token) window.localStorage.setItem(TOKEN_KEY, token);
    else window.localStorage.removeItem(TOKEN_KEY);
  } catch {
    /* ignore */
  }
}

export class ApiError extends Error {
  status: number;
  code: string;

  constructor(status: number, message: string, code = 'error') {
    super(message);
    this.status = status;
    this.code = code;
  }
}

type Envelope<T> = { ok: true; data: T } | { ok: false; error: { code: string; message: string } };

const base = (import.meta.env.VITE_API_URL as string | undefined) || '/api';

export async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  if (!headers.has('Content-Type') && init.body) headers.set('Content-Type', 'application/json');
  const token = getToken();
  if (token) headers.set('Authorization', `Bearer ${token}`);
  const res = await fetch(`${base}${path}`, { ...init, headers });
  const text = await res.text();
  let parsed: Envelope<T> | null = null;
  try {
    parsed = text ? (JSON.parse(text) as Envelope<T>) : null;
  } catch {
    parsed = null;
  }
  if (!res.ok || !parsed || parsed.ok === false) {
    const message = parsed && parsed.ok === false ? parsed.error.message : 'Error de red o del servidor';
    const code = parsed && parsed.ok === false ? parsed.error.code : 'http';
    if (res.status === 401) {
      setToken(null);
      window.dispatchEvent(new Event('anga:unauthorized'));
    }
    throw new ApiError(res.status, message, code);
  }
  return parsed.data;
}
