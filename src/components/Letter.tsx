import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Heart } from 'lucide-react';
import { config } from '@/config';
import ScrollReveal from '@/components/ScrollReveal';
import FloatingParticles from '@/components/FloatingParticles';

export default function Letter() {
  const [open, setOpen] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (!open) {
      setVisibleLines(0);
      return;
    }
    const timers: number[] = [];
    config.letter.lines.forEach((_, i) => {
      timers.push(window.setTimeout(() => setVisibleLines((v) => Math.max(v, i + 1)), 500 + i * 380));
    });
    return () => timers.forEach(clearTimeout);
  }, [open]);

  return (
    <section className="relative overflow-hidden py-28">
      {/* soft backdrop */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, #dceeff 0%, #fff0e6 50%, #ffe4ef 100%)' }}
      />
      <div className="absolute inset-0 grain" />
      <FloatingParticles variant="hearts" count={12} />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <ScrollReveal>
          <p className="mb-2 text-sm uppercase tracking-[0.3em] text-ink/50">a letter from me</p>
          <h2 className="font-dancing text-4xl leading-snug text-ink sm:text-5xl">{config.letter.heading}</h2>
        </ScrollReveal>

        {/* Envelope */}
        <div className="mt-12 flex flex-col items-center">
          <AnimatePresence mode="wait">
            {!open ? (
              <motion.button
                key="closed"
                onClick={() => setOpen(true)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.04, y: -6 }}
                whileTap={{ scale: 0.97 }}
                className="group relative h-56 w-80 sm:w-96"
                aria-label="Open the letter"
              >
                {/* envelope body */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blush to-pink shadow-soft" />
                <div className="absolute inset-0 rounded-xl border border-white/60" />
                {/* flap (closed, pointing down) */}
                <div
                  className="absolute left-0 right-0 top-0 h-1/2 origin-top bg-gradient-to-b from-rose to-pink"
                  style={{ clipPath: 'polygon(0 0, 50% 100%, 100% 0)' }}
                />
                {/* wax seal */}
                <div className="absolute left-1/2 top-[58%] flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-rose to-lavender text-white shadow-glow animate-pulseGlow">
                  <Heart className="h-7 w-7" />
                </div>
                {/* hint */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm text-ink/60">
                  <Mail className="mr-1 inline h-4 w-4" /> tap to open
                </div>
              </motion.button>
            ) : (
              <motion.div
                key="open"
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full max-w-2xl"
              >
                {/* open envelope flap (flipped up behind the letter) */}
                <div
                  className="absolute left-0 right-0 top-0 z-0 h-12 bg-gradient-to-b from-rose to-pink"
                  style={{ clipPath: 'polygon(0 0, 50% 100%, 100% 0)' }}
                />

                {/* letter paper — slides up smoothly */}
                <motion.div
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="relative z-10 mt-10 rounded-2xl bg-cream p-8 text-left shadow-soft ring-1 ring-rose/20 sm:p-12"
                >
                  {/* decorative corner flourishes */}
                  <div className="pointer-events-none absolute right-5 top-5 h-20 w-20 rounded-full bg-pink/15 blur-2xl" />
                  <div className="pointer-events-none absolute left-5 bottom-5 h-20 w-20 rounded-full bg-lavender/15 blur-2xl" />
                  <div className="pointer-events-none absolute left-6 top-6 text-rose/30">
                    <Heart className="h-4 w-4" />
                  </div>

                  <div className="space-y-1 font-dancing text-xl leading-relaxed text-ink sm:text-2xl">
                    {config.letter.lines.map((line, i) => (
                      <div key={i} className={line === '' ? 'h-3' : 'min-h-[1.6em]'}>
                        <AnimatePresence>
                          {i < visibleLines && (
                            <motion.p
                              initial={{ opacity: 0, filter: 'blur(6px)' }}
                              animate={{ opacity: 1, filter: 'blur(0px)' }}
                              transition={{ duration: 0.6, ease: 'easeOut' }}
                            >
                              {line}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex items-center gap-2 text-rose">
                    <Heart className="h-4 w-4" />
                    <span className="font-dancing text-xl">— with love, always</span>
                  </div>
                </motion.div>

                {/* envelope pocket at the bottom */}
                <div className="relative z-0 -mt-3 h-8 rounded-b-xl bg-gradient-to-br from-blush to-pink opacity-80 shadow-soft" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
