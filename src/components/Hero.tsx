import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { config } from '@/config';
import FloatingParticles from '@/components/FloatingParticles';

/** A stylized animated birthday cake (SVG) with glowing candles. */
function HeroCake() {
  return (
    <div className="relative mx-auto w-[260px] sm:w-[320px]">
      <div className="absolute -inset-6 rounded-full bg-champagne/30 blur-3xl" />
      <svg viewBox="0 0 300 280" className="relative w-full drop-shadow-[0_30px_40px_rgba(255,143,177,0.35)]">
        <defs>
          <linearGradient id="layer1" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#ffd6e8" />
            <stop offset="1" stopColor="#ff8fb1" />
          </linearGradient>
          <linearGradient id="layer2" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#fff6ef" />
            <stop offset="1" stopColor="#ffd9c2" />
          </linearGradient>
          <linearGradient id="layer3" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#c9b6ff" />
            <stop offset="1" stopColor="#a9b8ff" />
          </linearGradient>
          <radialGradient id="flame" cx="50%" cy="50%" r="50%">
            <stop stopColor="#fff3d6" />
            <stop offset="0.5" stopColor="#ffb14e" />
            <stop offset="1" stopColor="#ff6b9d" />
          </radialGradient>
        </defs>
        {/* plate */}
        <ellipse cx="150" cy="252" rx="120" ry="16" fill="#fff6ef" opacity="0.8" />
        {/* layer 1 (bottom) */}
        <rect x="40" y="190" width="220" height="55" rx="14" fill="url(#layer3)" />
        <path d="M40 200 q20 18 40 0 t40 0 t40 0 t40 0 t40 0 v10 h-220 z" fill="#a9b8ff" opacity="0.5" />
        {/* layer 2 (middle) */}
        <rect x="70" y="140" width="160" height="55" rx="12" fill="url(#layer2)" />
        <path d="M70 150 q20 16 40 0 t40 0 t40 0 t40 0 v8 h-160 z" fill="#ffd9c2" opacity="0.6" />
        {/* layer 3 (top) */}
        <rect x="100" y="92" width="100" height="50" rx="10" fill="url(#layer1)" />
        <path d="M100 100 q16 14 32 0 t32 0 t36 0 v8 h-100 z" fill="#ff8fb1" opacity="0.5" />
        {/* cherries */}
        <circle cx="120" cy="92" r="6" fill="#ff6b9d" />
        <circle cx="150" cy="88" r="6" fill="#ff6b9d" />
        <circle cx="180" cy="92" r="6" fill="#ff6b9d" />
        {/* single candle */}
        <g key={0}>
          <rect x={147} y="55" width="6" height="38" rx="2" fill="#ff8fb1" />
          {/* flame */}
          <g className="animate-flame" style={{ transformOrigin: '150px 55px' }}>
            <ellipse cx={150} cy="48" rx="6" ry="11" fill="url(#flame)" />
            <ellipse cx={150} cy="46" rx="3" ry="6" fill="#fff3d6" />
          </g>
        </g>
      </svg>
    </div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  // Parallax on scroll + mouse for decorative layers
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const layers = Array.from(el.querySelectorAll<HTMLElement>('[data-parallax]'));
    const onScroll = () => {
      const y = window.scrollY;
      layers.forEach((l) => {
        const speed = parseFloat(l.dataset.parallax || '0');
        l.style.transform = `translate3d(0, ${y * speed}px, 0)`;
      });
    };
    const onMove = (e: MouseEvent) => {
      if (window.matchMedia('(hover: none)').matches) return;
      if (raf) return;
      const mx = e.clientX;
      const my = e.clientY;
      raf = requestAnimationFrame(() => {
        const cx = (mx / window.innerWidth - 0.5) * 2;
        const cy = (my / window.innerHeight - 0.5) * 2;
        const y = window.scrollY;
        layers.forEach((l) => {
          const speed = parseFloat(l.dataset.parallax || '0');
          l.style.transform = `translate3d(${cx * speed * 18}px, ${y * speed + cy * speed * 14}px, 0)`;
        });
        raf = 0;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMove, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden grain">
      {/* Parallax gradient backdrop */}
      <div
        data-parallax="0.15"
        className="absolute inset-0 animate-gradientShift"
        style={{
          background:
            'linear-gradient(160deg, #ffe4ef 0%, #e9e0ff 40%, #dceeff 75%, #fff0e6 100%)',
          backgroundSize: '300% 300%',
        }}
      />

      {/* Floating decorative blobs (parallax) */}
      <div data-parallax="0.25" className="absolute left-[5%] top-[12%] h-40 w-40 rounded-full bg-pink/40 blur-3xl" />
      <div data-parallax="0.18" className="absolute right-[8%] top-[20%] h-52 w-52 rounded-full bg-lavender/40 blur-3xl" />
      <div data-parallax="0.3" className="absolute left-[18%] bottom-[15%] h-48 w-48 rounded-full bg-babyblue/40 blur-3xl" />
      <div data-parallax="0.2" className="absolute right-[20%] bottom-[10%] h-56 w-56 rounded-full bg-peach/40 blur-3xl" />

      {/* Floating emojis / decor */}
      <FloatingParticles variant="mixed" count={22} />

      {/* Scattered cute floating elements */}
      <div className="pointer-events-none absolute inset-0">
        {[
          { e: '🎈', x: '8%', y: '22%', d: 0, s: 'text-5xl' },
          { e: '🌸', x: '85%', y: '30%', d: 0.6, s: 'text-4xl' },
          { e: '🦋', x: '14%', y: '65%', d: 1.2, s: 'text-4xl' },
          { e: '⭐', x: '78%', y: '70%', d: 0.3, s: 'text-3xl' },
          { e: '💖', x: '92%', y: '50%', d: 0.9, s: 'text-3xl' },
          { e: '🎂', x: '4%', y: '45%', d: 0.4, s: 'text-3xl' },
          { e: '🌷', x: '70%', y: '15%', d: 1.5, s: 'text-3xl' },
        ].map((d, i) => (
          <span
            key={i}
            className={`absolute ${d.s} animate-floatY`}
            style={{ left: d.x, top: d.y, animationDelay: `${d.d}s` }}
            aria-hidden
          >
            {d.e}
          </span>
        ))}
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 py-24 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4 inline-flex items-center gap-2 rounded-full glass px-5 py-2 text-sm font-medium text-ink shadow-soft"
        >
          ✨ for {config.name} ✨
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-script text-6xl leading-[1.35] py-3 text-gradient sm:text-7xl md:text-8xl"
        >
          {config.hero.heading}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mx-auto mt-6 max-w-xl text-lg text-ink/80 sm:text-xl"
        >
          {config.hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12"
        >
          <HeroCake />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-12 animate-bounce text-ink/50"
        >
          <span className="text-sm tracking-wide">scroll down, there's more magic ↓</span>
        </motion.div>
      </div>
    </section>
  );
}
