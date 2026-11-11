import confetti from 'canvas-confetti';

const pastelColors = ['#ff8fb1', '#ff6b9d', '#c9b6ff', '#a9b8ff', '#bfe3ff', '#ffd9c2', '#f3d9a0', '#ffd6e8'];

// Cache emoji shapes — shapeFromText is expensive (renders text to canvas)
let cachedHeart: ReturnType<typeof confetti.shapeFromText> | null = null;
let cachedSparkle: ReturnType<typeof confetti.shapeFromText> | null = null;

function heartShape() {
  if (!cachedHeart) cachedHeart = confetti.shapeFromText({ text: '💗', scalar: 2 });
  return cachedHeart;
}
function sparkleShape() {
  if (!cachedSparkle) cachedSparkle = confetti.shapeFromText({ text: '✨', scalar: 1.6 });
  return cachedSparkle;
}

export function gentleConfetti() {
  const end = Date.now() + 1800;
  (function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 65,
      startVelocity: 45,
      origin: { x: 0, y: 0.7 },
      colors: pastelColors,
      scalar: 0.9,
      disableForReducedMotion: true,
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 65,
      startVelocity: 45,
      origin: { x: 1, y: 0.7 },
      colors: pastelColors,
      scalar: 0.9,
      disableForReducedMotion: true,
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

export function bigConfetti() {
  confetti({
    particleCount: 140,
    spread: 100,
    startVelocity: 50,
    origin: { y: 0.6 },
    colors: pastelColors,
    scalar: 1.1,
    disableForReducedMotion: true,
  });
  setTimeout(() => {
    confetti({
      particleCount: 70,
      angle: 60,
      spread: 70,
      origin: { x: 0, y: 0.65 },
      colors: pastelColors,
      disableForReducedMotion: true,
    });
    confetti({
      particleCount: 70,
      angle: 120,
      spread: 70,
      origin: { x: 1, y: 0.65 },
      colors: pastelColors,
      disableForReducedMotion: true,
    });
  }, 250);
}

export function heartsBurst() {
  confetti({
    particleCount: 36,
    spread: 75,
    startVelocity: 38,
    origin: { y: 0.5 },
    shapes: [heartShape(), sparkleShape()],
    colors: ['#ff8fb1', '#c9b6ff', '#f3d9a0'],
    scalar: 1.3,
    disableForReducedMotion: true,
  });
}
