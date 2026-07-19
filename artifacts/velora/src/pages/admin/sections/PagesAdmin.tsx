import React, { useState } from 'react';
import { Save, FileText } from 'lucide-react';
import { useSiteConfig } from '@/context/SiteConfigContext';

const PAGE_KEYS = [
  { key: 'story',          label: 'Our Story',          route: '/story' },
  { key: 'ingredients',    label: 'Ingredients',         route: '/story' },
  { key: 'sustainability', label: 'Sustainability',       route: '/story' },
  { key: 'faq',            label: 'FAQ',                 route: '/contact' },
  { key: 'shipping',       label: 'Shipping & Returns',  route: '/contact' },
];

export default function PagesAdmin() {
  const { config, updateConfig } = useSiteConfig();
  const [pages, setPages] = useState(config.pages);
  const [activeKey, setActiveKey] = useState(PAGE_KEYS[0].key);
  const [saved, setSaved] = useState(false);

  const activePage = PAGE_KEYS.find(p => p.key === activeKey)!;

  const setField = (k: 'title' | 'content', v: string) =>
    setPages(p => ({ ...p, [activeKey]: { ...p[activeKey], [k]: v } }));

  const save = () => {
    updateConfig({ pages });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Pages</h1>
        <p className="text-white/40 text-sm">Edit content for informational pages linked in the footer.</p>
      </div>

      <div className="grid lg:grid-cols-[220px_1fr] gap-6">
        {/* Sidebar nav */}
        <div className="bg-[#110703] border border-white/5 rounded-2xl p-3 h-fit">
          <p className="text-xs text-white/30 uppercase tracking-widest px-3 py-2">Pages</p>
          {PAGE_KEYS.map(p => (
            <button key={p.key} onClick={() => setActiveKey(p.key)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors mb-0.5 ${
                activeKey === p.key
                  ? 'bg-[#c9a84c]/10 text-[#c9a84c]'
                  : 'text-white/60 hover:text-white hover:bg-white/[0.03]'
              }`}>
              <FileText className="w-4 h-4 shrink-0" />
              <div>
                <p className="text-sm font-medium leading-none mb-0.5">{p.label}</p>
                <p className="text-xs text-white/30 font-mono">{p.route}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Editor */}
        <div className="bg-[#110703] border border-white/5 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-[#c9a84c]/10 flex items-center justify-center">
              <FileText className="w-4 h-4 text-[#c9a84c]" />
            </div>
            <div>
              <h3 className="font-semibold">{activePage.label}</h3>
              <p className="text-xs text-white/30 font-mono">{activePage.route}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs text-white/40 uppercase tracking-widest mb-1.5">Page Title</label>
              <input className="admin-input" value={pages[activeKey]?.title || ''} onChange={e => setField('title', e.target.value)} />
            </div>
            <div>
              <label className="block text-xs text-white/40 uppercase tracking-widest mb-1.5">Page Content</label>
              <textarea rows={12} className="admin-input resize-none font-mono text-sm leading-relaxed"
                value={pages[activeKey]?.content || ''}
                onChange={e => setField('content', e.target.value)}
                placeholder="Enter page content here…" />
            </div>
          </div>

          <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/5">
            <p className="text-xs text-white/30">
              This content is stored locally and can be used by page components to render dynamic content.
            </p>
            <div className="flex items-center gap-3 shrink-0">
              {saved && <span className="text-xs text-green-400">✓ Saved</span>}
              <button onClick={save} className="flex items-center gap-2 bg-[#c9a84c] text-black font-medium px-5 py-2.5 rounded-full hover:bg-[#d4b860] transition-colors text-sm">
                <Save className="w-4 h-4" /> Save
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Info box */}
      <div className="bg-[#110703] border border-white/5 rounded-2xl p-6">
        <h3 className="font-semibold mb-3 text-sm">All Managed Pages</h3>
        <div className="grid md:grid-cols-3 gap-3">
          {PAGE_KEYS.map(p => (
            <div key={p.key} className="bg-white/[0.03] border border-white/5 rounded-xl px-4 py-3">
              <p className="text-sm font-medium mb-0.5">{p.label}</p>
              <p className="text-xs text-white/30 font-mono">{p.route}</p>
              <p className="text-xs text-white/20 mt-1 truncate">{pages[p.key]?.title || 'No title set'}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
