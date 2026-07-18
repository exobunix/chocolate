import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Search, User, ShoppingCart, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-transparent ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-md border-border/50 py-4 shadow-sm'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="text-3xl font-serif tracking-widest text-primary z-50">
          VELORA
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {['Shop', 'Collections', 'Gifts', 'Story', 'Contact'].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="text-sm uppercase tracking-widest hover:text-primary transition-colors text-foreground/80 font-medium"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Icons */}
        <div className="hidden md:flex items-center gap-6 z-50">
          <button className="text-foreground/80 hover:text-primary transition-colors" data-testid="button-search">
            <Search className="w-5 h-5" />
          </button>
          <button className="text-foreground/80 hover:text-primary transition-colors" data-testid="button-user">
            <User className="w-5 h-5" />
          </button>
          <button className="text-foreground/80 hover:text-primary transition-colors relative" data-testid="button-cart">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              0
            </span>
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden z-50 text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          data-testid="button-mobile-menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg p-6 flex flex-col gap-6 md:hidden"
          >
            {['Shop', 'Collections', 'Gifts', 'Story', 'Contact'].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-lg uppercase tracking-widest hover:text-primary transition-colors text-foreground/90 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
            <div className="flex items-center gap-6 pt-6 border-t border-border/50">
              <button className="text-foreground/80 hover:text-primary transition-colors flex gap-2 items-center">
                <Search className="w-5 h-5" /> Search
              </button>
              <button className="text-foreground/80 hover:text-primary transition-colors flex gap-2 items-center">
                <User className="w-5 h-5" /> Account
              </button>
              <button className="text-foreground/80 hover:text-primary transition-colors flex gap-2 items-center">
                <ShoppingCart className="w-5 h-5" /> Cart (0)
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
