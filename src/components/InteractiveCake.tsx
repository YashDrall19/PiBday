import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { config } from '@/config';
import { bigConfetti } from '@/utils/confetti';
import ScrollReveal from '@/components/ScrollReveal';
import FloatingParticles from '@/components/FloatingParticles';

export default function InteractiveCake() {
  const count = config.cake.candleCount;
  const [lit, setLit] = useState<boolean[]>(Array(count).fill(true));
  const allOut = lit.every((v) => !v);

  const blow = (i: number) => {
    setLit((prev) => {
      const next = [...prev];
      next[i] = false;
      if (next.every((v) => !v)) {
        setTimeout(bigConfetti, 250);
      }
      return next;
    });
  };

  const relight = () => setLit(Array(count).fill(true));

  const candleX = Array.from({ length: count }, (_, i) =>
    count === 1 ? 150 : 60 + i * (180 / (count - 1))
  );

  return (
    <section className="relative overflow-hidden py-28">
      <div
        className="absolute inset-0 animate-gradientShift"
        style={{
          background: 'linear-gradient(160deg, #fff0e6 0%, #ffe4ef 50%, #f3ecff 100%)',
          backgroundSize: '300% 300%',
        }}
      />
      <div className="absolute inset-0 grain" />
      <FloatingParticles variant="balloons" count={10} />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <ScrollReveal>
          <p className="mb-2 text-sm uppercase tracking-[0.3em] text-ink/50">🎂 make a wish 🎂</p>
          <h2 className="font-script text-5xl leading-[1.3] py-2 text-gradient sm:text-6xl">{config.cake.heading}</h2>
          <p className="mt-4 text-ink/70">{config.cake.hint}</p>
        </ScrollReveal>

        {/* Cake */}
        <ScrollReveal delay={0.2} className="mt-12">
          <div className="relative mx-auto w-[300px] sm:w-[360px]">
            <div className="absolute -inset-8 rounded-full bg-champagne/30 blur-3xl" />
            <svg viewBox="0 0 300 260" className="relative w-full drop-shadow-[0_30px_40px_rgba(255,143,177,0.35)]">
              <defs>
                <linearGradient id="ic-l1" x1="0" y1="0" x2="0" y2="1">
                  <stop stopColor="#c9b6ff" /><stop offset="1" stopColor="#a9b8ff" />
                </linearGradient>
                <linearGradient id="ic-l2" x1="0" y1="0" x2="0" y2="1">
                  <stop stopColor="#fff6ef" /><stop offset="1" stopColor="#ffd9c2" />
                </linearGradient>
                <linearGradient id="ic-l3" x1="0" y1="0" x2="0" y2="1">
                  <stop stopColor="#ffd6e8" /><stop offset="1" stopColor="#ff8fb1" />
                </linearGradient>
                <radialGradient id="ic-flame" cx="50%" cy="50%" r="50%">
                  <stop stopColor="#fff3d6" /><stop offset="0.5" stopColor="#ffb14e" /><stop offset="1" stopColor="#ff6b9d" />
                </radialGradient>
              </defs>
              <ellipse cx="150" cy="238" rx="125" ry="16" fill="#fff6ef" opacity="0.85" />
              <rect x="40" y="178" width="220" height="55" rx="14" fill="url(#ic-l1)" />
              <path d="M40 188 q20 18 40 0 t40 0 t40 0 t40 0 t40 0 v10 h-220 z" fill="#a9b8ff" opacity="0.5" />
              <rect x="70" y="128" width="160" height="55" rx="12" fill="url(#ic-l2)" />
              <path d="M70 138 q20 16 40 0 t40 0 t40 0 t40 0 v8 h-160 z" fill="#ffd9c2" opacity="0.6" />
              <rect x="100" y="82" width="100" height="48" rx="10" fill="url(#ic-l3)" />
              <path d="M100 90 q16 14 32 0 t32 0 t36 0 v8 h-100 z" fill="#ff8fb1" opacity="0.5" />

              {/* Candles */}
              {candleX.map((x, i) => (
                <g
                  key={i}
                  onClick={() => lit[i] && blow(i)}
                  style={{ cursor: lit[i] ? 'pointer' : 'default' }}
                >
                  <rect
                    x={x - 3}
                    y="44"
                    width="6"
                    height="38"
                    rx="2"
                    fill={i % 2 === 0 ? '#ff8fb1' : '#c9b6ff'}
                  />
                  {lit[i] && (
                    <g className="animate-flame" style={{ transformOrigin: `${x}px 44px` }}>
                      <ellipse cx={x} cy="37" rx="6" ry="11" fill="url(#ic-flame)" />
                      <ellipse cx={x} cy="35" rx="3" ry="6" fill="#fff3d6" />
                    </g>
                  )}
                  {/* invisible hit area */}
                  <rect x={x - 14} y="20" width="28" height="40" fill="transparent" />
                  {/* smoke when out */}
                  {!lit[i] && (
                    <g opacity="0.5">
                      <circle cx={x} cy="34" r="2" fill="#cbb" className="animate-twinkle" />
                      <circle cx={x + 3} cy="28" r="1.5" fill="#cbb" className="animate-twinkle" style={{ animationDelay: '0.3s' }} />
                    </g>
                  )}
                </g>
              ))}
            </svg>
          </div>
        </ScrollReveal>

        {/* Counter */}
        <p className="mt-6 text-ink/60">
          {lit.filter(Boolean).length} of {count} candles still glowing
        </p>

        {/* Reveal message */}
        <AnimatePresence>
          {allOut && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
              className="mt-8"
            >
              <div className="inline-block rounded-2xl glass px-8 py-5 shadow-glow">
                <p className="font-dancing text-3xl leading-snug text-gradient sm:text-4xl">
                  {config.cake.afterMessage}
                </p>
                <button
                  onClick={relight}
                  className="mt-4 text-sm text-ink/60 underline-offset-4 hover:underline"
                >
                  light them again 🔥
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
