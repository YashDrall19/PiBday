type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'ghost';
  type?: 'button' | 'submit';
  ariaLabel?: string;
};

import { useRef } from 'react';

/**
 * Button with a magnetic hover effect and soft glow.
 */
export default function MagneticButton({
  children,
  onClick,
  className = '',
  variant = 'primary',
  type = 'button',
  ariaLabel,
}: Props) {
  const ref = useRef<HTMLButtonElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(hover: none)').matches) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = 'translate(0,0)';
  };

  const base =
    'relative inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 font-medium tracking-wide transition-all duration-300 will-change-transform select-none';
  const styles =
    variant === 'primary'
      ? 'text-white bg-gradient-to-r from-rose via-pink to-lavender shadow-soft hover:shadow-glow animate-pulseGlow'
      : 'text-ink glass hover:bg-white/70';

  return (
    <button
      ref={ref}
      type={type}
      aria-label={ariaLabel}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`${base} ${styles} ${className}`}
    >
      <span className="relative z-10">{children}</span>
      {variant === 'primary' && (
        <span className="pointer-events-none absolute inset-0 rounded-full opacity-50 blur-md bg-gradient-to-r from-rose via-pink to-lavender -z-10" />
      )}
    </button>
  );
}
