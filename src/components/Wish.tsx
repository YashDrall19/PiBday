import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { config } from '@/config';
import ScrollReveal from '@/components/ScrollReveal';
import FloatingParticles from '@/components/FloatingParticles';

function Star({ x, y, size, delay }: { x: number; y: number; size: number; delay: number }) {
  return (
    <span
      className="absolute rounded-full bg-white animate-twinkle"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        animationDelay: `${delay}s`,
        boxShadow: '0 0 8px rgba(255,255,255,0.95)',
      }}
    />
  );
}

export default function Wish() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      if (window.matchMedia('(hover: none)').matches) return;
      const r = el.getBoundingClientRect();
      const cx = (e.clientX - r.left) / r.width - 0.5;
      const cy = (e.clientY - r.top) / r.height - 0.5;
      const moon = el.querySelector('[data-moon]') as HTMLElement;
      const clouds = el.querySelectorAll('[data-cloud]') as NodeListOf<HTMLElement>;
      if (moon) moon.style.transform = `translate(${cx * 24}px, ${cy * 24}px)`;
      clouds.forEach((c, i) => {
        const s = (i + 1) * 16;
        c.style.transform = `translate(${cx * s}px, ${cy * s}px)`;
      });
    };
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, []);

  const stars = Array.from({ length: 50 }, (_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 90,
    size: 1.5 + Math.random() * 3,
    delay: Math.random() * 4,
    key: i,
  }));

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-32"
    >
      {/* Soft dusk gradient that blends with the site palette */}
      <div
        className="absolute inset-0 animate-gradientShift"
        style={{
          background:
            'linear-gradient(180deg, #c9b6ff 0%, #a9b8ff 35%, #bfe3ff 70%, #ffd6e8 100%)',
          backgroundSize: '300% 300%',
        }}
      />
      <div className="absolute inset-0 grain" />

      {/* Twinkling stars */}
      <div className="pointer-events-none absolute inset-0">
        {stars.map(({ key, ...rest }) => (
          <Star key={key} {...rest} />
        ))}
      </div>

      {/* Crescent moon — soft champagne, glowing */}
      <div
        data-moon
        className="absolute right-[12%] top-[14%] transition-transform duration-300"
      >
        <div className="relative h-28 w-28 rounded-full bg-gradient-to-br from-champagne to-peach shadow-[0_0_70px_rgba(243,217,160,0.8)]">
          <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-[#b8c6ff]" />
        </div>
      </div>

      {/* Floating soft clouds */}
      <div data-cloud className="absolute left-[8%] top-[30%] opacity-50 transition-transform duration-300">
        <div className="h-12 w-40 rounded-full bg-white/70 blur-md" />
      </div>
      <div data-cloud className="absolute left-[60%] top-[55%] opacity-40 transition-transform duration-300">
        <div className="h-10 w-32 rounded-full bg-white/70 blur-md" />
      </div>
      <div data-cloud className="absolute left-[30%] top-[70%] opacity-40 transition-transform duration-300">
        <div className="h-8 w-28 rounded-full bg-white/60 blur-md" />
      </div>

      {/* Shooting star */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute h-[2px] w-40 rounded-full bg-gradient-to-r from-transparent via-white to-transparent"
          style={{
            top: '18%',
            left: '-10%',
            animation: 'shoot 7s ease-in infinite',
            animationDelay: '2.5s',
            boxShadow: '0 0 10px rgba(255,255,255,0.95)',
          }}
        />
      </div>
      <style>{`@keyframes shoot { 0% { transform: translateX(0) translateY(0) rotate(15deg); opacity: 0; } 8%{opacity:1;} 60% { transform: translateX(120vw) translateY(40vh) rotate(15deg); opacity: 1; } 100% { transform: translateX(140vw) translateY(50vh) rotate(15deg); opacity: 0; } }`}</style>

      {/* Ambient floating hearts */}
      <FloatingParticles variant="sparkles" count={10} />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <ScrollReveal>
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-ink/60">🌙 a wish for you 🌙</p>
          <h2 className="font-script text-5xl leading-[1.3] py-2 text-ink drop-shadow-[0_2px_8px_rgba(255,255,255,0.5)] sm:text-6xl md:text-7xl">{config.wish.heading}</h2>
        </ScrollReveal>

        <div className="mt-10 space-y-6">
          {config.wish.paragraphs.map((p, i) => (
            <ScrollReveal key={i} delay={i * 0.2}>
              <p className="mx-auto max-w-2xl rounded-2xl bg-white/35 p-5 text-lg leading-relaxed text-ink/90 backdrop-blur-sm sm:text-xl">
                {p}
              </p>
            </ScrollReveal>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 120 }}
          className="mt-12 text-4xl"
          aria-hidden
        >
          🌠
        </motion.div>
      </div>
    </section>
  );
}
