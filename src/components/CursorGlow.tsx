import { useEffect, useRef } from 'react';

/**
 * A soft glowing orb that follows the cursor on desktop.
 * Disabled on touch devices via CSS.
 */
export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(hover: none)').matches) return;

    let raf = 0;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let cx = tx;
    let cy = ty;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    const loop = () => {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      el.style.transform = `translate(${cx - 150}px, ${cy - 150}px)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="cursor-glow pointer-events-none fixed left-0 top-0 z-[60] h-[300px] w-[300px] rounded-full opacity-60 blur-3xl"
      style={{
        background:
          'radial-gradient(circle, rgba(255,143,177,0.5) 0%, rgba(201,182,255,0.3) 45%, transparent 70%)',
      }}
    />
  );
}
