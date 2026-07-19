import React from 'react';
import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { useSiteConfig } from '@/context/SiteConfigContext';

export default function Footer() {
  const { config } = useSiteConfig();
  const { footer, site } = config;
  const [, navigate] = useLocation();

  return (
    <footer className="bg-background relative pt-32 pb-8 border-t border-border overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">

        {/* Massive CTA */}
        <div className="text-center mb-32">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif mb-12 tracking-tight"
          >
            {footer.ctaHeadline.split(' ').slice(0, -1).join(' ')} <br/>
            <span className="italic text-primary">{footer.ctaHeadline.split(' ').slice(-1)[0]}</span>
          </motion.h2>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            onClick={() => navigate('/shop')}
            className="bg-primary text-primary-foreground px-10 py-5 rounded-full text-lg font-medium tracking-wide hover:bg-primary/90 transition-all hover:scale-105 inline-flex items-center gap-3 shadow-[0_0_30px_rgba(201,168,76,0.2)]"
          >
            {footer.ctaButton}
            <span className="text-2xl leading-none">→</span>
          </motion.button>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-3xl font-serif tracking-widest text-primary mb-6 block">
              {site.logoText}
            </Link>
            <p className="text-foreground/50 text-sm max-w-xs">{footer.description}</p>
          </div>

          {footer.columns.map(col => (
            <div key={col.title}>
              <h4 className="font-medium tracking-widest uppercase text-sm mb-6">{col.title}</h4>
              <ul className="space-y-4">
                {col.links.map(link => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-foreground/60 hover:text-primary transition-colors text-sm">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-foreground/40 uppercase tracking-wider">
          <p>{footer.copyright}</p>
          <div className="flex gap-4">
            {footer.bottomLinks.map((l, i) => (
              <React.Fragment key={l}>
                {i > 0 && <span>·</span>}
                <span>{l}</span>
              </React.Fragment>
            ))}
          </div>
        </div>

      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/5 blur-[120px] rounded-[100%] pointer-events-none" />
    </footer>
  );
}
