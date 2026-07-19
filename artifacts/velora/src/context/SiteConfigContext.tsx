import React, { createContext, useContext, useState, useCallback } from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────
export interface NavLink    { label: string; href: string; }
export interface FooterLink { label: string; href: string; }
export interface FooterColumn { title: string; links: FooterLink[]; }

export interface Product {
  id: number;
  name: string;
  desc: string;
  price: number;
  category: string;
  tag: string;
  imageUrl: string;
  objectPosition: string;
  visible: boolean;
}

export interface Testimonial { quote: string; author: string; role: string; }
export interface ProcessStep { num: string; title: string; desc: string; }

export interface SiteConfig {
  site: {
    logoText: string;
    tagline: string;
    name: string;
    description: string;
    copyright: string;
    adminPassword: string;
  };
  hero: {
    badge: string;
    headline: string;
    headlineItalic: string;
    subheadline: string;
    ctaText: string;
    statsText: string;
  };
  marquee: { words: string[] };
  nav: { links: NavLink[] };
  footer: {
    description: string;
    ctaHeadline: string;
    ctaButton: string;
    columns: FooterColumn[];
    copyright: string;
    bottomLinks: string[];
  };
  products: Product[];
  testimonials: Testimonial[];
  process: {
    headline: string;
    headlineItalic: string;
    subheadline: string;
    steps: ProcessStep[];
    ingredients: string[];
  };
  pages: Record<string, { title: string; content: string }>;
}

// ─── Defaults ────────────────────────────────────────────────────────────────
const DEFAULT_CONFIG: SiteConfig = {
  site: {
    logoText: 'VELORA',
    tagline: 'The Art of Chocolate',
    name: 'Velora',
    description: 'Artisanal chocolate crafted in small batches for unmatched richness. Made to melt your heart.',
    copyright: '© 2024 VELORA. The Art of Chocolate.',
    adminPassword: 'velora2024',
  },
  hero: {
    badge: 'Extraordinary Ingredients · Timeless Indulgence',
    headline: 'Made To',
    headlineItalic: 'Melt',
    subheadline: 'Velora chocolates are handcrafted with the world\'s finest cacao, crafted in small batches for unmatched richness.',
    ctaText: 'Explore Collection',
    statsText: 'Loved by 10k+',
  },
  marquee: {
    words: ['Handcrafted', 'Single Origin', 'Velvet Truffles', 'Gold Collection', 'Dark 70%', 'Hazelnut Praline', 'Small Batch', 'Artisan Made'],
  },
  nav: {
    links: [
      { label: 'Shop',        href: '/shop' },
      { label: 'Collections', href: '/collections' },
      { label: 'Gifts',       href: '/gifts' },
      { label: 'Story',       href: '/story' },
      { label: 'Contact',     href: '/contact' },
    ],
  },
  footer: {
    description: 'Artisanal chocolate crafted in small batches for unmatched richness. Made to melt your heart.',
    ctaHeadline: 'Your Chocolate Experience Awaits.',
    ctaButton: 'Shop The Collection',
    columns: [
      {
        title: 'Shop',
        links: [
          { label: 'All Collections', href: '/collections' },
          { label: 'Dark Chocolate',  href: '/collections' },
          { label: 'Truffles & Pralines', href: '/shop' },
          { label: 'Gift Boxes',      href: '/gifts' },
        ],
      },
      {
        title: 'About',
        links: [
          { label: 'Our Story',      href: '/story' },
          { label: 'Ingredients',    href: '/story' },
          { label: 'Sustainability', href: '/story' },
          { label: 'Careers',        href: '/contact' },
        ],
      },
      {
        title: 'Support',
        links: [
          { label: 'Contact Us',         href: '/contact' },
          { label: 'FAQ',                href: '/contact' },
          { label: 'Shipping & Returns', href: '/contact' },
          { label: 'Track Order',        href: '/contact' },
        ],
      },
    ],
    copyright: '© 2024 VELORA. The Art of Chocolate.',
    bottomLinks: ['Luxury Design', 'Ecommerce That Sells', 'Storytelling'],
  },
  products: [
    { id: 1,  name: 'Hazelnut Praline Box',      desc: '12 Pieces',           price: 42, category: 'Pralines', tag: 'Bestseller', imageUrl: '', objectPosition: '10% 60%', visible: true },
    { id: 2,  name: 'Velvet Truffles',            desc: '16 Pieces',           price: 36, category: 'Truffles', tag: 'Bestseller', imageUrl: '', objectPosition: '50% 60%', visible: true },
    { id: 3,  name: 'Salted Caramel Squares',     desc: '12 Pieces',           price: 38, category: 'Bars',     tag: 'New',        imageUrl: '', objectPosition: '85% 60%', visible: true },
    { id: 4,  name: 'Noir Gift Box',              desc: '24 Pieces',           price: 68, category: 'Gifts',    tag: 'Limited',    imageUrl: '', objectPosition: '10% 85%', visible: true },
    { id: 5,  name: 'Cocoa Bonbons',              desc: '12 Pieces',           price: 34, category: 'Truffles', tag: '',           imageUrl: '', objectPosition: '50% 85%', visible: true },
    { id: 6,  name: 'Signature Dark Bar',         desc: '70% Single Origin',   price: 14, category: 'Bars',     tag: 'Signature',  imageUrl: '', objectPosition: '60% 40%', visible: true },
    { id: 7,  name: 'Gold Collection Gift Box',   desc: '12-Piece Assorted',   price: 64, category: 'Gifts',    tag: 'Bestseller', imageUrl: '', objectPosition: '80% 70%', visible: true },
    { id: 8,  name: 'Dark Chocolate Truffles',    desc: '8 Pieces',            price: 32, category: 'Truffles', tag: '',           imageUrl: '', objectPosition: '50% 90%', visible: true },
    { id: 9,  name: 'Single Origin 70%',          desc: 'Full Bar',            price: 28, category: 'Bars',     tag: 'New',        imageUrl: '', objectPosition: '50% 50%', visible: true },
  ],
  testimonials: [
    { quote: "The website feels as premium as the chocolate. Smooth, elegant and easy to shop. The hazelnut pralines are simply divine.", author: 'Sophia M.', role: 'Verified Buyer' },
    { quote: "Velora's online experience is pure luxury. Every detail makes you feel something. Opening the box is an event in itself.", author: 'Daniel R.',  role: 'Verified Buyer' },
    { quote: "Beautiful design, flawless experience, and chocolates that are next level. It's my go-to gift for clients and family alike.", author: 'Priya K.',  role: 'Verified Buyer' },
  ],
  process: {
    headline: 'Crafted In Layers',
    headlineItalic: 'Of Flavor.',
    subheadline: "Every Velora chocolate is a journey of precision, passion, and the world's finest ingredients.",
    steps: [
      { num: '01', title: 'Source',  desc: 'We source single-origin cacao from trusted farms that prioritize quality and sustainability.' },
      { num: '02', title: 'Roast',   desc: 'Expertly roasted to unlock deep, rich notes and complex aromas.' },
      { num: '03', title: 'Blend',   desc: 'Blended in small batches to achieve a perfectly balanced flavor profile.' },
      { num: '04', title: 'Temper',  desc: 'Tempered with care for that signature snap, shine, and silky texture.' },
      { num: '05', title: 'Finish',  desc: 'Finished by hand with premium ingredients for an unforgettable touch.' },
    ],
    ingredients: ['Single-Origin Cacao', 'Roasted Hazelnut', 'Sea Salt', 'Gold Wrapped Gifting'],
  },
  pages: {
    story:         { title: 'Our Story',      content: 'Founded in Paris in 2012 with a single obsession: making the world\'s most honest chocolate.' },
    ingredients:   { title: 'Ingredients',    content: 'We use only the finest single-origin cacao, ethically sourced from partner farms.' },
    sustainability:{ title: 'Sustainability', content: 'Our commitment to the planet is as strong as our commitment to flavor.' },
    faq:           { title: 'FAQ',            content: 'Have a question? We\'ve got answers. Contact us at hello@velora.com' },
    shipping:      { title: 'Shipping & Returns', content: 'Free shipping on orders over $50. Returns accepted within 14 days.' },
  },
};

// ─── Storage ──────────────────────────────────────────────────────────────────
const STORAGE_KEY = 'velora_site_config';

function loadConfig(): SiteConfig {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return DEFAULT_CONFIG;
    const parsed = JSON.parse(saved);
    // Deep merge: keep DEFAULT_CONFIG as fallback for any missing keys
    return deepMerge(DEFAULT_CONFIG, parsed);
  } catch { return DEFAULT_CONFIG; }
}

function deepMerge<T extends object>(defaults: T, overrides: Partial<T>): T {
  const result = { ...defaults };
  for (const key in overrides) {
    const val = overrides[key];
    if (val !== null && typeof val === 'object' && !Array.isArray(val) && typeof defaults[key] === 'object') {
      (result as any)[key] = deepMerge((defaults as any)[key], val as any);
    } else if (val !== undefined) {
      (result as any)[key] = val;
    }
  }
  return result;
}

// ─── Context ──────────────────────────────────────────────────────────────────
interface SiteConfigContextValue {
  config: SiteConfig;
  updateConfig: (patch: DeepPartial<SiteConfig>) => void;
  resetConfig: () => void;
}

type DeepPartial<T> = { [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K] };

const SiteConfigContext = createContext<SiteConfigContextValue | null>(null);

export function SiteConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<SiteConfig>(loadConfig);

  const updateConfig = useCallback((patch: DeepPartial<SiteConfig>) => {
    setConfig(prev => {
      const next = deepMerge(prev, patch as Partial<SiteConfig>);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const resetConfig = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setConfig(DEFAULT_CONFIG);
  }, []);

  return (
    <SiteConfigContext.Provider value={{ config, updateConfig, resetConfig }}>
      {children}
    </SiteConfigContext.Provider>
  );
}

export function useSiteConfig() {
  const ctx = useContext(SiteConfigContext);
  if (!ctx) throw new Error('useSiteConfig must be used within SiteConfigProvider');
  return ctx;
}
