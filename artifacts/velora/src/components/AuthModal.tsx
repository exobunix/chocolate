import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Eye, EyeOff, User, Mail, Lock, CheckCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AuthModal() {
  const { isOpen, closeAuth, authMode, setAuthMode, login, register, user, logout } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const reset = () => { setForm({ name: '', email: '', password: '' }); setError(''); setSuccess(''); };

  const switchMode = (m: 'login' | 'register') => { setAuthMode(m); reset(); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setSuccess(''); setLoading(true);
    try {
      if (authMode === 'login') {
        if (!form.email || !form.password) { setError('Please fill in all fields.'); return; }
        const result = await login(form.email, form.password);
        if (result === 'ok') { setSuccess('Welcome back!'); setTimeout(closeAuth, 1200); }
        else if (result === 'not_found') setError('No account found with that email.');
        else setError('Incorrect password. Please try again.');
      } else {
        if (!form.name || !form.email || !form.password) { setError('Please fill in all fields.'); return; }
        if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return; }
        const result = await register(form.name, form.email, form.password);
        if (result === 'ok') { setSuccess('Account created! Welcome to Velora.'); setTimeout(closeAuth, 1200); }
        else setError('An account with that email already exists.');
      }
    } finally { setLoading(false); }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={closeAuth}
            className="fixed inset-0 z-[90] bg-black/75 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', damping: 28, stiffness: 350 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full max-w-md bg-[#0d0502] border border-[#c9a84c]/20 rounded-2xl shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)] overflow-hidden">
              {/* Header */}
              <div className="relative px-8 pt-8 pb-6 text-center border-b border-white/5">
                <div className="absolute inset-0 bg-gradient-to-b from-[#c9a84c]/5 to-transparent pointer-events-none" />
                <span className="font-serif text-2xl tracking-widest text-[#c9a84c]">VELORA</span>
                <p className="text-white/40 text-xs tracking-widest uppercase mt-1">The Art of Chocolate</p>
                <button
                  onClick={closeAuth}
                  className="absolute top-6 right-6 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:border-[#c9a84c]/40 hover:text-[#c9a84c] transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="px-8 py-8">
                {/* If user is logged in, show account panel */}
                {user ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-6">
                    <div className="w-20 h-20 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/30 flex items-center justify-center mx-auto">
                      <span className="font-serif text-3xl text-[#c9a84c]">{user.name.charAt(0).toUpperCase()}</span>
                    </div>
                    <div>
                      <h3 className="font-serif text-xl mb-1">Welcome, {user.name}</h3>
                      <p className="text-white/40 text-sm">{user.email}</p>
                    </div>
                    <div className="space-y-3">
                      <button
                        onClick={() => { logout(); closeAuth(); }}
                        className="w-full py-3 rounded-full border border-white/10 text-white/60 text-sm hover:border-red-400/40 hover:text-red-400 transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <>
                    {/* Tabs */}
                    <div className="flex bg-white/5 rounded-full p-1 mb-8">
                      {(['login', 'register'] as const).map(m => (
                        <button
                          key={m}
                          onClick={() => switchMode(m)}
                          className={`flex-1 py-2.5 rounded-full text-sm font-medium transition-all capitalize ${authMode === m ? 'bg-[#c9a84c] text-black shadow-sm' : 'text-white/50 hover:text-white'}`}
                        >
                          {m === 'login' ? 'Sign In' : 'Create Account'}
                        </button>
                      ))}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <AnimatePresence mode="wait">
                        {authMode === 'register' && (
                          <motion.div
                            key="name-field"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="relative">
                              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                              <input
                                type="text"
                                placeholder="Full Name"
                                value={form.name}
                                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-sm placeholder:text-white/30 focus:outline-none focus:border-[#c9a84c]/50 transition-colors"
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                        <input
                          type="email"
                          placeholder="Email Address"
                          value={form.email}
                          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-sm placeholder:text-white/30 focus:outline-none focus:border-[#c9a84c]/50 transition-colors"
                        />
                      </div>

                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                        <input
                          type={showPass ? 'text' : 'password'}
                          placeholder="Password"
                          value={form.password}
                          onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-12 text-sm placeholder:text-white/30 focus:outline-none focus:border-[#c9a84c]/50 transition-colors"
                        />
                        <button type="button" onClick={() => setShowPass(s => !s)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                          {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>

                      <AnimatePresence>
                        {error && (
                          <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                            className="text-red-400 text-sm text-center bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-2.5">
                            {error}
                          </motion.p>
                        )}
                        {success && (
                          <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                            className="text-green-400 text-sm text-center bg-green-400/10 border border-green-400/20 rounded-lg px-4 py-2.5 flex items-center justify-center gap-2">
                            <CheckCircle className="w-4 h-4" /> {success}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#c9a84c] text-black font-medium py-4 rounded-full hover:bg-[#d4b860] transition-all hover:shadow-[0_0_30px_rgba(201,168,76,0.4)] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                      >
                        {loading ? (
                          <span className="flex items-center justify-center gap-2">
                            <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                            Please wait...
                          </span>
                        ) : authMode === 'login' ? 'Sign In' : 'Create Account'}
                      </button>

                      {authMode === 'login' && (
                        <p className="text-center text-xs text-white/30 mt-2">
                          Don't have an account?{' '}
                          <button type="button" onClick={() => switchMode('register')} className="text-[#c9a84c] hover:underline">
                            Create one
                          </button>
                        </p>
                      )}
                    </form>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
