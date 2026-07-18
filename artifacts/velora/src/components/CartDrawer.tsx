import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, total, count } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-[100] w-full max-w-md bg-[#0a0402] border-l border-[#c9a84c]/20 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-6 border-b border-[#c9a84c]/10">
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-5 h-5 text-[#c9a84c]" />
                <h2 className="font-serif text-xl tracking-wide">Your Cart</h2>
                {count > 0 && (
                  <span className="bg-[#c9a84c] text-black text-xs font-bold px-2 py-0.5 rounded-full">{count}</span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:border-[#c9a84c]/40 hover:text-[#c9a84c] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              <AnimatePresence>
                {items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-full text-center py-20"
                  >
                    <ShoppingCart className="w-16 h-16 text-white/10 mb-6" />
                    <p className="font-serif text-2xl text-white/30 mb-2">Your cart is empty</p>
                    <p className="text-sm text-white/20">Add something indulgent</p>
                    <button
                      onClick={closeCart}
                      className="mt-8 px-6 py-2 rounded-full border border-[#c9a84c]/40 text-[#c9a84c] text-sm hover:bg-[#c9a84c]/10 transition-colors"
                    >
                      Explore Collection
                    </button>
                  </motion.div>
                ) : (
                  items.map(item => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0 }}
                      transition={{ duration: 0.25 }}
                      className="flex gap-4 p-4 bg-white/[0.03] border border-white/5 rounded-xl hover:border-[#c9a84c]/20 transition-colors"
                    >
                      {/* Thumbnail */}
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-[#1a0a05] shrink-0 border border-white/10">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-[#2a1309] to-[#0d0502] flex items-center justify-center">
                            <span className="text-[#c9a84c] font-serif text-lg">V</span>
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm mb-0.5 truncate">{item.name}</h4>
                        <p className="text-xs text-white/40 mb-3">{item.desc}</p>
                        <div className="flex items-center justify-between">
                          {/* Qty Controls */}
                          <div className="flex items-center gap-2 bg-white/5 rounded-full px-2 py-1">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-5 h-5 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors text-white/60 hover:text-white"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-5 h-5 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors text-white/60 hover:text-white"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-[#c9a84c]">${(item.price * item.quantity).toFixed(2)}</span>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-white/20 hover:text-red-400 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-t border-[#c9a84c]/10 px-6 py-6 space-y-4"
              >
                {/* Subtotal */}
                <div className="flex items-center justify-between text-sm text-white/50">
                  <span>Subtotal ({count} {count === 1 ? 'item' : 'items'})</span>
                  <span className="text-white font-medium">${total.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-white/50">
                  <span>Shipping</span>
                  <span className="text-green-400 text-xs font-medium">FREE</span>
                </div>
                <div className="flex items-center justify-between font-serif text-lg border-t border-white/5 pt-4">
                  <span>Total</span>
                  <span className="text-[#c9a84c]">${total.toFixed(2)}</span>
                </div>

                <button className="w-full bg-[#c9a84c] text-black font-medium py-4 rounded-full flex items-center justify-center gap-2 hover:bg-[#d4b860] transition-all hover:shadow-[0_0_30px_rgba(201,168,76,0.4)] active:scale-95">
                  Checkout
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button onClick={closeCart} className="w-full text-white/40 text-sm py-2 hover:text-white/60 transition-colors">
                  Continue Shopping
                </button>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
