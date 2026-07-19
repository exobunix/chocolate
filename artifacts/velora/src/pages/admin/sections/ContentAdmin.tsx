import React, { useState } from 'react';
import { Save, Plus, Trash2, GripVertical, ChevronDown, ChevronUp } from 'lucide-react';
import { useSiteConfig } from '@/context/SiteConfigContext';
import type { GiftFeature } from '@/context/SiteConfigContext';
import ImagePicker from '../ImagePicker';

const ICON_OPTIONS = [
  { value: 'truck',   label: '🚚 Truck (Delivery)' },
  { value: 'gift',    label: '🎁 Gift' },
  { value: 'map-pin', label: '📍 Map Pin (Tracking)' },
];

function Section({ title, defaultOpen = false, children }: { title: string; defaultOpen?: boolean; children: React.ReactNode }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-[#110703] border border-white/5 rounded-2xl overflow-hidden">
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between px-6 py-4 hover:bg-white/[0.02] transition-colors">
        <span className="font-semibold text-sm">{title}</span>
        {open ? <ChevronUp className="w-4 h-4 text-white/30" /> : <ChevronDown className="w-4 h-4 text-white/30" />}
      </button>
      {open && <div className="px-6 pb-6 border-t border-white/5 pt-5">{children}</div>}
    </div>
  );
}

function SaveBar({ onSave, saved }: { onSave: () => void; saved: boolean }) {
  return (
    <div className="flex items-center justify-end gap-3 pt-4">
      {saved && <span className="text-xs text-green-400">✓ Saved</span>}
      <button onClick={onSave} className="flex items-center gap-2 bg-[#c9a84c] text-black font-medium px-5 py-2.5 rounded-full hover:bg-[#d4b860] transition-colors text-sm">
        <Save className="w-4 h-4" /> Save Changes
      </button>
    </div>
  );
}

function FieldRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs text-white/40 uppercase tracking-widest mb-1.5">{label}</label>
      {children}
    </div>
  );
}

export default function ContentAdmin() {
  const { config, updateConfig } = useSiteConfig();
  const [hero, setHero] = useState(config.hero);
  const [marquee, setMarquee] = useState(config.marquee.words);
  const [testimonials, setTestimonials] = useState(config.testimonials);
  const [process, setProcess] = useState(config.process);
  const [gifts, setGifts] = useState(config.gifts);
  const [collectionsImages, setCollectionsImages] = useState(config.collectionsImages);
  const [saved, setSaved] = useState<Record<string, boolean>>({});

  const save = (key: string, data: unknown) => {
    updateConfig({ [key]: data } as any);
    setSaved(s => ({ ...s, [key]: true }));
    setTimeout(() => setSaved(s => ({ ...s, [key]: false })), 2000);
  };

  // ── Marquee helpers
  const addMarqueeWord    = () => setMarquee(w => [...w, '']);
  const removeMarqueeWord = (i: number) => setMarquee(w => w.filter((_, idx) => idx !== i));
  const setMarqueeWord    = (i: number, v: string) => setMarquee(w => w.map((word, idx) => idx === i ? v : word));

  // ── Testimonial helpers
  const addTestimonial    = () => setTestimonials(t => [...t, { quote: '', author: '', role: 'Verified Buyer' }]);
  const removeTestimonial = (i: number) => setTestimonials(t => t.filter((_, idx) => idx !== i));
  const setTestimonial    = (i: number, k: string, v: string) =>
    setTestimonials(t => t.map((item, idx) => idx === i ? { ...item, [k]: v } : item));

  // ── Process helpers
  const setStep        = (i: number, k: string, v: string) =>
    setProcess(p => ({ ...p, steps: p.steps.map((s, idx) => idx === i ? { ...s, [k]: v } : s) }));
  const addIngredient  = () => setProcess(p => ({ ...p, ingredients: [...p.ingredients, ''] }));
  const removeIngredient = (i: number) => setProcess(p => ({ ...p, ingredients: p.ingredients.filter((_, idx) => idx !== i) }));
  const setIngredient  = (i: number, v: string) =>
    setProcess(p => ({ ...p, ingredients: p.ingredients.map((ing, idx) => idx === i ? v : ing) }));

  // ── Gifts feature helpers
  const setFeature = (i: number, k: keyof GiftFeature, v: string) =>
    setGifts(g => ({ ...g, features: g.features.map((f, idx) => idx === i ? { ...f, [k]: v } : f) }));
  const addFeature    = () => setGifts(g => ({ ...g, features: [...g.features, { iconName: 'gift', title: '', desc: '' }] }));
  const removeFeature = (i: number) => setGifts(g => ({ ...g, features: g.features.filter((_, idx) => idx !== i) }));

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold mb-1">Content Editor</h1>
        <p className="text-white/40 text-sm">Edit all visible text and images across the site.</p>
      </div>

      {/* ── Hero Section ───────────────────────────────────────── */}
      <Section title="Hero Section" defaultOpen>
        <div className="space-y-4">
          <FieldRow label="Badge Text">
            <input className="admin-input" value={hero.badge} onChange={e => setHero(h => ({ ...h, badge: e.target.value }))} />
          </FieldRow>
          <div className="grid grid-cols-2 gap-4">
            <FieldRow label="Headline">
              <input className="admin-input" value={hero.headline} onChange={e => setHero(h => ({ ...h, headline: e.target.value }))} />
            </FieldRow>
            <FieldRow label="Italic Accent Word">
              <input className="admin-input" value={hero.headlineItalic} onChange={e => setHero(h => ({ ...h, headlineItalic: e.target.value }))} />
            </FieldRow>
          </div>
          <FieldRow label="Subheadline">
            <textarea rows={3} className="admin-input resize-none" value={hero.subheadline} onChange={e => setHero(h => ({ ...h, subheadline: e.target.value }))} />
          </FieldRow>
          <div className="grid grid-cols-2 gap-4">
            <FieldRow label="CTA Button Text">
              <input className="admin-input" value={hero.ctaText} onChange={e => setHero(h => ({ ...h, ctaText: e.target.value }))} />
            </FieldRow>
            <FieldRow label="Stats Text">
              <input className="admin-input" value={hero.statsText} onChange={e => setHero(h => ({ ...h, statsText: e.target.value }))} />
            </FieldRow>
          </div>
          <ImagePicker
            label="Hero Background Image"
            value={hero.backgroundImageUrl}
            onChange={url => setHero(h => ({ ...h, backgroundImageUrl: url }))}
            placeholder="Paste URL or pick from Media Library…"
            previewClass="mt-2 h-28 w-full object-cover rounded-xl border border-white/10"
          />
          <SaveBar onSave={() => save('hero', hero)} saved={!!saved.hero} />
        </div>
      </Section>

      {/* ── Gifts Section ─────────────────────────────────────── */}
      <Section title="Gifts Section (Home Page)">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FieldRow label="Badge">
              <input className="admin-input" value={gifts.badge} onChange={e => setGifts(g => ({ ...g, badge: e.target.value }))} />
            </FieldRow>
            <FieldRow label="Headline">
              <input className="admin-input" value={gifts.headline} onChange={e => setGifts(g => ({ ...g, headline: e.target.value }))} />
            </FieldRow>
          </div>
          <FieldRow label="Italic Accent">
            <input className="admin-input" value={gifts.headlineItalic} onChange={e => setGifts(g => ({ ...g, headlineItalic: e.target.value }))} />
          </FieldRow>
          <FieldRow label="Subheadline">
            <textarea rows={2} className="admin-input resize-none" value={gifts.subheadline} onChange={e => setGifts(g => ({ ...g, subheadline: e.target.value }))} />
          </FieldRow>

          <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 space-y-3">
            <p className="text-xs text-white/40 uppercase tracking-widest">Featured Product</p>
            <FieldRow label="Name">
              <input className="admin-input" value={gifts.featured.name} onChange={e => setGifts(g => ({ ...g, featured: { ...g.featured, name: e.target.value } }))} />
            </FieldRow>
            <div className="grid grid-cols-2 gap-3">
              <FieldRow label="Description">
                <input className="admin-input" value={gifts.featured.desc} onChange={e => setGifts(g => ({ ...g, featured: { ...g.featured, desc: e.target.value } }))} />
              </FieldRow>
              <FieldRow label="Price ($)">
                <input type="number" min="0" step="0.01" className="admin-input" value={gifts.featured.price}
                  onChange={e => setGifts(g => ({ ...g, featured: { ...g.featured, price: parseFloat(e.target.value) || 0 } }))} />
              </FieldRow>
            </div>
          </div>

          <div>
            <p className="text-xs text-white/40 uppercase tracking-widest mb-3">Feature Cards</p>
            <div className="space-y-3">
              {gifts.features.map((feat, i) => (
                <div key={i} className="bg-white/[0.03] border border-white/5 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/30">Card {i + 1}</span>
                    {gifts.features.length > 1 && (
                      <button onClick={() => removeFeature(i)} className="p-1 text-white/20 hover:text-red-400 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs text-white/40 uppercase tracking-widest mb-1.5">Icon</label>
                      <select value={feat.iconName} onChange={e => setFeature(i, 'iconName', e.target.value)} className="admin-input">
                        {ICON_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-white/40 uppercase tracking-widest mb-1.5">Title</label>
                      <input className="admin-input" value={feat.title} onChange={e => setFeature(i, 'title', e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-xs text-white/40 uppercase tracking-widest mb-1.5">Description</label>
                      <input className="admin-input" value={feat.desc} onChange={e => setFeature(i, 'desc', e.target.value)} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={addFeature} className="flex items-center gap-2 text-sm text-[#c9a84c] hover:underline mt-3">
              <Plus className="w-4 h-4" /> Add Feature Card
            </button>
          </div>
          <SaveBar onSave={() => save('gifts', gifts)} saved={!!saved.gifts} />
        </div>
      </Section>

      {/* ── Collections Images ────────────────────────────────── */}
      <Section title="Collections Page — Tab Images">
        <div className="space-y-4">
          <p className="text-xs text-white/30 -mt-1">Override the background image for each collection tab. Leave empty to use defaults.</p>
          <ImagePicker
            label="Dark Chocolate Tab Image"
            value={collectionsImages.dark}
            onChange={url => setCollectionsImages(c => ({ ...c, dark: url }))}
          />
          <ImagePicker
            label="Pralines & Truffles Tab Image"
            value={collectionsImages.pralines}
            onChange={url => setCollectionsImages(c => ({ ...c, pralines: url }))}
          />
          <ImagePicker
            label="Gift Collections Tab Image"
            value={collectionsImages.gifts}
            onChange={url => setCollectionsImages(c => ({ ...c, gifts: url }))}
          />
          <SaveBar onSave={() => save('collectionsImages', collectionsImages)} saved={!!saved.collectionsImages} />
        </div>
      </Section>

      {/* ── Marquee ───────────────────────────────────────────── */}
      <Section title="Marquee Banner Words">
        <div className="space-y-3 mb-4">
          {marquee.map((word, i) => (
            <div key={i} className="flex items-center gap-3">
              <GripVertical className="w-4 h-4 text-white/20 shrink-0" />
              <input className="admin-input flex-1" value={word} onChange={e => setMarqueeWord(i, e.target.value)} placeholder="Word or phrase…" />
              <button onClick={() => removeMarqueeWord(i)} className="p-2 text-white/30 hover:text-red-400 transition-colors shrink-0">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <button onClick={addMarqueeWord} className="flex items-center gap-2 text-sm text-[#c9a84c] hover:underline mb-4">
          <Plus className="w-4 h-4" /> Add Word
        </button>
        <SaveBar onSave={() => save('marquee', { words: marquee })} saved={!!saved.marquee} />
      </Section>

      {/* ── Testimonials ──────────────────────────────────────── */}
      <Section title="Testimonials">
        <div className="space-y-6 mb-4">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white/[0.03] border border-white/5 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-white/30 font-medium">Testimonial {i + 1}</span>
                <button onClick={() => removeTestimonial(i)} className="p-1 text-white/20 hover:text-red-400 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <textarea rows={3} className="admin-input resize-none" value={t.quote}
                onChange={e => setTestimonial(i, 'quote', e.target.value)} placeholder="Quote…" />
              <div className="grid grid-cols-2 gap-3">
                <input className="admin-input" value={t.author} onChange={e => setTestimonial(i, 'author', e.target.value)} placeholder="Author name" />
                <input className="admin-input" value={t.role} onChange={e => setTestimonial(i, 'role', e.target.value)} placeholder="e.g. Verified Buyer" />
              </div>
            </div>
          ))}
        </div>
        <button onClick={addTestimonial} className="flex items-center gap-2 text-sm text-[#c9a84c] hover:underline mb-4">
          <Plus className="w-4 h-4" /> Add Testimonial
        </button>
        <SaveBar onSave={() => save('testimonials', testimonials)} saved={!!saved.testimonials} />
      </Section>

      {/* ── Process ───────────────────────────────────────────── */}
      <Section title="Process / Craft Section">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FieldRow label="Section Headline">
              <input className="admin-input" value={process.headline} onChange={e => setProcess(p => ({ ...p, headline: e.target.value }))} />
            </FieldRow>
            <FieldRow label="Italic Accent">
              <input className="admin-input" value={process.headlineItalic} onChange={e => setProcess(p => ({ ...p, headlineItalic: e.target.value }))} />
            </FieldRow>
          </div>
          <FieldRow label="Subheadline">
            <textarea rows={2} className="admin-input resize-none" value={process.subheadline} onChange={e => setProcess(p => ({ ...p, subheadline: e.target.value }))} />
          </FieldRow>

          <div>
            <p className="text-xs text-white/40 uppercase tracking-widest mb-3">Process Steps</p>
            <div className="space-y-3">
              {process.steps.map((step, i) => (
                <div key={i} className="bg-white/[0.03] border border-white/5 rounded-xl p-4">
                  <div className="grid grid-cols-[60px_1fr_2fr] gap-3">
                    <input className="admin-input" value={step.num} onChange={e => setStep(i, 'num', e.target.value)} placeholder="01" />
                    <input className="admin-input" value={step.title} onChange={e => setStep(i, 'title', e.target.value)} placeholder="Step title" />
                    <input className="admin-input" value={step.desc} onChange={e => setStep(i, 'desc', e.target.value)} placeholder="Description" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs text-white/40 uppercase tracking-widest mb-3">Ingredient Tags</p>
            <div className="space-y-2">
              {process.ingredients.map((ing, i) => (
                <div key={i} className="flex items-center gap-3">
                  <input className="admin-input flex-1" value={ing} onChange={e => setIngredient(i, e.target.value)} placeholder="Ingredient…" />
                  <button onClick={() => removeIngredient(i)} className="p-2 text-white/30 hover:text-red-400 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <button onClick={addIngredient} className="flex items-center gap-2 text-sm text-[#c9a84c] hover:underline mt-2">
              <Plus className="w-4 h-4" /> Add Tag
            </button>
          </div>

          <SaveBar onSave={() => save('process', process)} saved={!!saved.process} />
        </div>
      </Section>
    </div>
  );
}
