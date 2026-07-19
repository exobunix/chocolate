import React, { useState } from 'react';
import { Save, Plus, Trash2, GripVertical } from 'lucide-react';
import { useSiteConfig, NavLink } from '@/context/SiteConfigContext';

function SaveBar({ onSave, saved }: { onSave: () => void; saved: boolean }) {
  return (
    <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/5 mt-4">
      {saved && <span className="text-xs text-green-400">✓ Saved</span>}
      <button onClick={onSave} className="flex items-center gap-2 bg-[#c9a84c] text-black font-medium px-5 py-2.5 rounded-full hover:bg-[#d4b860] transition-colors text-sm">
        <Save className="w-4 h-4" /> Save Changes
      </button>
    </div>
  );
}

function LinkEditor({
  links,
  onChange,
}: {
  links: NavLink[];
  onChange: (links: NavLink[]) => void;
}) {
  const set = (i: number, k: keyof NavLink, v: string) =>
    onChange(links.map((l, idx) => idx === i ? { ...l, [k]: v } : l));
  const remove = (i: number) => onChange(links.filter((_, idx) => idx !== i));
  const add = () => onChange([...links, { label: '', href: '/' }]);

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-[auto_1fr_1fr_auto] gap-3 text-xs text-white/30 uppercase tracking-widest px-1">
        <span className="w-5" />
        <span>Label</span>
        <span>URL / Path</span>
        <span className="w-7" />
      </div>
      {links.map((link, i) => (
        <div key={i} className="grid grid-cols-[auto_1fr_1fr_auto] gap-3 items-center">
          <GripVertical className="w-5 h-5 text-white/20 shrink-0" />
          <input
            className="admin-input"
            value={link.label}
            onChange={e => set(i, 'label', e.target.value)}
            placeholder="Label"
          />
          <input
            className="admin-input"
            value={link.href}
            onChange={e => set(i, 'href', e.target.value)}
            placeholder="/path or https://..."
          />
          <button onClick={() => remove(i)} className="w-7 h-7 rounded-lg flex items-center justify-center text-white/20 hover:text-red-400 hover:bg-red-400/10 transition-colors shrink-0">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
      <button onClick={add} className="flex items-center gap-2 text-sm text-[#c9a84c] hover:underline mt-2">
        <Plus className="w-4 h-4" /> Add Link
      </button>
    </div>
  );
}

export default function NavigationAdmin() {
  const { config, updateConfig } = useSiteConfig();
  const [navLinks, setNavLinks] = useState(config.nav.links);
  const [saved, setSaved] = useState(false);

  const save = () => {
    updateConfig({ nav: { links: navLinks } });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Navigation</h1>
        <p className="text-white/40 text-sm">Edit the header navigation links that appear across the site.</p>
      </div>

      <div className="bg-[#110703] border border-white/5 rounded-2xl p-6">
        <h3 className="font-semibold mb-5">Header Navigation Links</h3>
        <LinkEditor links={navLinks} onChange={setNavLinks} />
        <SaveBar onSave={save} saved={saved} />
      </div>

      {/* Preview */}
      <div className="bg-[#110703] border border-white/5 rounded-2xl p-6">
        <h3 className="font-semibold mb-4 text-sm text-white/60 uppercase tracking-widest">Preview</h3>
        <div className="flex items-center gap-8 px-4 py-3 bg-black/40 rounded-xl border border-white/5">
          <span className="font-serif text-[#c9a84c] tracking-widest text-sm">{config.site.logoText}</span>
          <div className="flex items-center gap-6">
            {navLinks.map((l, i) => (
              <span key={i} className="text-xs uppercase tracking-widest text-white/60">{l.label || '—'}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Routing reference */}
      <div className="bg-[#110703] border border-white/5 rounded-2xl p-6">
        <h3 className="font-semibold mb-4 text-sm">Available Pages</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { path: '/',            label: 'Home' },
            { path: '/shop',        label: 'Shop' },
            { path: '/collections', label: 'Collections' },
            { path: '/gifts',       label: 'Gifts' },
            { path: '/story',       label: 'Our Story' },
            { path: '/contact',     label: 'Contact' },
          ].map(p => (
            <div key={p.path} className="bg-white/[0.03] rounded-xl px-4 py-3 border border-white/5">
              <p className="text-xs text-white/30 font-mono mb-0.5">{p.path}</p>
              <p className="text-sm font-medium">{p.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
