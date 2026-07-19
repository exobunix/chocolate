import React, { useState, useRef } from 'react';
import { Upload, Trash2, Copy, Check, Image as ImageIcon, Link as LinkIcon, Plus } from 'lucide-react';

const STORAGE_KEY = 'velora_media_library';

interface MediaItem { id: string; name: string; url: string; type: 'url' | 'upload'; size?: string; }

function getMedia(): MediaItem[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
}
function saveMedia(items: MediaItem[]) { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); }

export default function MediaAdmin() {
  const [items, setItems] = useState<MediaItem[]>(getMedia);
  const [urlInput, setUrlInput] = useState('');
  const [urlName, setUrlName] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const addUrl = () => {
    if (!urlInput.trim()) return;
    const item: MediaItem = { id: Date.now().toString(), name: urlName || urlInput.split('/').pop() || 'image', url: urlInput, type: 'url' };
    const next = [...items, item];
    setItems(next);
    saveMedia(next);
    setUrlInput('');
    setUrlName('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = ev => {
        const url = ev.target?.result as string;
        const size = (file.size / 1024).toFixed(1) + ' KB';
        const item: MediaItem = { id: Date.now().toString() + Math.random(), name: file.name, url, type: 'upload', size };
        setItems(prev => {
          const next = [...prev, item];
          saveMedia(next);
          return next;
        });
      };
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  };

  const copyUrl = (item: MediaItem) => {
    navigator.clipboard.writeText(item.url);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const remove = (id: string) => {
    const next = items.filter(i => i.id !== id);
    setItems(next);
    saveMedia(next);
    setDeleteId(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Media Library</h1>
        <p className="text-white/40 text-sm">{items.length} images · Upload files or add image URLs to use across the site</p>
      </div>

      {/* Upload zone */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* File upload */}
        <div
          onClick={() => fileRef.current?.click()}
          className="bg-[#110703] border-2 border-dashed border-white/10 hover:border-[#c9a84c]/40 rounded-2xl p-8 text-center cursor-pointer transition-colors group"
        >
          <Upload className="w-8 h-8 text-white/20 group-hover:text-[#c9a84c] transition-colors mx-auto mb-3" />
          <p className="text-sm font-medium mb-1 group-hover:text-[#c9a84c] transition-colors">Upload Images</p>
          <p className="text-xs text-white/30">Click to select · PNG, JPG, WebP</p>
          <input ref={fileRef} type="file" accept="image/*" multiple hidden onChange={handleFileUpload} />
        </div>

        {/* URL add */}
        <div className="bg-[#110703] border border-white/5 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <LinkIcon className="w-4 h-4 text-[#c9a84c]" />
            <h3 className="font-semibold text-sm">Add Image by URL</h3>
          </div>
          <div className="space-y-3">
            <input value={urlName} onChange={e => setUrlName(e.target.value)} className="admin-input !text-xs" placeholder="Image name (optional)" />
            <div className="flex gap-2">
              <input value={urlInput} onChange={e => setUrlInput(e.target.value)} className="admin-input flex-1 !text-xs" placeholder="https://example.com/image.jpg"
                onKeyDown={e => e.key === 'Enter' && addUrl()} />
              <button onClick={addUrl} disabled={!urlInput.trim()}
                className="px-4 py-2 bg-[#c9a84c] text-black rounded-xl text-sm font-medium hover:bg-[#d4b860] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      {items.length === 0 ? (
        <div className="bg-[#110703] border border-white/5 rounded-2xl py-20 text-center">
          <ImageIcon className="w-12 h-12 text-white/10 mx-auto mb-4" />
          <p className="text-white/30 text-sm">No images yet. Upload files or add URLs above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map(item => (
            <div key={item.id} className="bg-[#110703] border border-white/5 rounded-2xl overflow-hidden group hover:border-[#c9a84c]/20 transition-colors">
              <div className="aspect-square bg-white/[0.03] relative overflow-hidden">
                <img src={item.url} alt={item.name}
                  className="w-full h-full object-cover"
                  onError={e => { (e.currentTarget.parentElement as HTMLElement).classList.add('flex', 'items-center', 'justify-center'); e.currentTarget.style.display = 'none'; }} />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button onClick={() => copyUrl(item)}
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#c9a84c] hover:text-black flex items-center justify-center transition-all">
                    {copiedId === item.id ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <button onClick={() => setDeleteId(item.id)}
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-red-500 flex items-center justify-center transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                {item.type === 'url' && (
                  <div className="absolute top-2 left-2">
                    <span className="text-[9px] bg-black/60 px-2 py-0.5 rounded-full text-white/50 uppercase tracking-wider">URL</span>
                  </div>
                )}
              </div>
              <div className="p-3">
                <p className="text-xs font-medium truncate text-white/80">{item.name}</p>
                {item.size && <p className="text-[10px] text-white/30 mt-0.5">{item.size}</p>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete confirm */}
      {deleteId && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setDeleteId(null)}>
          <div className="bg-[#0d0502] border border-white/10 rounded-2xl p-6 w-full max-w-sm" onClick={e => e.stopPropagation()}>
            <h3 className="font-semibold mb-2">Remove Image</h3>
            <p className="text-white/60 text-sm mb-5">Remove <strong className="text-white">{items.find(i => i.id === deleteId)?.name}</strong> from the media library?</p>
            <div className="flex gap-3">
              <button onClick={() => remove(deleteId)} className="flex-1 bg-red-500 text-white font-medium py-3 rounded-full text-sm hover:bg-red-600">Remove</button>
              <button onClick={() => setDeleteId(null)} className="flex-1 border border-white/10 text-white/60 py-3 rounded-full text-sm hover:border-white/30">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
