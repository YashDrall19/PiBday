import { useRef, useEffect, useState } from 'react';
import {
  Smile,
  Sparkles,
  Heart,
  Star,
  Sun,
  Gift,
  Crown,
  type LucideIcon,
} from 'lucide-react';
import { config } from '@/config';
import FloatingParticles from '@/components/FloatingParticles';

const icons: Record<string, LucideIcon> = {
  Smile,
  Sparkles,
  Heart,
  Star,
  Sun,
  Gift,
  Crown,
};

export default function Reasons() {
  const cards = config.reasons.cards;
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    let raf = 0;
    const update = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const totalScroll = rect.height - vh;
      const scrolled = Math.min(Math.max(-rect.top, 0), totalScroll);
      const p = totalScroll > 0 ? scrolled / totalScroll : 0;

      setProgress(p);

      // Translate the track horizontally: 0 → (trackWidth - viewport)
      const trackWidth = track.scrollWidth;
      const maxShift = Math.max(trackWidth - window.innerWidth, 0);
      track.style.transform = `translate3d(${-p * maxShift}px, 0, 0)`;

      const idx = Math.min(
        Math.round(p * (cards.length - 1)),
        cards.length - 1
      );
      setActiveIndex(idx);
      raf = 0;
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [cards.length]);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: `${cards.length * 80}vh` }}
    >
      {/* Background spans the full tall section */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, #ffe4ef 0%, #f3ecff 100%)' }}
      />
      <div className="absolute inset-0 grain" />
      <FloatingParticles variant="sparkles" count={14} />

      {/* Sticky pinned viewport */}
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
        {/* Heading */}
        <div className="absolute top-[9%] text-center">
          <p className="mb-2 text-sm uppercase tracking-[0.3em] text-ink/50">🌷 reasons 🌷</p>
          <h2 className="font-script text-4xl leading-[1.3] py-2 text-gradient sm:text-5xl">
            {config.reasons.heading}
          </h2>
        </div>

        {/* Horizontal track of cards */}
        <div className="flex w-full items-center">
          <div
            ref={trackRef}
            className="flex gap-8 px-[12vw] will-change-transform"
            style={{ backfaceVisibility: 'hidden' }}
          >
            {cards.map((card, i) => {
              const Icon = icons[card.icon] ?? Heart;
              const isActive = i === activeIndex;
              return (
                <div
                  key={i}
                  className="relative flex h-[340px] w-[80vw] shrink-0 flex-col items-center justify-center gap-6 rounded-3xl glass p-8 text-center shadow-soft transition-all duration-500 sm:h-[380px] sm:w-[440px] sm:p-10"
                  style={{
                    background:
                      'radial-gradient(400px circle at 50% 30%, rgba(255,143,177,0.22), rgba(255,255,255,0.45))',
                    boxShadow: isActive
                      ? '0 0 50px rgba(255,143,177,0.35), 0 0 100px rgba(201,182,255,0.2)'
                      : '0 20px 60px -20px rgba(255,143,177,0.3)',
                    opacity: isActive ? 1 : 0.55,
                    transform: isActive ? 'scale(1)' : 'scale(0.95)',
                  }}
                >
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-rose/80 to-lavender/80 text-white shadow-glow transition-transform duration-500 ${
                      isActive ? 'scale-110' : 'scale-100'
                    }`}
                  >
                    <Icon className="h-8 w-8" />
                  </div>
                  <p className="font-dancing text-2xl leading-snug text-ink sm:text-3xl">
                    {card.text}
                  </p>
                  <span className="absolute right-5 top-5 font-script text-2xl text-rose/40">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {isActive && (
                    <div className="absolute -bottom-3 left-1/2 h-1.5 w-24 -translate-x-1/2 rounded-full bg-gradient-to-r from-rose to-lavender opacity-60" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-[14%] h-1.5 w-48 overflow-hidden rounded-full bg-ink/15">
          <div
            className="h-full rounded-full bg-gradient-to-r from-rose to-lavender transition-[width] duration-150"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        {/* Dots */}
        <div className="absolute bottom-[8%] flex gap-2">
          {cards.map((_, i) => (
            <span
              key={i}
              className={`h-2 rounded-full transition-all duration-500 ${
                i === activeIndex
                  ? 'w-8 bg-gradient-to-r from-rose to-lavender'
                  : 'w-2 bg-ink/20'
              }`}
            />
          ))}
        </div>

        {activeIndex === 0 && (
          <div className="absolute bottom-[3%] animate-bounce text-sm text-ink/40">
            keep scrolling ↓
          </div>
        )}
      </div>
    </section>
  );
}
