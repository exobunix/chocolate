import React, { useState } from 'react';
import { Image as ImageIcon, X, FolderOpen } from 'lucide-react';

const MEDIA_KEY = 'velora_media_library';
interface MediaItem { id: string; name: string; url: string; }

function getMedia(): MediaItem[] {
  try { return JSON.parse(localStorage.getItem(MEDIA_KEY) || '[]'); } catch { return []; }
}

interface Props {
  label: string;
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
  previewClass?: string;
}

export default function ImagePicker({ label, value, onChange, placeholder, previewClass }: Props) {
  const [libOpen, setLibOpen] = useState(false);
  const [media, setMedia] = useState<MediaItem[]>([]);

  const openLib = () => { setMedia(getMedia()); setLibOpen(true); };

  return (
    <div>
      <label className="block text-xs text-white/40 uppercase tracking-widest mb-1.5">{label}</label>
      <div className="flex gap-2">
        <input
          value={value}
          onChange={e => onChange(e.target.value)}
          className="admin-input flex-1"
          placeholder={placeholder ?? 'Paste image URL…'}
        />
        <button
          type="button"
          onClick={openLib}
          title="Pick from Media Library"
          className="px-3 bg-white/5 border border-white/10 rounded-xl text-white/40 hover:text-[#c9a84c] hover:border-[#c9a84c]/30 transition-colors shrink-0 flex items-center gap-1.5 text-xs"
        >
          <FolderOpen className="w-3.5 h-3.5" /> Library
        </button>
        {value && (
          <button type="button" onClick={() => onChange('')}
            className="px-2 text-white/20 hover:text-red-400 transition-colors shrink-0">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Preview */}
      {value && (
        <img
          src={value} alt="preview"
          className={previewClass ?? 'mt-2 h-24 w-40 object-cover rounded-xl border border-white/10'}
          onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
          onLoad={e => { (e.currentTarget as HTMLImageElement).style.display = ''; }}
        />
      )}

      {/* Library modal */}
      {libOpen && (
        <div
          className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setLibOpen(false)}
        >
          <div
            className="bg-[#0d0502] border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl flex flex-col"
            style={{ maxHeight: '72vh' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 shrink-0">
              <div>
                <h3 className="font-semibold text-sm">Media Library</h3>
                <p className="text-xs text-white/30 mt-0.5">Click an image to select it</p>
              </div>
              <button onClick={() => setLibOpen(false)}
                className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center hover:border-white/30 transition-colors">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-4 overflow-y-auto">
              {media.length === 0 ? (
                <div className="py-14 text-center">
                  <ImageIcon className="w-10 h-10 text-white/10 mx-auto mb-3" />
                  <p className="text-white/30 text-sm">No images yet.</p>
                  <p className="text-white/20 text-xs mt-1">Upload images in the Media section first.</p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-3">
                  {media.map(item => (
                    <button
                      key={item.id}
                      onClick={() => { onChange(item.url); setLibOpen(false); }}
                      className="aspect-square rounded-xl overflow-hidden border border-white/10 hover:border-[#c9a84c]/60 transition-all group relative"
                    >
                      <img src={item.url} alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end p-2">
                        <p className="text-[10px] text-transparent group-hover:text-white/80 transition-colors truncate leading-none">{item.name}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
