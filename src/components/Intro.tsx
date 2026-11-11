import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { config } from '@/config';
import { gentleConfetti, heartsBurst } from '@/utils/confetti';
import FloatingParticles from '@/components/FloatingParticles';

type Props = { onEnter: () => void };

export default function Intro({ onEnter }: Props) {
  const [leaving, setLeaving] = useState(false);
  const [showSub, setShowSub] = useState(false);
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowSub(true), 900);
    const t2 = setTimeout(() => setShowBtn(true), 1700);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const handleEnter = () => {
    gentleConfetti();
    heartsBurst();
    setLeaving(true);
    setTimeout(onEnter, 1300);
  };

  return (
    <AnimatePresence>
      {!leaving && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: 'blur(12px)' }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Animated dreamy gradient backdrop */}
          <div
            className="absolute inset-0 animate-gradientShift"
            style={{
              background:
                'linear-gradient(120deg, #ffd6e8, #c9b6ff, #bfe3ff, #ffd9c2, #ffd6e8)',
              backgroundSize: '300% 300%',
            }}
          />
          <div className="absolute inset-0 grain" />
          <FloatingParticles variant="mixed" count={26} fullScreen />

          {/* Soft glowing orbs */}
          <div className="absolute left-[10%] top-[20%] h-72 w-72 rounded-full bg-pink/40 blur-3xl" />
          <div className="absolute right-[12%] bottom-[18%] h-80 w-80 rounded-full bg-lavender/40 blur-3xl" />
          <div className="absolute right-[30%] top-[15%] h-60 w-60 rounded-full bg-babyblue/40 blur-3xl" />

          <motion.div
            className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center lg:flex-row lg:gap-12 lg:text-left"
            animate={{ y: showBtn ? -24 : 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: -3 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="order-2 mt-8 w-48 shrink-0 rounded-[2rem] bg-white/65 p-3 shadow-glow backdrop-blur-sm lg:order-1 lg:mt-0 lg:w-56"
            >
              <div className="overflow-hidden rounded-[1.4rem]">
                <img
                  src="/images/pihu.jpeg"
                  alt="Pihu, the birthday girl"
                  className="aspect-[4/5] w-full object-cover object-center"
                />
              </div>
              <p className="pb-1 pt-3 font-dancing text-xl text-ink">the birthday girl</p>
            </motion.div>

            <div className="order-1 max-w-2xl lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full glass px-5 py-2 text-sm font-medium text-ink shadow-soft"
            >
              <Sparkles className="h-4 w-4 text-rose" />
              {config.intro.greeting}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="font-script text-5xl leading-[1.45] py-4 text-gradient sm:text-7xl md:text-8xl"
            >
              {config.intro.heading}
            </motion.h1>

            <AnimatePresence>
              {showSub && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9 }}
                  className="mx-auto mt-6 max-w-md text-base text-ink/80 sm:text-lg"
                >
                  {config.intro.subheading}
                </motion.p>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {showBtn && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                  className="mt-10"
                >
                  <button
                    onClick={handleEnter}
                    className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose via-pink to-lavender px-9 py-4 font-medium text-white shadow-glow transition-transform duration-300 hover:scale-105 animate-pulseGlow"
                  >
                    <Heart className="h-5 w-5 transition-transform group-hover:scale-125" />
                    {config.intro.button}
                    <Sparkles className="h-5 w-5" />
                  </button>
                  <p className="mt-4 text-xs text-ink/50">Best experienced with sound on &amp; scrolled slowly ✨</p>
                </motion.div>
              )}
            </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
