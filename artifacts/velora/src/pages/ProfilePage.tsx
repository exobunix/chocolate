import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, User, Mail, Phone, MapPin, Calendar, Receipt, Search, LogOut, Loader2, Package } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  shippingAddress: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: string;
}

export default function ProfilePage() {
  const [emailInput, setEmailInput] = useState('');
  const [email, setEmail] = useState(() => localStorage.getItem('velora_customer_email') || '');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (email) {
      fetchOrders(email);
    }
  }, [email]);

  const fetchOrders = (targetEmail: string) => {
    setLoading(true);
    fetch(`${API_BASE}/api/orders?email=${encodeURIComponent(targetEmail)}`)
      .then(res => res.ok ? res.json() : [])
      .then(data => {
        setOrders(data);
        setSearched(true);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch profile orders:', err);
        setLoading(false);
      });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    const cleanEmail = emailInput.trim().toLowerCase();
    localStorage.setItem('velora_customer_email', cleanEmail);
    setEmail(cleanEmail);
  };

  const handleSignOut = () => {
    localStorage.removeItem('velora_customer_email');
    setEmail('');
    setOrders([]);
    setSearched(false);
  };

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20';
      case 'processing':
        return 'bg-blue-500/10 text-blue-400 border border-blue-500/20';
      case 'completed':
        return 'bg-green-500/10 text-green-400 border border-green-500/20';
      case 'cancelled':
        return 'bg-red-500/10 text-red-400 border border-red-500/20';
      default:
        return 'bg-white/10 text-white/50';
    }
  };

  // Get profile info from the most recent order
  const latestOrder = orders[0];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 container mx-auto px-6 max-w-4xl">
        <AnimatePresence mode="wait">
          {!email ? (
            <motion.div
              key="auth-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-md mx-auto bg-card border border-border p-8 rounded-2xl shadow-xl mt-10"
            >
              <div className="text-center mb-8">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/20">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <h2 className="font-serif text-2xl mb-2">Track Your Orders</h2>
                <p className="text-sm text-foreground/50">Enter the email address you used at checkout to view your order history and profile.</p>
              </div>

              <form onSubmit={handleSearchSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-foreground/40 mb-1.5 font-medium">Email Address</label>
                  <div className="relative">
                    <input
                      required
                      type="email"
                      value={emailInput}
                      onChange={e => setEmailInput(e.target.value)}
                      className="w-full bg-background border border-border rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-primary/40 transition-colors"
                      placeholder="you@example.com"
                    />
                    <Mail className="absolute left-4 top-3.5 w-4 h-4 text-foreground/30" />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-black font-semibold py-3 rounded-full flex items-center justify-center gap-2 hover:bg-[#d4b860] transition-colors"
                >
                  <Search className="w-4 h-4" />
                  Access Account
                </button>
              </form>
            </motion.div>
          ) : loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-24"
            >
              <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
              <p className="text-sm text-foreground/40">Fetching your profile details...</p>
            </motion.div>
          ) : (
            <motion.div
              key="profile-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Header / User Card */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20 shrink-0">
                    <User className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-serif text-2xl leading-none">
                      {latestOrder ? latestOrder.customerName : 'Welcome Back'}
                    </h2>
                    <p className="text-sm text-foreground/40 mt-1">{email}</p>
                  </div>
                </div>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-1.5 px-4 py-2 border border-border hover:border-red-400/30 hover:text-red-400 rounded-full text-xs font-medium uppercase tracking-wider transition-colors self-start md:self-auto"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Sign Out
                </button>
              </div>

              {orders.length === 0 ? (
                <div className="bg-card border border-border rounded-2xl py-20 text-center">
                  <ShoppingBag className="w-12 h-12 text-foreground/10 mx-auto mb-4" />
                  <p className="text-foreground/40 text-sm">No orders found for this email address.</p>
                  <p className="text-xs text-foreground/20 mt-1">Try checking another email address.</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-3 gap-8 items-start">
                  {/* Profile Details Sidebar */}
                  <div className="md:col-span-1 bg-card border border-border p-6 rounded-2xl space-y-6">
                    <h3 className="font-serif text-lg border-b border-border pb-3">My Profile</h3>
                    <div className="space-y-4 text-sm text-foreground/75">
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase tracking-wider text-foreground/30 font-medium block">Default Name</span>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-foreground/30" />
                          <span>{latestOrder?.customerName}</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase tracking-wider text-foreground/30 font-medium block">Email Address</span>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-foreground/30" />
                          <span>{latestOrder?.customerEmail}</span>
                        </div>
                      </div>
                      {latestOrder?.customerPhone && (
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase tracking-wider text-foreground/30 font-medium block">Phone Number</span>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-foreground/30" />
                            <span>{latestOrder.customerPhone}</span>
                          </div>
                        </div>
                      )}
                      <div className="space-y-1 pt-3 border-t border-border">
                        <span className="text-[10px] uppercase tracking-wider text-foreground/30 font-medium block">Last Shipping Address</span>
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-foreground/30 mt-0.5 shrink-0" />
                          <span className="text-xs text-foreground/50">{latestOrder?.shippingAddress}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Orders History List */}
                  <div className="md:col-span-2 space-y-4">
                    <h3 className="font-serif text-xl mb-4 flex items-center gap-2">
                      <Package className="w-5 h-5 text-primary" />
                      Order History ({orders.length})
                    </h3>
                    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
                      {orders.map(order => (
                        <div key={order.id} className="bg-card border border-border p-5 rounded-2xl space-y-4 hover:border-primary/20 transition-all duration-300">
                          <div className="flex justify-between items-start gap-2 border-b border-border pb-3">
                            <div>
                              <span className="text-[10px] text-foreground/30 font-semibold uppercase tracking-wider block">Order ID</span>
                              <span className="text-xs font-mono text-foreground/60">#{order.id.slice(-8).toUpperCase()}</span>
                            </div>
                            <div className="text-right">
                              <span className="text-[10px] text-foreground/30 font-semibold uppercase tracking-wider block">Status</span>
                              <span className={`px-2 py-0.5 rounded-full text-[9px] uppercase tracking-widest font-medium ${getStatusBadge(order.status)}`}>
                                {order.status}
                              </span>
                            </div>
                          </div>

                          <div className="space-y-2">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="flex justify-between items-center text-xs text-foreground/70 py-1">
                                <span>{item.name} <span className="text-foreground/30 ml-1">×{item.quantity}</span></span>
                                <span className="font-medium text-foreground/90">₹{item.price * item.quantity}</span>
                              </div>
                            ))}
                          </div>

                          <div className="flex justify-between items-center pt-3 border-t border-border text-xs">
                            <div className="flex items-center gap-1.5 text-foreground/40">
                              <Calendar className="w-3.5 h-3.5" />
                              <span>{new Date(order.createdAt).toLocaleDateString('en-IN', { dateStyle: 'medium' })}</span>
                            </div>
                            <div className="text-right flex items-center gap-2">
                              <span className="text-foreground/40 text-[10px] uppercase">Paid</span>
                              <span className="text-sm font-bold text-primary">₹{order.total}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
