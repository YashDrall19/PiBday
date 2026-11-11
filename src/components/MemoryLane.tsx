import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { config } from '@/config';
import ScrollReveal from '@/components/ScrollReveal';
import FloatingParticles from '@/components/FloatingParticles';

export default function MemoryLane() {
  const [active, setActive] = useState<number | null>(null);
  const photos = config.memories.photos;

  const close = useCallback(() => setActive(null), []);
  const next = useCallback(() => setActive((i) => (i === null ? i : (i + 1) % photos.length)), [photos.length]);
  const prev = useCallback(() => setActive((i) => (i === null ? i : (i - 1 + photos.length) % photos.length)), [photos.length]);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [active, close, next, prev]);

  return (
    <section className="relative overflow-hidden py-28">
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, #f3ecff 0%, #fff0e6 100%)' }}
      />
      <div className="absolute inset-0 grain" />
      <FloatingParticles variant="mixed" count={12} />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <ScrollReveal className="text-center">
          <p className="mb-2 text-sm uppercase tracking-[0.3em] text-ink/50">📸 memories 📸</p>
          <h2 className="font-script text-5xl leading-[1.3] py-2 text-gradient sm:text-6xl">{config.memories.heading}</h2>
          <p className="mx-auto mt-4 max-w-md text-ink/60">
            A little gallery of moments.
          </p>
        </ScrollReveal>

        <div className="mt-16 columns-1 gap-6 sm:columns-2 lg:columns-3">
          {photos.map((p, i) => {
            const isVideo = 'media' in p && p.media === 'video';
            return (
              <ScrollReveal key={i} delay={(i % 3) * 0.1} className="mb-6 break-inside-avoid">
                <motion.button
                  onClick={() => setActive(i)}
                  whileHover={{ y: -8, rotate: 0, scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 16 }}
                  className="group relative block w-full cursor-pointer rounded-[10px] bg-white p-3 pb-14 text-left shadow-soft hover:shadow-glow"
                  style={{ transform: `rotate(${p.rotate}deg)` }}
                  aria-label={`Open ${isVideo ? 'video' : 'photo'}: ${p.caption}`}
                >
                  <div className="relative overflow-hidden rounded-sm">
                    {isVideo ? (
                      <video
                        src={p.src}
                        muted
                        autoPlay
                        loop
                        playsInline
                        preload="metadata"
                        aria-label={p.caption}
                        className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <img
                        src={p.src}
                        alt={p.caption}
                        loading="lazy"
                        className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="absolute right-2 top-2 rounded-full bg-white/80 px-2 py-1 text-[10px] font-medium text-ink opacity-0 transition-opacity group-hover:opacity-100">
                      tap to expand
                    </div>
                  </div>
                  <p className="absolute bottom-3 left-0 right-0 text-center font-dancing text-xl text-ink">
                    {p.caption}
                  </p>
                </motion.button>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/82 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <button
              className="absolute right-4 top-4 z-10 rounded-full bg-white/20 p-2 text-white hover:bg-white/40"
              onClick={close}
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>
            <button
              className="absolute left-3 z-10 rounded-full bg-white/20 p-2 text-white hover:bg-white/40 sm:left-6"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              className="absolute right-3 z-10 rounded-full bg-white/20 p-2 text-white hover:bg-white/40 sm:right-6"
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Next"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            <motion.figure
              key={active}
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 22 }}
              className="max-h-[88vh] max-w-3xl overflow-hidden rounded-2xl bg-cream p-3 pb-12 shadow-glow will-change-transform"
              onClick={(e) => e.stopPropagation()}
            >
              {'media' in photos[active] && photos[active].media === 'video' ? (
                <video
                  src={photos[active].src}
                  controls
                  autoPlay
                  playsInline
                  className="max-h-[72vh] w-full rounded-lg object-contain"
                />
              ) : (
                <img
                  src={photos[active].src}
                  alt={photos[active].caption}
                  className="max-h-[72vh] w-full rounded-lg object-contain"
                />
              )}
              <figcaption className="mt-3 text-center font-dancing text-2xl text-ink">
                {photos[active].caption}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
