import React, { createContext, useContext, useState, useCallback } from 'react';

interface User { name: string; email: string; }
interface StoredUser extends User { password: string; }

interface AuthContextValue {
  user: User | null;
  login: (email: string, password: string) => Promise<'ok' | 'not_found' | 'wrong_password'>;
  register: (name: string, email: string, password: string) => Promise<'ok' | 'email_taken'>;
  logout: () => void;
  isOpen: boolean;
  authMode: 'login' | 'register';
  openAuth: (mode?: 'login' | 'register') => void;
  closeAuth: () => void;
  setAuthMode: (m: 'login' | 'register') => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const SESSION_KEY = 'velora_session';
const USERS_KEY = 'velora_users';

function getUsers(): StoredUser[] {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); } catch { return []; }
}
function saveUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try { const s = localStorage.getItem(SESSION_KEY); return s ? JSON.parse(s) : null; } catch { return null; }
  });
  const [isOpen, setIsOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const login = useCallback(async (email: string, password: string) => {
    const users = getUsers();
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!found) return 'not_found' as const;
    if (found.password !== password) return 'wrong_password' as const;
    const u = { name: found.name, email: found.email };
    setUser(u);
    localStorage.setItem(SESSION_KEY, JSON.stringify(u));
    return 'ok' as const;
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    const users = getUsers();
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) return 'email_taken' as const;
    const newUser: StoredUser = { name, email, password };
    saveUsers([...users, newUser]);
    const u = { name, email };
    setUser(u);
    localStorage.setItem(SESSION_KEY, JSON.stringify(u));
    return 'ok' as const;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  }, []);

  const openAuth = useCallback((mode: 'login' | 'register' = 'login') => {
    setAuthMode(mode);
    setIsOpen(true);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isOpen, authMode, openAuth, closeAuth: () => setIsOpen(false), setAuthMode }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
