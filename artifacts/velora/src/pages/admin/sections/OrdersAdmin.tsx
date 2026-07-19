import React, { useState, useEffect } from 'react';
import { ShoppingBag, Clock, CheckCircle, XCircle, Trash2, User, Mail, Phone, MapPin, Loader2 } from 'lucide-react';

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

export default function OrdersAdmin() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    fetch(`${API_BASE}/api/orders`)
      .then(res => res.ok ? res.json() : [])
      .then(data => {
        setOrders(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch orders:', err);
        setLoading(false);
      });
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`${API_BASE}/api/orders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        setOrders(prev => prev.map(o => o.id === id ? { ...o, status: status as any } : o));
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const deleteOrder = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this order?')) return;
    try {
      const res = await fetch(`${API_BASE}/api/orders/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setOrders(prev => prev.filter(o => o.id !== id));
      }
    } catch (err) {
      console.error('Failed to delete order:', err);
    }
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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-[#c9a84c] animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Orders</h1>
        <p className="text-white/40 text-sm">{orders.length} total orders placed</p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-[#110703] border border-white/5 rounded-2xl py-20 text-center">
          <ShoppingBag className="w-12 h-12 text-white/10 mx-auto mb-4" />
          <p className="text-white/30 text-sm">No orders placed yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="bg-[#110703] border border-white/5 rounded-2xl p-6 space-y-6 hover:border-[#c9a84c]/20 transition-colors">
              {/* Top row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
                <div>
                  <span className="text-xs text-white/30">Order ID: #{order.id.slice(-6).toUpperCase()}</span>
                  <p className="text-xs text-white/40 mt-1">{new Date(order.createdAt).toLocaleString('en-IN')}</p>
                </div>
                <div className="flex items-center gap-3">
                  <select
                    value={order.status}
                    onChange={e => updateStatus(order.id, e.target.value)}
                    className="bg-white/5 border border-white/10 text-white text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-[#c9a84c]/40 transition-colors"
                  >
                    <option value="pending" className="bg-[#0a0402]">Pending</option>
                    <option value="processing" className="bg-[#0a0402]">Processing</option>
                    <option value="completed" className="bg-[#0a0402]">Completed</option>
                    <option value="cancelled" className="bg-[#0a0402]">Cancelled</option>
                  </select>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase tracking-widest font-medium ${getStatusBadge(order.status)}`}>
                    {order.status}
                  </span>
                  <button
                    onClick={() => deleteOrder(order.id)}
                    className="p-1.5 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-xl border border-red-500/20 transition-all shrink-0"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Info grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Customer Details */}
                <div className="space-y-3">
                  <h4 className="text-[10px] text-white/20 uppercase tracking-[0.2em] font-semibold">Customer Details</h4>
                  <div className="space-y-2 text-sm text-white/70">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-white/30 shrink-0" />
                      <span>{order.customerName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-white/30 shrink-0" />
                      <a href={`mailto:${order.customerEmail}`} className="hover:text-[#c9a84c] transition-colors">{order.customerEmail}</a>
                    </div>
                    {order.customerPhone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-white/30 shrink-0" />
                        <span>{order.customerPhone}</span>
                      </div>
                    )}
                    <div className="flex items-start gap-2 pt-1 border-t border-white/5">
                      <MapPin className="w-4 h-4 text-white/30 shrink-0 mt-0.5" />
                      <span className="text-xs text-white/50">{order.shippingAddress}</span>
                    </div>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-3">
                  <h4 className="text-[10px] text-white/20 uppercase tracking-[0.2em] font-semibold">Items Ordered</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-sm text-white/70 bg-white/[0.02] border border-white/5 px-4 py-2.5 rounded-xl">
                        <div>
                          <p className="font-medium text-xs">{item.name}</p>
                          <p className="text-[10px] text-white/30 mt-0.5">₹{item.price} × {item.quantity}</p>
                        </div>
                        <span className="text-white text-xs font-semibold">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-white/5">
                    <span className="text-xs text-white/40">Total Paid</span>
                    <span className="text-base text-[#c9a84c] font-bold">₹{order.total}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
