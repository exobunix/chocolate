import React, { useState, useMemo } from 'react';
import { Trash2, Search, UserX, Shield, Users } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface StoredUser { name: string; email: string; password: string; }

function getUsers(): StoredUser[] {
  try { return JSON.parse(localStorage.getItem('velora_users') || '[]'); } catch { return []; }
}
function saveUsers(users: StoredUser[]) { localStorage.setItem('velora_users', JSON.stringify(users)); }

export default function UsersAdmin() {
  const [users, setUsers] = useState<StoredUser[]>(getUsers);
  const [search, setSearch] = useState('');
  const [deleteEmail, setDeleteEmail] = useState<string | null>(null);

  const filtered = useMemo(() =>
    users.filter(u =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
    ), [users, search]);

  const handleDelete = (email: string) => {
    const next = users.filter(u => u.email !== email);
    saveUsers(next);
    setUsers(next);
    setDeleteEmail(null);
  };

  const handleClearAll = () => {
    saveUsers([]);
    setUsers([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">Users</h1>
          <p className="text-white/40 text-sm">{users.length} registered accounts</p>
        </div>
        {users.length > 0 && (
          <button onClick={handleClearAll}
            className="flex items-center gap-2 text-sm text-red-400 border border-red-400/20 px-4 py-2 rounded-full hover:bg-red-400/10 transition-colors">
            <UserX className="w-4 h-4" /> Clear All Users
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-[#110703] border border-white/5 rounded-2xl p-5 text-center">
          <div className="text-3xl font-bold text-[#c9a84c] mb-1">{users.length}</div>
          <div className="text-xs text-white/40 uppercase tracking-widest">Total Users</div>
        </div>
        <div className="bg-[#110703] border border-white/5 rounded-2xl p-5 text-center">
          <div className="text-3xl font-bold text-blue-400 mb-1">
            {new Set(users.map(u => u.email.split('@')[1])).size}
          </div>
          <div className="text-xs text-white/40 uppercase tracking-widest">Email Domains</div>
        </div>
        <div className="bg-[#110703] border border-white/5 rounded-2xl p-5 text-center">
          <div className="text-3xl font-bold text-green-400 mb-1">0</div>
          <div className="text-xs text-white/40 uppercase tracking-widest">Admins</div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or email…"
          className="admin-input !pl-11" />
      </div>

      {/* Table */}
      <div className="bg-[#110703] border border-white/5 rounded-2xl overflow-hidden">
        <div className="grid grid-cols-[auto_1fr_1fr_auto] gap-4 px-5 py-3 border-b border-white/5 text-xs text-white/30 uppercase tracking-widest">
          <span className="w-8" />
          <span>Name</span>
          <span>Email</span>
          <span>Actions</span>
        </div>
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-white/20">
            <Users className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="text-sm">{search ? 'No users match your search' : 'No registered users yet'}</p>
          </div>
        ) : (
          <div className="divide-y divide-white/[0.04]">
            {filtered.map((user, i) => (
              <div key={user.email} className="grid grid-cols-[auto_1fr_1fr_auto] gap-4 items-center px-5 py-4 hover:bg-white/[0.02] transition-colors">
                <div className="w-8 h-8 rounded-full bg-[#c9a84c]/15 border border-[#c9a84c]/25 flex items-center justify-center">
                  <span className="text-[#c9a84c] text-xs font-serif">{user.name?.charAt(0)?.toUpperCase()}</span>
                </div>
                <div>
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-white/30 font-mono">User #{i + 1}</p>
                </div>
                <p className="text-sm text-white/60 truncate">{user.email}</p>
                <button onClick={() => setDeleteEmail(user.email)}
                  className="p-2 rounded-lg text-white/20 hover:text-red-400 hover:bg-red-400/10 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Security note */}
      <div className="flex items-start gap-3 p-4 bg-[#c9a84c]/5 border border-[#c9a84c]/15 rounded-xl">
        <Shield className="w-4 h-4 text-[#c9a84c] mt-0.5 shrink-0" />
        <p className="text-xs text-white/50 leading-relaxed">
          User passwords are stored locally in browser storage. In a production environment, always use a secure backend with hashed passwords. Never store plain-text passwords in production.
        </p>
      </div>

      {/* Delete confirm */}
      <AnimatePresence>
        {deleteEmail && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setDeleteEmail(null)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="bg-[#0d0502] border border-white/10 rounded-2xl p-6 w-full max-w-sm shadow-2xl"
              onClick={e => e.stopPropagation()}>
              <h3 className="font-semibold mb-2">Delete User</h3>
              <p className="text-white/60 text-sm mb-6">Delete the account for <strong className="text-white">{deleteEmail}</strong>? This cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => handleDelete(deleteEmail)} className="flex-1 bg-red-500 text-white font-medium py-3 rounded-full hover:bg-red-600 transition-colors text-sm">Delete</button>
                <button onClick={() => setDeleteEmail(null)} className="flex-1 border border-white/10 text-white/60 py-3 rounded-full hover:border-white/30 transition-colors text-sm">Cancel</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
