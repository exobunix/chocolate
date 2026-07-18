import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

import img1 from '@assets/Image-396_1784381276324.jpg';
import img2 from '@assets/Image-455_1784381276324.jpg';
import img3 from '@assets/Image-970_1784381276323.jpg';
import img4 from '@assets/Image-758_1784381276322.jpg';
import img5 from '@assets/Image-817_1784381276323.jpg';

const chocolateImages = [img1, img2, img3, img4, img5];

// Each frame: real image + a chocolate "piece" CSS style
const frameConfigs = [
  { type: 'square', size: 90, borderRadius: '6px' },
  { type: 'rect',   size: 70, borderRadius: '4px' },
  { type: 'round',  size: 80, borderRadius: '50%' },
  { type: 'square', size: 60, borderRadius: '8px' },
  { type: 'rect',   size: 100, borderRadius: '6px' },
  { type: 'round',  size: 65, borderRadius: '50%' },
  { type: 'square', size: 75, borderRadius: '4px' },
  { type: 'rect',   size: 55, borderRadius: '8px' },
  { type: 'round',  size: 85, borderRadius: '50%' },
  { type: 'square', size: 65, borderRadius: '6px' },
];

function seededRand(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

export default function FloatingChocolates() {
  const frames = useMemo(() =>
    frameConfigs.map((cfg, i) => ({
      id: i,
      img: chocolateImages[i % chocolateImages.length],
      size: cfg.size,
      borderRadius: cfg.borderRadius,
      xStart: seededRand(i * 7) * 90 + 2,          // 2% to 92% of viewport width
      xDrift: (seededRand(i * 13) - 0.5) * 8,      // -4% to +4% drift
      duration: seededRand(i * 3) * 10 + 12,        // 12–22s fall duration
      delay: seededRand(i * 5) * 14,                // stagger 0–14s
      rotation: seededRand(i * 11) * 30 - 15,       // -15 to +15 deg start
      rotationDelta: (seededRand(i * 17) - 0.5) * 60, // total rotation during fall
      objectPosition: `${seededRand(i * 19) * 80}% ${seededRand(i * 23) * 80}%`,
    }))
  , []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      {frames.map(frame => (
        <motion.div
          key={frame.id}
          className="absolute top-0"
          style={{
            left: `${frame.xStart}%`,
            width: frame.size,
            height: frame.size,
          }}
          animate={{
            y: ['-120px', '110vh'],
            x: [0, frame.xDrift * (frame.size / 2)],
            rotate: [frame.rotation, frame.rotation + frame.rotationDelta],
            opacity: [0, 0.75, 0.75, 0.75, 0],
          }}
          transition={{
            duration: frame.duration,
            delay: frame.delay,
            repeat: Infinity,
            ease: 'linear',
            times: [0, 0.08, 0.5, 0.9, 1],
          }}
        >
          {/* Gold frame border */}
          <div
            className="w-full h-full overflow-hidden border border-[#c9a84c]/50 shadow-[0_8px_32px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(201,168,76,0.2)]"
            style={{ borderRadius: frame.borderRadius }}
          >
            <img
              src={frame.img}
              alt="Velora chocolate"
              className="w-full h-full object-cover"
              style={{ objectPosition: frame.objectPosition }}
            />
            {/* Inner gloss overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"
              style={{ borderRadius: frame.borderRadius }}
            />
            {/* Dark tint */}
            <div
              className="absolute inset-0 bg-[#0d0502]/30"
              style={{ borderRadius: frame.borderRadius }}
            />
          </div>

          {/* Glow halo */}
          <div
            className="absolute -inset-2 bg-[#c9a84c]/10 blur-xl -z-10"
            style={{ borderRadius: frame.borderRadius }}
          />
        </motion.div>
      ))}
    </div>
  );
}
