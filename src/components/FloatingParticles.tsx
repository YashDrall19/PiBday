import { useMemo } from 'react';

type Variant = 'hearts' | 'sparkles' | 'mixed' | 'balloons' | 'stars';

type Props = {
  variant?: Variant;
  count?: number;
  className?: string;
  /** restrict to a sub-area? default fills parent */
  fullScreen?: boolean;
};

/**
 * Floating decorative particles (hearts, sparkles, stars, balloons).
 * Purely decorative — pointer-events disabled.
 */
export default function FloatingParticles({
  variant = 'mixed',
  count = 18,
  className = '',
  fullScreen = false,
}: Props) {
  const items = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      const left = Math.random() * 100;
      const delay = Math.random() * 8;
      const dur = 6 + Math.random() * 7;
      const size = 10 + Math.random() * 22;
      let kind: 'heart' | 'sparkle' | 'star' | 'balloon';
      if (variant === 'hearts') kind = 'heart';
      else if (variant === 'sparkles') kind = 'sparkle';
      else if (variant === 'stars') kind = 'star';
      else if (variant === 'balloons') kind = 'balloon';
      else kind = (['heart', 'sparkle', 'star'] as const)[i % 3];
      arr.push({ kind, left, delay, dur, size, i });
    }
    return arr;
  }, [count, variant]);

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className} ${
        fullScreen ? 'fixed z-40' : ''
      }`}
      aria-hidden
    >
      {items.map((it) => (
        <span
          key={it.i}
          className="absolute -bottom-12 animate-drift"
          style={{
            left: `${it.left}%`,
            animationDelay: `${it.delay}s`,
            animationDuration: `${it.dur}s`,
            fontSize: `${it.size}px`,
          }}
        >
          {renderParticle(it.kind, it.size)}
        </span>
      ))}
    </div>
  );
}

function renderParticle(kind: string, size: number) {
  const style = { width: size, height: size, display: 'block' as const };
  if (kind === 'heart') {
    return (
      <svg viewBox="0 0 24 24" style={style} fill="none">
        <path
          d="M12 21s-7.5-4.6-10-9.3C.5 8.5 2.5 5 6 5c2 0 3.4 1.2 4 2.4C10.6 6.2 12 5 14 5c3.5 0 5.5 3.5 4 6.7C19.5 16.4 12 21 12 21z"
          fill="url(#hg)"
        />
        <defs>
          <linearGradient id="hg" x1="0" y1="0" x2="24" y2="24">
            <stop stopColor="#ff8fb1" />
            <stop offset="1" stopColor="#ff6b9d" />
          </linearGradient>
        </defs>
      </svg>
    );
  }
  if (kind === 'sparkle') {
    return (
      <svg viewBox="0 0 24 24" style={style} fill="none">
        <path
          d="M12 2c.6 4.5 3.5 7.4 8 8-4.5.6-7.4 3.5-8 8-.6-4.5-3.5-7.4-8-8 4.5-.6 7.4-3.5 8-8z"
          fill="url(#sg)"
        />
        <defs>
          <linearGradient id="sg" x1="0" y1="0" x2="24" y2="24">
            <stop stopColor="#fff3d6" />
            <stop offset="1" stopColor="#f3d9a0" />
          </linearGradient>
        </defs>
      </svg>
    );
  }
  if (kind === 'star') {
    return (
      <svg viewBox="0 0 24 24" style={style} fill="none">
        <path
          d="M12 2l2.9 6.9L22 10l-5.5 4.6L18 22l-6-3.8L6 22l1.5-7.4L2 10l7.1-1.1L12 2z"
          fill="url(#stg)"
        />
        <defs>
          <linearGradient id="stg" x1="0" y1="0" x2="24" y2="24">
            <stop stopColor="#c9b6ff" />
            <stop offset="1" stopColor="#a9b8ff" />
          </linearGradient>
        </defs>
      </svg>
    );
  }
  // balloon
  return (
    <svg viewBox="0 0 24 30" style={{ ...style, height: size * 1.25 }} fill="none">
      <ellipse cx="12" cy="11" rx="9" ry="11" fill="url(#bg)" />
      <path d="M12 22l-1.5 3h3L12 22z" fill="#ff8fb1" />
      <path d="M12 25c0 2 1 4 0 6" stroke="#c9b6ff" strokeWidth="0.8" fill="none" />
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="24" y2="22">
          <stop stopColor="#ffd6e8" />
          <stop offset="1" stopColor="#ff8fb1" />
        </linearGradient>
      </defs>
    </svg>
  );
}
