import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Intro from '@/components/Intro';
import Hero from '@/components/Hero';
import Letter from '@/components/Letter';
import Reasons from '@/components/Reasons';
import MemoryLane from '@/components/MemoryLane';
import Wish from '@/components/Wish';
import InteractiveCake from '@/components/InteractiveCake';
import FinalSurprise from '@/components/FinalSurprise';
import Footer from '@/components/Footer';
import CursorGlow from '@/components/CursorGlow';
import ScrollProgress from '@/components/ScrollProgress';
import FloatingParticles from '@/components/FloatingParticles';

export default function App() {
  const [entered, setEntered] = useState(false);

  // Lock scroll during intro
  useEffect(() => {
    if (!entered) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      window.scrollTo(0, 0);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [entered]);

  return (
    <div className="relative min-h-screen bg-cream text-ink">
      <CursorGlow />
      <ScrollProgress />

      <AnimatePresence>
        {!entered && <Intro onEnter={() => setEntered(true)} />}
      </AnimatePresence>

      {entered && (
        <motion.main
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <Hero />
          <Letter />
          <Reasons />
          <MemoryLane />
          <Wish />
          <InteractiveCake />
          <FinalSurprise />
          <Footer />
        </motion.main>
      )}

      {/* Ambient floating hearts across the whole site */}
      {entered && <FloatingParticles variant="mixed" count={10} fullScreen />}
    </div>
  );
}
