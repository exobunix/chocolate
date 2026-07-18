import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Search, User, ShoppingCart, Menu, X, LogOut, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

const navLinks = [
  { label: 'Shop', href: '/shop', section: 'shop' },
  { label: 'Collections', href: '/collections' },
  { label: 'Gifts', href: '/gifts', section: 'gifts' },
  { label: 'Story', href: '/story', section: 'story' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { count, openCart } = useCart();
  const { user, openAuth, logout } = useAuth();
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close user menu on outside click
  useEffect(() => {
    if (!userMenuOpen) return;
    const handler = () => setUserMenuOpen(false);
    setTimeout(() => document.addEventListener('click', handler), 0);
    return () => document.removeEventListener('click', handler);
  }, [userMenuOpen]);

  const handleNavClick = (link: typeof navLinks[0]) => {
    setIsMobileOpen(false);
    if (link.section && location === '/') {
      const el = document.getElementById(link.section);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        isScrolled
          ? 'bg-[#0a0402]/85 backdrop-blur-xl border-[#c9a84c]/10 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'bg-transparent border-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="z-50 flex flex-col leading-none">
          <span className="text-2xl font-serif tracking-[0.25em] text-[#c9a84c]">VELORA</span>
          <span className="text-[9px] tracking-[0.3em] text-[#c9a84c]/50 uppercase">The Art of Chocolate</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => handleNavClick(link)}
              className={`text-xs uppercase tracking-[0.2em] font-medium transition-colors relative group ${
                location === link.href ? 'text-[#c9a84c]' : 'text-white/70 hover:text-white'
              }`}
            >
              {link.label}
              <span className={`absolute -bottom-1 left-0 h-px bg-[#c9a84c] transition-all duration-300 ${
                location === link.href ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </Link>
          ))}
        </nav>

        {/* Icons */}
        <div className="hidden md:flex items-center gap-5 z-50">
          <button className="text-white/60 hover:text-[#c9a84c] transition-colors p-1">
            <Search className="w-4.5 h-4.5" style={{ width: 18, height: 18 }} />
          </button>

          {/* User button */}
          <div className="relative">
            <button
              onClick={() => user ? setUserMenuOpen(o => !o) : openAuth('login')}
              className="flex items-center gap-1.5 text-white/60 hover:text-[#c9a84c] transition-colors p-1"
            >
              {user ? (
                <>
                  <div className="w-7 h-7 rounded-full bg-[#c9a84c]/20 border border-[#c9a84c]/40 flex items-center justify-center">
                    <span className="text-[#c9a84c] text-xs font-serif font-medium">{user.name.charAt(0).toUpperCase()}</span>
                  </div>
                  <ChevronDown className="w-3 h-3 text-[#c9a84c]/60" />
                </>
              ) : (
                <User style={{ width: 18, height: 18 }} />
              )}
            </button>

            <AnimatePresence>
              {userMenuOpen && user && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-52 bg-[#0d0502] border border-[#c9a84c]/15 rounded-xl shadow-2xl overflow-hidden"
                  onClick={e => e.stopPropagation()}
                >
                  <div className="px-4 py-3 border-b border-white/5">
                    <p className="text-sm font-medium truncate">{user.name}</p>
                    <p className="text-xs text-white/40 truncate">{user.email}</p>
                  </div>
                  <div className="p-1.5">
                    <button
                      onClick={() => { logout(); setUserMenuOpen(false); }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white/60 hover:text-red-400 hover:bg-red-400/10 transition-colors text-left"
                    >
                      <LogOut className="w-3.5 h-3.5" /> Sign Out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Cart button */}
          <button
            onClick={openCart}
            className="relative text-white/60 hover:text-[#c9a84c] transition-colors p-1"
          >
            <ShoppingCart style={{ width: 18, height: 18 }} />
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1.5 -right-1.5 bg-[#c9a84c] text-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
                >
                  {count > 9 ? '9+' : count}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden flex items-center gap-3 z-50">
          <button onClick={openCart} className="relative text-white/70 hover:text-[#c9a84c] transition-colors">
            <ShoppingCart className="w-5 h-5" />
            {count > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#c9a84c] text-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{count}</span>
            )}
          </button>
          <button onClick={() => setIsMobileOpen(o => !o)} className="text-white/70 hover:text-white">
            {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 bg-[#0a0402]/95 backdrop-blur-xl border-b border-[#c9a84c]/10 px-6 py-8 flex flex-col gap-6 md:hidden"
          >
            {navLinks.map(link => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => handleNavClick(link)}
                className="text-sm uppercase tracking-[0.2em] text-white/70 hover:text-[#c9a84c] transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-white/5 flex items-center gap-4">
              {user ? (
                <button onClick={() => { logout(); setIsMobileOpen(false); }} className="flex items-center gap-2 text-sm text-red-400">
                  <LogOut className="w-4 h-4" /> Sign Out ({user.name})
                </button>
              ) : (
                <>
                  <button onClick={() => { openAuth('login'); setIsMobileOpen(false); }} className="text-sm text-white/60 hover:text-[#c9a84c]">Sign In</button>
                  <button onClick={() => { openAuth('register'); setIsMobileOpen(false); }} className="text-sm bg-[#c9a84c]/10 border border-[#c9a84c]/30 text-[#c9a84c] px-4 py-2 rounded-full">Create Account</button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
