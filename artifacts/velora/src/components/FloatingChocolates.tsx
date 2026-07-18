import React from 'react';
import { motion } from 'framer-motion';

// Generate some CSS-based chocolate square variants
const chocolateVariants = [
  // Dark square
  "bg-gradient-to-br from-[#361a0d] to-[#1a0a05] shadow-[inset_1px_1px_2px_rgba(255,255,255,0.05),_-2px_-2px_5px_rgba(0,0,0,0.4)] rounded-sm",
  // Gold wrapped
  "bg-gradient-to-br from-[#c9a84c] via-[#b8860b] to-[#8a6508] shadow-[inset_2px_2px_5px_rgba(255,255,255,0.3)] rounded-sm",
  // Truffle (round)
  "bg-gradient-to-br from-[#2a1309] to-[#0a0402] shadow-[inset_-4px_-4px_10px_rgba(0,0,0,0.8),_inset_2px_2px_5px_rgba(255,255,255,0.1)] rounded-full",
  // Milk chocolate
  "bg-gradient-to-br from-[#6b3e20] to-[#3d200e] shadow-[inset_1px_1px_2px_rgba(255,255,255,0.1),_-2px_-2px_5px_rgba(0,0,0,0.4)] rounded-sm"
];

const frames = Array.from({ length: 8 }).map((_, i) => ({
  id: i,
  size: Math.random() * 40 + 50, // 50 to 90px
  xStart: Math.random() * 100, // 0 to 100vw
  xEnd: Math.random() * 100, // drift to new x
  duration: Math.random() * 10 + 10, // 10s to 20s
  delay: Math.random() * 10,
  rotation: Math.random() * 360,
  variant: chocolateVariants[i % chocolateVariants.length]
}));

export default function FloatingChocolates() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {frames.map((frame) => (
        <motion.div
          key={frame.id}
          className="absolute top-[-100px]"
          style={{
            left: `${frame.xStart}%`,
            width: frame.size,
            height: frame.size,
          }}
          animate={{
            y: ['0vh', '120vh'],
            x: [`${frame.xStart}%`, `${frame.xEnd}%`],
            rotate: [frame.rotation, frame.rotation + (Math.random() > 0.5 ? 360 : -360)],
          }}
          transition={{
            duration: frame.duration,
            repeat: Infinity,
            delay: frame.delay,
            ease: "linear",
          }}
        >
          <div className={`w-full h-full ${frame.variant} opacity-70 flex items-center justify-center backdrop-blur-sm`}>
            {frame.variant.includes('rounded-sm') && (
              <div className="w-[80%] h-[80%] border border-black/20 rounded-[2px] opacity-50" />
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
