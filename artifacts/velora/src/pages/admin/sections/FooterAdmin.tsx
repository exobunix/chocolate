import React, { useState } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';
import { useSiteConfig, FooterColumn } from '@/context/SiteConfigContext';

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

export default function FooterAdmin() {
  const { config, updateConfig } = useSiteConfig();
  const [footer, setFooter] = useState(config.footer);
  const [saved, setSaved] = useState(false);

  const save = () => {
    updateConfig({ footer });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const setField = (k: string, v: any) => setFooter(f => ({ ...f, [k]: v }));

  const setColumn = (ci: number, k: keyof FooterColumn, v: any) =>
    setFooter(f => ({ ...f, columns: f.columns.map((col, i) => i === ci ? { ...col, [k]: v } : col) }));

  const addColumn = () =>
    setFooter(f => ({ ...f, columns: [...f.columns, { title: 'New Column', links: [{ label: 'Link', href: '/' }] }] }));

  const removeColumn = (ci: number) =>
    setFooter(f => ({ ...f, columns: f.columns.filter((_, i) => i !== ci) }));

  const addLink = (ci: number) =>
    setFooter(f => ({
      ...f,
      columns: f.columns.map((col, i) => i === ci ? { ...col, links: [...col.links, { label: '', href: '/' }] } : col),
    }));

  const setLink = (ci: number, li: number, k: 'label' | 'href', v: string) =>
    setFooter(f => ({
      ...f,
      columns: f.columns.map((col, ci2) => ci2 !== ci ? col : {
        ...col,
        links: col.links.map((link, li2) => li2 === li ? { ...link, [k]: v } : link),
      }),
    }));

  const removeLink = (ci: number, li: number) =>
    setFooter(f => ({
      ...f,
      columns: f.columns.map((col, ci2) => ci2 !== ci ? col : {
        ...col,
        links: col.links.filter((_, li2) => li2 !== li),
      }),
    }));

  const setBottomLink = (i: number, v: string) =>
    setFooter(f => ({ ...f, bottomLinks: f.bottomLinks.map((l, idx) => idx === i ? v : l) }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Footer</h1>
        <p className="text-white/40 text-sm">Edit all footer content including CTA, links, and copyright.</p>
      </div>

      {/* CTA Section */}
      <div className="bg-[#110703] border border-white/5 rounded-2xl p-6">
        <h3 className="font-semibold mb-5">Footer CTA</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-xs text-white/40 uppercase tracking-widest mb-1.5">CTA Headline</label>
            <input className="admin-input" value={footer.ctaHeadline} onChange={e => setField('ctaHeadline', e.target.value)} />
          </div>
          <div>
            <label className="block text-xs text-white/40 uppercase tracking-widest mb-1.5">CTA Button Text</label>
            <input className="admin-input" value={footer.ctaButton} onChange={e => setField('ctaButton', e.target.value)} />
          </div>
          <div>
            <label className="block text-xs text-white/40 uppercase tracking-widest mb-1.5">Brand Description</label>
            <textarea rows={2} className="admin-input resize-none" value={footer.description} onChange={e => setField('description', e.target.value)} />
          </div>
        </div>
      </div>

      {/* Footer Columns */}
      <div className="bg-[#110703] border border-white/5 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold">Link Columns</h3>
          <button onClick={addColumn} className="flex items-center gap-1.5 text-sm text-[#c9a84c] hover:underline">
            <Plus className="w-3.5 h-3.5" /> Add Column
          </button>
        </div>
        <div className="space-y-6">
          {footer.columns.map((col, ci) => (
            <div key={ci} className="bg-white/[0.03] border border-white/5 rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex-1 mr-4">
                  <label className="block text-xs text-white/40 uppercase tracking-widest mb-1.5">Column Title</label>
                  <input className="admin-input" value={col.title} onChange={e => setColumn(ci, 'title', e.target.value)} placeholder="e.g. Shop" />
                </div>
                <button onClick={() => removeColumn(ci)} className="mt-6 p-2 text-white/20 hover:text-red-400 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2 mb-3">
                {col.links.map((link, li) => (
                  <div key={li} className="grid grid-cols-[1fr_1fr_auto] gap-2 items-center">
                    <input className="admin-input !text-xs !py-2" value={link.label} onChange={e => setLink(ci, li, 'label', e.target.value)} placeholder="Link label" />
                    <input className="admin-input !text-xs !py-2" value={link.href} onChange={e => setLink(ci, li, 'href', e.target.value)} placeholder="/path" />
                    <button onClick={() => removeLink(ci, li)} className="p-1.5 text-white/20 hover:text-red-400 transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
              <button onClick={() => addLink(ci)} className="flex items-center gap-1.5 text-xs text-[#c9a84c] hover:underline">
                <Plus className="w-3 h-3" /> Add Link
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-[#110703] border border-white/5 rounded-2xl p-6">
        <h3 className="font-semibold mb-5">Bottom Bar</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-xs text-white/40 uppercase tracking-widest mb-1.5">Copyright Text</label>
            <input className="admin-input" value={footer.copyright} onChange={e => setField('copyright', e.target.value)} />
          </div>
          <div>
            <label className="block text-xs text-white/40 uppercase tracking-widest mb-1.5">Bottom Labels (separated by · )</label>
            <div className="space-y-2">
              {footer.bottomLinks.map((l, i) => (
                <div key={i} className="flex items-center gap-3">
                  <input className="admin-input flex-1" value={l} onChange={e => setBottomLink(i, e.target.value)} placeholder="Label…" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <SaveBar onSave={save} saved={saved} />
    </div>
  );
}
