import React, { useState } from 'react';
import { Plus, Pencil, Trash2, Eye, EyeOff, X, Check, Search } from 'lucide-react';
import { useSiteConfig, Product } from '@/context/SiteConfigContext';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = ['Bars', 'Pralines', 'Truffles', 'Gifts'];
const TAGS = ['', 'Bestseller', 'New', 'Limited', 'Signature'];

const emptyProduct: Omit<Product, 'id'> = {
  name: '', desc: '', price: 0, category: 'Bars', tag: '', imageUrl: '', objectPosition: '50% 50%', visible: true,
};

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}>
      <motion.div initial={{ scale: 0.92, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, y: 20 }}
        className="bg-[#0d0502] border border-white/10 rounded-2xl w-full max-w-xl max-h-[85vh] overflow-y-auto shadow-2xl"
        onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
          <h3 className="font-semibold">{title}</h3>
          <button onClick={onClose} className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center hover:border-white/30 transition-colors">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </motion.div>
    </motion.div>
  );
}

function ProductForm({ initial, onSave, onCancel }: {
  initial: Omit<Product, 'id'> & { id?: number };
  onSave: (p: Omit<Product, 'id'> & { id?: number }) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState(initial);
  const set = (k: keyof typeof form, v: any) => setForm(f => ({ ...f, [k]: v }));

  return (
    <form onSubmit={e => { e.preventDefault(); onSave(form); }} className="space-y-4">
      <div>
        <label className="block text-xs text-white/40 uppercase tracking-widest mb-1.5">Product Name *</label>
        <input required value={form.name} onChange={e => set('name', e.target.value)}
          className="admin-input" placeholder="e.g. Dark Truffle Box" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-white/40 uppercase tracking-widest mb-1.5">Description</label>
          <input value={form.desc} onChange={e => set('desc', e.target.value)}
            className="admin-input" placeholder="e.g. 12 Pieces" />
        </div>
        <div>
          <label className="block text-xs text-white/40 uppercase tracking-widest mb-1.5 font-medium">Price (₹) *</label>
          <input required type="number" min="0" step="0.01" value={form.price} onChange={e => set('price', parseFloat(e.target.value) || 0)}
            className="admin-input" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-white/40 uppercase tracking-widest mb-1.5">Category</label>
          <select value={form.category} onChange={e => set('category', e.target.value)} className="admin-input">
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs text-white/40 uppercase tracking-widest mb-1.5">Badge Tag</label>
          <select value={form.tag} onChange={e => set('tag', e.target.value)} className="admin-input">
            {TAGS.map(t => <option key={t} value={t}>{t || '— None —'}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className="block text-xs text-white/40 uppercase tracking-widest mb-1.5">Image URL (optional)</label>
        <input value={form.imageUrl} onChange={e => set('imageUrl', e.target.value)}
          className="admin-input" placeholder="https://..." />
        {form.imageUrl && (
          <img src={form.imageUrl} alt="preview" className="mt-2 h-20 w-32 object-cover rounded-lg border border-white/10" onError={e => (e.currentTarget.style.display = 'none')} />
        )}
      </div>
      <div>
        <label className="block text-xs text-white/40 uppercase tracking-widest mb-1.5">Object Position (CSS)</label>
        <input value={form.objectPosition} onChange={e => set('objectPosition', e.target.value)}
          className="admin-input" placeholder="50% 50%" />
      </div>
      <div className="flex items-center gap-3 py-2">
        <button type="button" onClick={() => set('visible', !form.visible)}
          className={`w-11 h-6 rounded-full transition-colors relative ${form.visible ? 'bg-[#c9a84c]' : 'bg-white/10'}`}>
          <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${form.visible ? 'translate-x-5' : 'translate-x-0.5'}`} />
        </button>
        <span className="text-sm text-white/70">{form.visible ? 'Visible on site' : 'Hidden from site'}</span>
      </div>
      <div className="flex gap-3 pt-2">
        <button type="submit" className="flex-1 bg-[#c9a84c] text-black font-medium py-3 rounded-full hover:bg-[#d4b860] transition-colors">
          Save Product
        </button>
        <button type="button" onClick={onCancel} className="px-6 py-3 border border-white/10 rounded-full text-white/60 hover:border-white/30 transition-colors text-sm">
          Cancel
        </button>
      </div>
    </form>
  );
}

export default function ProductsAdmin() {
  const { config, updateConfig } = useSiteConfig();
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState<(Omit<Product, 'id'> & { id?: number }) | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [catFilter, setCatFilter] = useState('All');

  const products = config.products;
  const filtered = products.filter(p =>
    (catFilter === 'All' || p.category === catFilter) &&
    (p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()))
  );

  const setProducts = (next: Product[]) => updateConfig({ products: next });

  const handleSave = (form: Omit<Product, 'id'> & { id?: number }) => {
    if (form.id) {
      setProducts(products.map(p => p.id === form.id ? { ...form, id: form.id } as Product : p));
    } else {
      const newId = Math.max(0, ...products.map(p => p.id)) + 1;
      setProducts([...products, { ...form, id: newId } as Product]);
    }
    setEditing(null);
    setIsAdding(false);
  };

  const handleDelete = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
    setDeleteId(null);
  };

  const toggleVisible = (id: number) => {
    setProducts(products.map(p => p.id === id ? { ...p, visible: !p.visible } : p));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">Products</h1>
          <p className="text-white/40 text-sm">{products.length} total · {products.filter(p => p.visible).length} visible</p>
        </div>
        <button onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 bg-[#c9a84c] text-black font-medium px-5 py-2.5 rounded-full hover:bg-[#d4b860] transition-colors text-sm">
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products…"
            className="admin-input pl-9 !py-2.5" />
        </div>
        <div className="flex gap-2">
          {['All', ...CATEGORIES].map(c => (
            <button key={c} onClick={() => setCatFilter(c)}
              className={`px-3 py-1.5 rounded-full text-xs border transition-all ${catFilter === c ? 'bg-[#c9a84c] text-black border-[#c9a84c]' : 'border-white/10 text-white/50 hover:border-white/30'}`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#110703] border border-white/5 rounded-2xl overflow-hidden">
        <div className="grid grid-cols-[1fr_auto_auto_auto_auto] items-center gap-4 px-5 py-3 border-b border-white/5 text-xs text-white/30 uppercase tracking-widest">
          <span>Product</span><span>Price</span><span>Category</span><span>Visible</span><span>Actions</span>
        </div>
        <div className="divide-y divide-white/[0.04]">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-white/20 text-sm">No products found</div>
          ) : filtered.map(product => (
            <div key={product.id} className="grid grid-cols-[1fr_auto_auto_auto_auto] items-center gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors">
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{product.name}</p>
                <p className="text-xs text-white/30 truncate">{product.desc}</p>
                {product.tag && <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full border border-[#c9a84c]/30 text-[#c9a84c]">{product.tag}</span>}
              </div>
              <span className="text-sm text-[#c9a84c] font-medium whitespace-nowrap">₹{Number(product.price).toFixed(2)}</span>
              <span className="text-xs text-white/50 whitespace-nowrap">{product.category}</span>
              <button onClick={() => toggleVisible(product.id)}
                className={`w-9 h-5 rounded-full transition-colors relative shrink-0 ${product.visible ? 'bg-[#c9a84c]' : 'bg-white/10'}`}>
                <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${product.visible ? 'translate-x-4' : 'translate-x-0.5'}`} />
              </button>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => setEditing(product)} className="p-1.5 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-colors">
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => setDeleteId(product.id)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-white/40 hover:text-red-400 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {(isAdding || editing) && (
          <Modal title={editing ? 'Edit Product' : 'Add New Product'} onClose={() => { setEditing(null); setIsAdding(false); }}>
            <ProductForm
              initial={editing || emptyProduct}
              onSave={handleSave}
              onCancel={() => { setEditing(null); setIsAdding(false); }}
            />
          </Modal>
        )}
        {deleteId !== null && (
          <Modal title="Delete Product" onClose={() => setDeleteId(null)}>
            <p className="text-white/60 mb-6">Are you sure you want to delete <strong className="text-white">{products.find(p => p.id === deleteId)?.name}</strong>? This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => handleDelete(deleteId!)} className="flex-1 bg-red-500 text-white font-medium py-3 rounded-full hover:bg-red-600 transition-colors">Delete</button>
              <button onClick={() => setDeleteId(null)} className="flex-1 border border-white/10 text-white/60 py-3 rounded-full hover:border-white/30 transition-colors text-sm">Cancel</button>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}
