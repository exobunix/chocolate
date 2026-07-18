import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

// Use the generated images
import hazelnutImage from '@assets/generated_images/hazelnut-praline-box.jpg';
import velvetImage from '@assets/generated_images/velvet-truffles.jpg';
import caramelImage from '@assets/generated_images/salted-caramel-squares.jpg';
import noirImage from '@assets/generated_images/noir-gift-box.jpg';
import bonbonsImage from '@assets/generated_images/cocoa-bonbons.jpg';
import signatureImage from '@assets/generated_images/signature-dark-bar.jpg';

const products = [
  {
    id: 1,
    name: "Hazelnut Praline Box",
    desc: "12 Pieces",
    price: 42.00,
    tag: "Bestseller",
    category: "Pralines",
    image: hazelnutImage
  },
  {
    id: 2,
    name: "Velvet Truffles",
    desc: "16 Pieces",
    price: 36.00,
    tag: "Bestseller",
    category: "Truffles",
    image: velvetImage
  },
  {
    id: 3,
    name: "Salted Caramel Squares",
    desc: "12 Pieces",
    price: 38.00,
    tag: "New",
    category: "Bars", // Treating small squares as bars category for filters
    image: caramelImage
  },
  {
    id: 4,
    name: "Noir Gift Box",
    desc: "24 Pieces",
    price: 68.00,
    tag: "Limited",
    category: "Gifts",
    image: noirImage
  },
  {
    id: 5,
    name: "Cocoa Bonbons",
    desc: "12 Pieces",
    price: 34.00,
    category: "Truffles",
    image: bonbonsImage
  },
  {
    id: 6,
    name: "Signature Dark Bar",
    desc: "70% Single Origin",
    price: 14.00,
    tag: "Signature",
    category: "Bars",
    image: signatureImage
  }
];

const categories = ["All", "Bars", "Pralines", "Truffles", "Gifts"];

export default function Products() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProducts = activeFilter === "All" 
    ? products 
    : products.filter(p => p.category === activeFilter);

  return (
    <section className="py-32 bg-background relative" id="shop">
      <div className="container mx-auto px-6">
        
        <div className="flex flex-col items-center mb-16 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif mb-10"
          >
            Our Most Loved <span className="italic text-primary">Indulgences.</span>
          </motion.h2>

          {/* Filter Tabs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4 md:gap-8"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`text-sm tracking-widest uppercase pb-2 border-b-2 transition-colors ${
                  activeFilter === cat 
                    ? 'border-primary text-primary font-medium' 
                    : 'border-transparent text-foreground/60 hover:text-foreground'
                }`}
                data-testid={`filter-${cat.toLowerCase()}`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Product Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProducts.map((product) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              key={product.id}
              className="group relative bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(201,168,76,0.15)] hover:-translate-y-2"
            >
              {/* Tag */}
              {product.tag && (
                <div className="absolute top-4 left-4 z-10 bg-background/80 backdrop-blur-md text-xs uppercase tracking-widest px-3 py-1 border border-border rounded-full font-medium">
                  {product.tag}
                </div>
              )}

              {/* Image */}
              <div className="aspect-square w-full overflow-hidden relative bg-black/40">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover mix-blend-lighten transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    // Fallback to placeholder if not generated yet
                    e.currentTarget.src = "https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&q=80&w=600";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
              </div>

              {/* Content */}
              <div className="p-6 relative">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="font-serif text-xl mb-1 group-hover:text-primary transition-colors">{product.name}</h3>
                    <p className="text-sm text-foreground/50">{product.desc}</p>
                  </div>
                  <div className="text-lg font-medium">${product.price.toFixed(2)}</div>
                </div>

                <button 
                  className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 transform group-hover:scale-110"
                  data-testid={`add-to-cart-${product.id}`}
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
