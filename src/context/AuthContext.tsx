import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { api, getToken, setToken } from '../services/api';
import type { Rol, Usuario } from '../types/user';

const VIEW_KEY = 'anga:viewUser';

interface AuthContextValue {
  ready: boolean;
  user: Usuario | null;
  usuarios: Usuario[];
  selectedUserId: string;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshUsuarios: () => Promise<Usuario[]>;
  setSelectedUserId: (id: string) => void;
  canManageUsers: boolean;
  canSeeTeam: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function readViewUser(): string {
  try {
    return window.sessionStorage.getItem(VIEW_KEY) || '';
  } catch {
    return '';
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<Usuario | null>(null);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [selectedUserId, setSelected] = useState(readViewUser);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    setUsuarios([]);
    setSelected('');
    try {
      window.sessionStorage.removeItem(VIEW_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const refreshUsuarios = useCallback(async () => {
    const list = await api<Usuario[]>('/usuarios');
    setUsuarios(list);
    return list;
  }, []);

  const applySession = useCallback(
    async (token: string) => {
      setToken(token);
      const me = await api<Usuario>('/auth/me');
      setUser(me);
      const list = await refreshUsuarios();
      const stored = readViewUser();
      const allowed = new Set(list.map((u) => u.id));
      if (stored && allowed.has(stored)) setSelected(stored);
      else setSelected(me.id);
    },
    [refreshUsuarios],
  );

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setReady(true);
      return;
    }
    applySession(token)
      .catch(() => logout())
      .finally(() => setReady(true));
  }, [applySession, logout]);

  useEffect(() => {
    const onUnauthorized = () => logout();
    window.addEventListener('anga:unauthorized', onUnauthorized);
    return () => window.removeEventListener('anga:unauthorized', onUnauthorized);
  }, [logout]);

  const login = useCallback(
    async (email: string, password: string) => {
      const data = await api<{ token: string; user: Usuario }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      await applySession(data.token);
    },
    [applySession],
  );

  const setSelectedUserId = useCallback((id: string) => {
    setSelected(id);
    try {
      window.sessionStorage.setItem(VIEW_KEY, id);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<AuthContextValue>(() => {
    const rol: Rol | undefined = user?.rol;
    return {
      ready,
      user,
      usuarios,
      selectedUserId: selectedUserId || user?.id || '',
      login,
      logout,
      refreshUsuarios,
      setSelectedUserId,
      canManageUsers: rol === 'admin' || rol === 'lider',
      canSeeTeam: rol === 'admin' || rol === 'lider',
    };
  }, [ready, user, usuarios, selectedUserId, login, logout, refreshUsuarios, setSelectedUserId]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
}
