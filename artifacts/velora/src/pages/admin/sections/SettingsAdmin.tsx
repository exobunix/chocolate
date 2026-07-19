import React, { useState } from 'react';
import { Save, Eye, EyeOff, RefreshCcw, AlertTriangle } from 'lucide-react';
import { useSiteConfig } from '@/context/SiteConfigContext';
import ImagePicker from '../ImagePicker';

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

export default function SettingsAdmin() {
  const { config, updateConfig, resetConfig } = useSiteConfig();
  const [site, setSite] = useState(config.site);
  const [newPass, setNewPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [resetConfirm, setResetConfirm] = useState(false);

  const save = (key: string, data: unknown) => {
    updateConfig(data as any);
    setSaved(s => ({ ...s, [key]: true }));
    setTimeout(() => setSaved(s => ({ ...s, [key]: false })), 2000);
  };

  const handleSaveSite = () => save('site', { site });

  const handleSavePassword = () => {
    if (newPass.length < 6) return;
    const updated = { ...site, adminPassword: newPass };
    setSite(updated);
    save('password', { site: updated });
    setNewPass('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Settings</h1>
        <p className="text-white/40 text-sm">Configure site identity, branding, and admin credentials.</p>
      </div>

      {/* ── Brand Identity ──────────────────────────────────── */}
      <div className="bg-[#110703] border border-white/5 rounded-2xl p-6">
        <h3 className="font-semibold mb-5">Brand Identity</h3>
        <div className="space-y-4">

          {/* Logo Image */}
          <ImagePicker
            label="Logo Image (optional — replaces text when set)"
            value={site.logoImageUrl}
            onChange={url => setSite(s => ({ ...s, logoImageUrl: url }))}
            placeholder="Paste logo image URL or pick from library…"
            previewClass="mt-2 h-14 w-auto max-w-[180px] object-contain rounded-lg border border-white/10 bg-black/30 p-2"
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-white/40 uppercase tracking-widest mb-1.5">Logo Text</label>
              <input className="admin-input" value={site.logoText} onChange={e => setSite(s => ({ ...s, logoText: e.target.value }))} placeholder="VELORA" />
            </div>
            <div>
              <label className="block text-xs text-white/40 uppercase tracking-widest mb-1.5">Tagline (under logo)</label>
              <input className="admin-input" value={site.tagline} onChange={e => setSite(s => ({ ...s, tagline: e.target.value }))} placeholder="The Art of Chocolate" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-white/40 uppercase tracking-widest mb-1.5">Site Name</label>
              <input className="admin-input" value={site.name} onChange={e => setSite(s => ({ ...s, name: e.target.value }))} placeholder="Velora" />
            </div>
            <div>
              <label className="block text-xs text-white/40 uppercase tracking-widest mb-1.5">Copyright Text</label>
              <input className="admin-input" value={site.copyright} onChange={e => setSite(s => ({ ...s, copyright: e.target.value }))} />
            </div>
          </div>
          <div>
            <label className="block text-xs text-white/40 uppercase tracking-widest mb-1.5">Site Description</label>
            <textarea rows={2} className="admin-input resize-none" value={site.description} onChange={e => setSite(s => ({ ...s, description: e.target.value }))} />
          </div>
        </div>

        {/* Live logo preview */}
        <div className="mt-5 p-4 bg-black/40 rounded-xl border border-white/5">
          <p className="text-xs text-white/30 uppercase tracking-widest mb-3">Logo Preview</p>
          <div className="flex items-center gap-3">
            {site.logoImageUrl && (
              <img src={site.logoImageUrl} alt="logo" className="h-9 w-auto object-contain"
                onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
            )}
            <div className="flex flex-col leading-none">
              <span className="text-2xl font-serif tracking-[0.25em] text-[#c9a84c]">{site.logoText || 'VELORA'}</span>
              <span className="text-[9px] tracking-[0.3em] text-[#c9a84c]/50 uppercase">{site.tagline || 'The Art of Chocolate'}</span>
            </div>
          </div>
        </div>

        <SaveBar onSave={handleSaveSite} saved={!!saved.site} />
      </div>

      {/* ── Admin Password ──────────────────────────────────── */}
      <div className="bg-[#110703] border border-white/5 rounded-2xl p-6">
        <h3 className="font-semibold mb-5">Admin Password</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-xs text-white/40 uppercase tracking-widest mb-1.5">Current Password</label>
            <div className="relative">
              <input type={showCurrentPass ? 'text' : 'password'} readOnly value={site.adminPassword}
                className="admin-input pr-10 font-mono" />
              <button type="button" onClick={() => setShowCurrentPass(s => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                {showCurrentPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-xs text-white/40 uppercase tracking-widest mb-1.5">New Password (min 6 chars)</label>
            <div className="relative">
              <input type={showPass ? 'text' : 'password'} value={newPass} onChange={e => setNewPass(e.target.value)}
                className="admin-input pr-10" placeholder="Enter new password…" />
              <button type="button" onClick={() => setShowPass(s => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div className="flex justify-end">
            <button onClick={handleSavePassword} disabled={newPass.length < 6}
              className="flex items-center gap-2 bg-[#c9a84c] text-black font-medium px-5 py-2.5 rounded-full hover:bg-[#d4b860] transition-colors text-sm disabled:opacity-40 disabled:cursor-not-allowed">
              <Save className="w-4 h-4" /> Update Password
            </button>
          </div>
        </div>
      </div>

      {/* ── Danger zone ─────────────────────────────────────── */}
      <div className="bg-[#110703] border border-red-500/15 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-4 h-4 text-red-400" />
          <h3 className="font-semibold text-red-400">Danger Zone</h3>
        </div>
        <p className="text-sm text-white/50 mb-4">
          Reset all site configuration to factory defaults. This will erase all content, product edits, navigation changes, and all other settings.{' '}
          <strong className="text-white">This cannot be undone.</strong>
        </p>
        {!resetConfirm ? (
          <button onClick={() => setResetConfirm(true)}
            className="flex items-center gap-2 text-red-400 border border-red-400/20 px-5 py-2.5 rounded-full hover:bg-red-400/10 transition-colors text-sm">
            <RefreshCcw className="w-4 h-4" /> Reset to Defaults
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <span className="text-sm text-red-400">Are you sure?</span>
            <button onClick={() => { resetConfig(); setResetConfirm(false); setSite(s => ({ ...s })); }}
              className="bg-red-500 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-red-600 transition-colors">
              Yes, Reset Everything
            </button>
            <button onClick={() => setResetConfirm(false)}
              className="border border-white/10 text-white/60 px-5 py-2.5 rounded-full text-sm hover:border-white/30 transition-colors">
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
