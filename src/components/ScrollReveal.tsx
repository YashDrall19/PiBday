import { useEffect, useRef } from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
  /** delay in seconds */
  delay?: number;
  y?: number;
  once?: boolean;
};

/**
 * Lightweight scroll-reveal using IntersectionObserver.
 * Adds a fade + slide-up when the element scrolls into view.
 */
export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  y = 40,
  once = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = `translateY(${y}px)`;
    el.style.transition = `opacity 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}s`;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            if (once) io.unobserve(el);
          } else if (!once) {
            el.style.opacity = '0';
            el.style.transform = `translateY(${y}px)`;
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay, y, once]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
