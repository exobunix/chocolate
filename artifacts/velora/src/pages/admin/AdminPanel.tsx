import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Package, FileText, Navigation, Layout,
  Users, BookOpen, Settings, Image, Lock, Eye, EyeOff,
  LogOut, ChevronRight, ExternalLink, Menu, X,
} from 'lucide-react';
import { useSiteConfig } from '@/context/SiteConfigContext';
import { Link } from 'wouter';

import Dashboard      from './sections/Dashboard';
import ProductsAdmin  from './sections/ProductsAdmin';
import ContentAdmin   from './sections/ContentAdmin';
import NavigationAdmin from './sections/NavigationAdmin';
import FooterAdmin    from './sections/FooterAdmin';
import UsersAdmin     from './sections/UsersAdmin';
import PagesAdmin     from './sections/PagesAdmin';
import SettingsAdmin  from './sections/SettingsAdmin';
import MediaAdmin     from './sections/MediaAdmin';

// ─── Section registry ─────────────────────────────────────────────────────────
const SECTIONS = [
  { id: 'dashboard',   label: 'Dashboard',   icon: LayoutDashboard, group: 'main' },
  { id: 'products',    label: 'Products',     icon: Package,         group: 'content' },
  { id: 'content',     label: 'Content',      icon: FileText,        group: 'content' },
  { id: 'navigation',  label: 'Navigation',   icon: Navigation,      group: 'content' },
  { id: 'footer',      label: 'Footer',       icon: Layout,          group: 'content' },
  { id: 'pages',       label: 'Pages',        icon: BookOpen,        group: 'content' },
  { id: 'media',       label: 'Media',        icon: Image,           group: 'content' },
  { id: 'users',       label: 'Users',        icon: Users,           group: 'people' },
  { id: 'settings',    label: 'Settings',     icon: Settings,        group: 'system' },
];

const GROUPS: Record<string, string> = {
  main: '',
  content: 'Content Management',
  people: 'People',
  system: 'System',
};

// ─── Login Screen ─────────────────────────────────────────────────────────────
function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const { config } = useSiteConfig();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    setLoading(false);
    if (password === config.site.adminPassword) {
      sessionStorage.setItem('velora_admin_auth', '1');
      onLogin();
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#060201] flex items-center justify-center p-4">
      {/* Background grain — pointer-events-none so it never blocks clicks */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
      }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-sm"
      >
        {/* Logo */}
        <div className="text-center mb-10">
          <span className="font-serif text-3xl tracking-[0.3em] text-[#c9a84c]">VELORA</span>
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#c9a84c]/40 mt-1">Admin Console</p>
        </div>

        <div className="bg-[#0d0502] border border-[#c9a84c]/10 rounded-2xl shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)] overflow-hidden">
          <div className="px-8 py-6 border-b border-white/5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/20 flex items-center justify-center">
              <Lock className="w-4 h-4 text-[#c9a84c]" />
            </div>
            <div>
              <h2 className="font-semibold text-sm">Admin Access</h2>
              <p className="text-xs text-white/30">Enter your admin password to continue</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="px-8 py-6 space-y-4">
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => { setPassword(e.target.value); setError(''); }}
                placeholder="Admin password"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-4 pr-12 text-sm placeholder:text-white/20 focus:outline-none focus:border-[#c9a84c]/40 transition-colors"
                autoFocus
              />
              <button type="button" onClick={() => setShowPass(s => !s)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/50 transition-colors">
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <AnimatePresence>
              {error && (
                <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="text-red-400 text-xs text-center bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <button type="submit" disabled={!password || loading}
              className="w-full bg-[#c9a84c] text-black font-semibold py-3.5 rounded-full flex items-center justify-center gap-2 hover:bg-[#d4b860] transition-all disabled:opacity-40 disabled:cursor-not-allowed">
              {loading ? (
                <span className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
              ) : (
                <>Enter Admin Panel <ChevronRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <div className="px-8 pb-6 text-center">
            <Link href="/" className="text-xs text-white/20 hover:text-white/50 transition-colors flex items-center justify-center gap-1">
              <ExternalLink className="w-3 h-3" /> Back to site
            </Link>
          </div>
        </div>

        <p className="text-center text-[10px] text-white/15 mt-6 tracking-widest uppercase">
          Default password: velora2024
        </p>
      </motion.div>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function Sidebar({
  active,
  setActive,
  onLogout,
  mobileOpen,
  setMobileOpen,
}: {
  active: string;
  setActive: (s: string) => void;
  onLogout: () => void;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
}) {
  const { config } = useSiteConfig();

  const groups = Object.entries(GROUPS);
  const sectionsByGroup = (gid: string) => SECTIONS.filter(s => s.group === gid);

  const NavItem = ({ section }: { section: typeof SECTIONS[0] }) => (
    <button
      onClick={() => { setActive(section.id); setMobileOpen(false); }}
      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-left transition-all group ${
        active === section.id
          ? 'bg-[#c9a84c] text-black font-semibold'
          : 'text-white/50 hover:text-white hover:bg-white/[0.05]'
      }`}
    >
      <section.icon className={`w-4 h-4 shrink-0 ${active === section.id ? 'text-black' : 'text-white/40 group-hover:text-white/70'}`} />
      <span className="text-sm">{section.label}</span>
    </button>
  );

  const content = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-6 border-b border-white/5 shrink-0">
        <div className="flex flex-col">
          <span className="font-serif text-lg tracking-[0.2em] text-[#c9a84c]">{config.site.logoText}</span>
          <span className="text-[9px] tracking-[0.25em] text-[#c9a84c]/40 uppercase">{config.site.tagline}</span>
        </div>
        <div className="mt-2 inline-flex items-center gap-1.5 bg-[#c9a84c]/10 border border-[#c9a84c]/20 rounded-full px-2.5 py-1">
          <div className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] animate-pulse" />
          <span className="text-[10px] text-[#c9a84c] font-medium tracking-wider uppercase">Admin</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {groups.map(([gid, gLabel]) => {
          const items = sectionsByGroup(gid);
          if (!items.length) return null;
          return (
            <div key={gid}>
              {gLabel && (
                <p className="text-[10px] text-white/20 uppercase tracking-[0.2em] px-4 mb-2">{gLabel}</p>
              )}
              <div className="space-y-0.5">
                {items.map(section => <NavItem key={section.id} section={section} />)}
              </div>
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-white/5 space-y-1 shrink-0">
        <Link href="/" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-white/40 hover:text-white hover:bg-white/[0.05] transition-all">
          <ExternalLink className="w-4 h-4 shrink-0" />
          <span className="text-sm">View Site</span>
        </Link>
        <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-white/40 hover:text-red-400 hover:bg-red-400/10 transition-all">
          <LogOut className="w-4 h-4 shrink-0" />
          <span className="text-sm">Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-60 shrink-0 bg-[#080301] border-r border-white/[0.06] h-screen sticky top-0 flex-col overflow-hidden">
        {content}
      </aside>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)} />
            <motion.aside
              initial={{ x: -240 }} animate={{ x: 0 }} exit={{ x: -240 }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 z-50 w-60 bg-[#080301] border-r border-white/[0.06] flex flex-col lg:hidden overflow-hidden"
            >
              {content}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Section Renderer ─────────────────────────────────────────────────────────
function SectionContent({ section, setSection }: { section: string; setSection: (s: string) => void }) {
  switch (section) {
    case 'dashboard':  return <Dashboard setSection={setSection} />;
    case 'products':   return <ProductsAdmin />;
    case 'content':    return <ContentAdmin />;
    case 'navigation': return <NavigationAdmin />;
    case 'footer':     return <FooterAdmin />;
    case 'users':      return <UsersAdmin />;
    case 'pages':      return <PagesAdmin />;
    case 'settings':   return <SettingsAdmin />;
    case 'media':      return <MediaAdmin />;
    default:           return <Dashboard setSection={setSection} />;
  }
}

// ─── Main Admin Shell ─────────────────────────────────────────────────────────
export default function AdminPanel() {
  const [isAuthed, setIsAuthed] = useState(() => sessionStorage.getItem('velora_admin_auth') === '1');
  const [section, setSection] = useState('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);

  const logout = () => {
    sessionStorage.removeItem('velora_admin_auth');
    setIsAuthed(false);
  };

  if (!isAuthed) return <AdminLogin onLogin={() => setIsAuthed(true)} />;

  return (
    <div className="min-h-screen bg-[#0a0402] text-white flex">
      <Sidebar
        active={section}
        setActive={setSection}
        onLogout={logout}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 h-14 bg-[#0a0402]/90 backdrop-blur-sm border-b border-white/[0.06] flex items-center gap-4 px-6">
          <button onClick={() => setMobileOpen(true)} className="lg:hidden text-white/50 hover:text-white transition-colors p-1">
            <Menu className="w-5 h-5" />
          </button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-white/30">Admin</span>
            <ChevronRight className="w-3 h-3 text-white/20" />
            <span className="font-medium">{SECTIONS.find(s => s.id === section)?.label || 'Dashboard'}</span>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <Link href="/" className="hidden sm:flex items-center gap-1.5 text-xs text-white/30 hover:text-[#c9a84c] transition-colors border border-white/5 hover:border-[#c9a84c]/20 px-3 py-1.5 rounded-full">
              <ExternalLink className="w-3 h-3" /> View Site
            </Link>
            <button onClick={logout} className="text-white/30 hover:text-red-400 transition-colors p-1">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Section content */}
        <main className="flex-1 overflow-auto p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={section}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="max-w-5xl mx-auto"
            >
              <SectionContent section={section} setSection={setSection} />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
