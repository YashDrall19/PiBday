import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { config } from '@/config';
import { heartsBurst } from '@/utils/confetti';
import ScrollReveal from '@/components/ScrollReveal';
import FloatingParticles from '@/components/FloatingParticles';
import MagneticButton from '@/components/MagneticButton';

export default function FinalSurprise() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <section className="relative overflow-hidden py-32">
      <div
        className="absolute inset-0 animate-gradientShift"
        style={{
          background: 'linear-gradient(160deg, #ffe4ef 0%, #f3ecff 50%, #dceeff 100%)',
          backgroundSize: '300% 300%',
        }}
      />
      <div className="absolute inset-0 grain" />
      <FloatingParticles variant="hearts" count={20} />

      {/* glowing orbs */}
      <div className="absolute left-[12%] top-[20%] h-48 w-48 rounded-full bg-pink/40 blur-3xl" />
      <div className="absolute right-[14%] bottom-[20%] h-56 w-56 rounded-full bg-lavender/40 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
        <ScrollReveal>
          <p className="mb-3 font-dancing text-3xl text-rose">🎁 {config.final.lead} 🎁</p>
        </ScrollReveal>

        <div className="mt-6 space-y-5">
          {config.final.message.map((line, i) => (
            <ScrollReveal key={i} delay={i * 0.15}>
              <p
                className={`text-ink/85 ${
                  i === config.final.message.length - 1
                    ? 'font-script text-4xl leading-[1.3] py-2 text-gradient sm:text-5xl'
                    : 'text-lg sm:text-xl'
                }`}
              >
                {line}
              </p>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.5} className="mt-12">
          <MagneticButton onClick={() => setShowPopup(true)}>
            {config.final.button}
          </MagneticButton>
        </ScrollReveal>
      </div>

      {/* Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="fixed inset-0 z-[95] flex items-center justify-center bg-ink/75 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setShowPopup(false)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 10 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              className="relative max-w-md rounded-3xl bg-cream p-10 text-center shadow-glow will-change-transform"
              onClick={(e) => e.stopPropagation()}
              onAnimationComplete={() => heartsBurst()}
            >
              <div className="relative">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-rose to-lavender text-white shadow-glow">
                  <Heart className="h-8 w-8" />
                </div>
                <p className="font-dancing text-3xl leading-relaxed text-ink sm:text-4xl">{config.final.popup}</p>
                <div className="mt-4 text-4xl">🥳</div>
                <button
                  onClick={() => setShowPopup(false)}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose to-lavender px-6 py-3 text-white shadow-soft transition-transform hover:scale-105"
                >
                  <Sparkles className="h-4 w-4" /> Thank you!
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
