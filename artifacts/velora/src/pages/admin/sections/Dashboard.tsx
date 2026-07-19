import React, { useMemo } from 'react';
import { Package, Users, ShoppingBag, TrendingUp, Eye, EyeOff, Edit3 } from 'lucide-react';
import { useSiteConfig } from '@/context/SiteConfigContext';

function getUsers() {
  try { return JSON.parse(localStorage.getItem('velora_users') || '[]'); } catch { return []; }
}

function StatCard({ icon: Icon, label, value, sub, color }: {
  icon: any; label: string; value: string | number; sub: string; color: string;
}) {
  return (
    <div className="bg-[#110703] border border-white/5 rounded-2xl p-6 hover:border-[#c9a84c]/20 transition-colors">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="text-3xl font-bold mb-1">{value}</div>
      <div className="text-sm font-medium mb-0.5">{label}</div>
      <div className="text-xs text-white/30">{sub}</div>
    </div>
  );
}

export default function Dashboard({ setSection }: { setSection: (s: string) => void }) {
  const { config } = useSiteConfig();
  const users = useMemo(() => getUsers(), []);
  const products = config.products;
  const visibleProducts = products.filter(p => p.visible).length;
  const totalValue = products.reduce((s, p) => s + p.price, 0);

  const recentUsers = users.slice(-5).reverse();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
        <p className="text-white/40 text-sm">Welcome back. Here's what's happening with your store.</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Package}     label="Total Products" value={products.length}  sub={`${visibleProducts} visible`}                color="bg-[#c9a84c]/10 text-[#c9a84c]" />
        <StatCard icon={Users}       label="Registered Users" value={users.length}   sub="All time signups"                             color="bg-blue-500/10 text-blue-400" />
        <StatCard icon={ShoppingBag} label="Catalog Value"  value={`$${totalValue}`} sub="Sum of all product prices"                    color="bg-green-500/10 text-green-400" />
        <StatCard icon={TrendingUp}  label="Categories"     value={new Set(products.map(p => p.category)).size} sub="Distinct categories" color="bg-purple-500/10 text-purple-400" />
      </div>

      {/* Quick actions */}
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { label: 'Add a Product',       sub: 'Create a new product listing', action: 'products', icon: Package },
          { label: 'Edit Hero Content',   sub: 'Update homepage headline & CTA', action: 'content',    icon: Edit3 },
          { label: 'Manage Navigation',   sub: 'Edit header & footer links',    action: 'navigation', icon: Edit3 },
        ].map(({ label, sub, action, icon: Icon }) => (
          <button key={label} onClick={() => setSection(action)}
            className="bg-[#110703] border border-white/5 rounded-2xl p-5 text-left hover:border-[#c9a84c]/30 hover:bg-[#1a0a05] transition-all group">
            <Icon className="w-5 h-5 text-[#c9a84c] mb-3" />
            <div className="font-medium text-sm mb-1 group-hover:text-[#c9a84c] transition-colors">{label}</div>
            <div className="text-xs text-white/30">{sub}</div>
          </button>
        ))}
      </div>

      {/* Products status */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-[#110703] border border-white/5 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold">Product Visibility</h3>
            <button onClick={() => setSection('products')} className="text-xs text-[#c9a84c] hover:underline">Manage →</button>
          </div>
          <div className="space-y-3">
            {products.slice(0, 6).map(p => (
              <div key={p.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                <div>
                  <span className="text-sm font-medium">{p.name}</span>
                  <span className="text-xs text-white/30 ml-2">{p.category}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-[#c9a84c] font-medium">${p.price}</span>
                  {p.visible
                    ? <Eye className="w-3.5 h-3.5 text-green-400" />
                    : <EyeOff className="w-3.5 h-3.5 text-white/20" />
                  }
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#110703] border border-white/5 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold">Recent Signups</h3>
            <button onClick={() => setSection('users')} className="text-xs text-[#c9a84c] hover:underline">View all →</button>
          </div>
          {recentUsers.length === 0 ? (
            <div className="text-center py-10 text-white/20 text-sm">No users registered yet</div>
          ) : (
            <div className="space-y-3">
              {recentUsers.map((u: any, i: number) => (
                <div key={i} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
                  <div className="w-8 h-8 rounded-full bg-[#c9a84c]/15 border border-[#c9a84c]/25 flex items-center justify-center shrink-0">
                    <span className="text-[#c9a84c] text-xs font-serif">{u.name?.charAt(0)?.toUpperCase()}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{u.name}</p>
                    <p className="text-xs text-white/30 truncate">{u.email}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Site config preview */}
      <div className="bg-[#110703] border border-white/5 rounded-2xl p-6">
        <h3 className="font-semibold mb-4">Site Identity</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Logo Text',  value: config.site.logoText },
            { label: 'Tagline',    value: config.site.tagline },
            { label: 'Site Name',  value: config.site.name },
            { label: 'Nav Links',  value: `${config.nav.links.length} links` },
          ].map(({ label, value }) => (
            <div key={label} className="bg-white/[0.03] rounded-xl p-4">
              <p className="text-xs text-white/30 uppercase tracking-widest mb-1">{label}</p>
              <p className="text-sm font-medium truncate">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
