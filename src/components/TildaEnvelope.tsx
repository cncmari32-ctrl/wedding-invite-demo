import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MailOpen } from 'lucide-react';

interface TildaEnvelopeProps {
  onOpen: () => void;
}

export default function TildaEnvelope({ onOpen }: TildaEnvelopeProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    // Smooth transition delay to let envelope open animation finish
    setTimeout(onOpen, 1000);
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 bg-tilda-bg flex flex-col items-center justify-center text-center p-6 select-none"
        >
          {/* Subtle textured grid overlay */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
               style={{ 
                 backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cpath d='M10 10 H90 V90 H10 Z' fill='none' stroke='%23000' stroke-width='0.1'/%3E%3C/svg%3E")`,
                 backgroundSize: '24px 24px' 
               }} 
          />

          {/* Golden double lines card border */}
          <div className="absolute inset-6 md:inset-12 border border-tilda-accent/15 pointer-events-none flex items-center justify-center">
            <div className="absolute inset-1.5 border border-tilda-accent/5" />
          </div>

          <div className="max-w-md w-full relative z-10 flex flex-col items-center space-y-12">
            
            {/* Top delicate flower element (Tilda style Polygon_4.png replacement) */}
            <div className="w-16 h-16 opacity-80 rotate-45 border-t border-l border-tilda-accent/30 flex items-center justify-center">
              <div className="w-10 h-10 border-t border-l border-tilda-accent/10" />
            </div>

            <div className="space-y-4">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-tilda-text font-light tracking-tight">
                Clara <br/>
                <span className="text-tilda-accent italic">&</span> Julian
              </h1>
              <p className="font-sans text-[11px] uppercase tracking-[0.25em] text-tilda-accent/80">
                Are getting married
              </p>
            </div>

            {/* Vintage styled physical envelope icon button */}
            <button
              onClick={handleOpen}
              className="flex flex-col items-center gap-4 group focus:outline-none"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-20 h-20 rounded-full bg-white border border-tilda-accent/15 shadow-md flex items-center justify-center text-tilda-accent hover:border-tilda-accent hover:bg-tilda-accent hover:text-white transition-all duration-500"
              >
                <MailOpen className="w-8 h-8 stroke-[1.2]" />
              </motion.div>
              <span className="font-serif text-sm italic text-tilda-accent group-hover:text-tilda-text transition-colors duration-300">
                Click to open
              </span>
            </button>
            
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
