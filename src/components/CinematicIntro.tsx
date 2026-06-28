import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart } from 'lucide-react';

interface CinematicIntroProps {
  onEnter: () => void;
}

const introSlides = [
  { text: "Two Hearts. One Journey.", sub: "A love story written in the stars..." },
  { text: "With Joy in Their Hearts...", sub: "We are cordially invited to celebrate the marriage of..." },
  { text: "Sarah & John", sub: "October 24, 2026 • Lake Como, Italy" }
];

export default function CinematicIntro({ onEnter }: CinematicIntroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (currentSlide < introSlides.length - 1) {
      const timer = setTimeout(() => {
        setCurrentSlide((prev) => prev + 1);
      }, 4000); // 4 seconds per slide
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setIsDone(true);
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [currentSlide]);

  const handleEnterClick = () => {
    setIsDone(true);
    // Trigger callback immediately
    setTimeout(onEnter, 800);
  };

  useEffect(() => {
    if (isDone) {
      onEnter();
    }
  }, [isDone, onEnter]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#fdfbf7] text-brand-dark px-6 overflow-hidden"
        >
          {/* Subtle textured premium background */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
               style={{ 
                 backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cpath d='M10 10 H90 V90 H10 Z' fill='none' stroke='%23000' stroke-width='0.1'/%3E%3C/svg%3E")`,
                 backgroundSize: '30px 30px' 
               }} 
          />

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none" />

          {/* Golden borders for a classic luxury invite look */}
          <div className="absolute inset-6 md:inset-12 border border-brand-accent/15 pointer-events-none flex items-center justify-center">
            <div className="absolute inset-2 border border-brand-accent/5" />
          </div>

          <div className="relative z-10 max-w-4xl text-center flex flex-col items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                <div className="flex justify-center mb-4">
                  <Heart className="w-5 h-5 text-brand-accent/60 stroke-[1.5]" />
                </div>
                
                <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl tracking-tight text-[#1a1814] leading-tight font-light px-4">
                  {introSlides[currentSlide].text}
                </h2>
                
                <p className="font-sans text-xs md:text-sm tracking-[0.25em] uppercase text-brand-accent/80 px-4">
                  {introSlides[currentSlide].sub}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Entry Action Button */}
            {currentSlide === introSlides.length - 1 && (
              <motion.button
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1 }}
                onClick={handleEnterClick}
                className="mt-16 px-10 py-4 bg-brand-dark hover:bg-brand-accent text-white hover:text-brand-dark font-sans text-xs uppercase tracking-[0.25em] rounded-full border border-brand-accent/20 hover:border-transparent transition-all duration-500 shadow-xl"
              >
                Enter Celebration
              </motion.button>
            )}

            {/* Small slide indicator bar */}
            <div className="absolute -bottom-32 flex gap-3">
              {introSlides.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-[1px] transition-all duration-1000 ${i === currentSlide ? 'w-12 bg-brand-accent' : 'w-4 bg-brand-accent/20'}`} 
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
