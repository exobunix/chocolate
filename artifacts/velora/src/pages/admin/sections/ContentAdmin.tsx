import React, { useState } from 'react';
import { Save, Plus, Trash2, GripVertical, ChevronDown, ChevronUp } from 'lucide-react';
import { useSiteConfig } from '@/context/SiteConfigContext';

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
  const [saved, setSaved] = useState<Record<string, boolean>>({});

  const save = (key: string, data: any) => {
    updateConfig({ [key]: data });
    setSaved(s => ({ ...s, [key]: true }));
    setTimeout(() => setSaved(s => ({ ...s, [key]: false })), 2000);
  };

  const addMarqueeWord = () => setMarquee(w => [...w, '']);
  const removeMarqueeWord = (i: number) => setMarquee(w => w.filter((_, idx) => idx !== i));
  const setMarqueeWord = (i: number, v: string) => setMarquee(w => w.map((word, idx) => idx === i ? v : word));

  const addTestimonial = () => setTestimonials(t => [...t, { quote: '', author: '', role: 'Verified Buyer' }]);
  const removeTestimonial = (i: number) => setTestimonials(t => t.filter((_, idx) => idx !== i));
  const setTestimonial = (i: number, k: string, v: string) =>
    setTestimonials(t => t.map((item, idx) => idx === i ? { ...item, [k]: v } : item));

  const setStep = (i: number, k: string, v: string) =>
    setProcess(p => ({ ...p, steps: p.steps.map((s, idx) => idx === i ? { ...s, [k]: v } : s) }));
  const addIngredient = () => setProcess(p => ({ ...p, ingredients: [...p.ingredients, ''] }));
  const removeIngredient = (i: number) => setProcess(p => ({ ...p, ingredients: p.ingredients.filter((_, idx) => idx !== i) }));
  const setIngredient = (i: number, v: string) =>
    setProcess(p => ({ ...p, ingredients: p.ingredients.map((ing, idx) => idx === i ? v : ing) }));

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold mb-1">Content Editor</h1>
        <p className="text-white/40 text-sm">Edit all visible text content across the site.</p>
      </div>

      {/* Hero */}
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
          <SaveBar onSave={() => save('hero', hero)} saved={!!saved.hero} />
        </div>
      </Section>

      {/* Marquee */}
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

      {/* Testimonials */}
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

      {/* Process Section */}
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
