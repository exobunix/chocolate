import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import heroImage from '@assets/Image-396_1784381276324.jpg';
import FloatingChocolates from './FloatingChocolates';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse tracking for 3D effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Transform values for rotateX and rotateY based on mouse position
  // We'll map the pixel values (-window.innerWidth/2 to window.innerWidth/2) 
  // to degrees (-15 to 15)
  const rotateX = useTransform(mouseY, [-500, 500], [15, -15]);
  const rotateY = useTransform(mouseX, [-500, 500], [-15, 15]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate from center of screen
      const x = e.clientX - window.innerWidth / 2;
      const y = e.clientY - window.innerHeight / 2;
      
      // Update motion values
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[100dvh] flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Background with slight overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-30 mix-blend-luminosity"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/40 via-background/80 to-background" />

      {/* Floating Chocolate Frames */}
      <FloatingChocolates />

      <div className="container relative z-10 mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
        
        {/* Text Content */}
        <div className="flex-1 text-center lg:text-left mt-12 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="inline-block mb-6 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium tracking-wide uppercase"
          >
            The Art of Chocolate
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif text-foreground leading-[1.1] tracking-tight mb-6"
          >
            Made To <br/>
            <span className="text-primary italic">Melt</span> Your Heart.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-lg md:text-xl text-foreground/70 max-w-xl mx-auto lg:mx-0 mb-10 font-light leading-relaxed"
          >
            Velora chocolates are handcrafted with the world's finest cacao, crafted in small batches for unmatched richness.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start"
          >
            <button className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium tracking-wide flex items-center gap-2 hover:bg-primary/90 transition-all hover:scale-105" data-testid="button-hero-explore">
              Explore Collection
              <span className="text-xl">→</span>
            </button>
            
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-card flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full bg-primary/20" />
                  </div>
                ))}
              </div>
              <div className="text-xs text-left">
                <div className="flex text-primary">★★★★★</div>
                <div className="text-foreground/60">Loved by 10k+</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 3D Interactive Chocolate Element */}
        <div className="flex-1 w-full max-w-lg lg:max-w-none perspective-[1000px] h-[400px] md:h-[600px] flex items-center justify-center relative">
          <motion.div
            style={{ 
              rotateX, 
              rotateY,
              transformStyle: "preserve-3d"
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
            className="w-[280px] h-[380px] md:w-[360px] md:h-[480px] relative cursor-pointer"
          >
            {/* The Main Chocolate Bar representation using CSS for a sleek look */}
            <div 
              className="absolute inset-0 bg-gradient-to-br from-[#2a1309] to-[#120703] rounded-sm shadow-2xl overflow-hidden"
              style={{
                boxShadow: "0 30px 60px -12px rgba(0,0,0,0.8), inset 0 2px 5px rgba(255,255,255,0.1)",
                transform: "translateZ(20px)"
              }}
            >
              {/* Chocolate Grid pattern */}
              <div className="absolute inset-4 grid grid-cols-3 grid-rows-4 gap-2">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div 
                    key={i} 
                    className="bg-gradient-to-br from-[#361a0d] to-[#1a0a05] rounded-[4px] relative"
                    style={{
                      boxShadow: "inset 1px 1px 2px rgba(255,255,255,0.05), -2px -2px 5px rgba(0,0,0,0.4)"
                    }}
                  >
                    {/* Inner bevel */}
                    <div className="absolute inset-[6px] border border-[#4a2614] rounded-[2px] opacity-30 flex items-center justify-center">
                      {i === 4 || i === 7 ? <span className="text-[#c9a84c] text-[10px] opacity-40 font-serif">V</span> : null}
                    </div>
                  </div>
                ))}
              </div>

              {/* Gold foil wrapper effect at bottom */}
              <div 
                className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#c9a84c] via-[#b8860b] to-[#d4a843]"
                style={{
                  clipPath: "polygon(0 30%, 10% 20%, 20% 35%, 30% 15%, 40% 40%, 50% 10%, 60% 35%, 70% 15%, 80% 25%, 90% 10%, 100% 30%, 100% 100%, 0 100%)",
                  boxShadow: "0 -5px 15px rgba(0,0,0,0.5)"
                }}
              />
            </div>

            {/* Glowing aura behind */}
            <div 
              className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full"
              style={{ transform: "translateZ(-50px)" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
