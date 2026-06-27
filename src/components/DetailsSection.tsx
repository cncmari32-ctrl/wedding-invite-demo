import { useRef } from "react";

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const DetailsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Reveal animation for the content blocks
    gsap.from(".reveal-block", {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
        end: "bottom bottom",
        toggleActions: "play none none reverse"
      }
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative z-20 bg-brand-dark pt-32 pb-48 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-start">
        
        {/* Left Column - The Date */}
        <div className="reveal-block md:col-span-5 md:sticky md:top-32">
          <p className="font-sans text-brand-accent tracking-widest text-xs uppercase mb-4">When</p>
          <h2 className="font-serif text-5xl md:text-6xl leading-tight mb-2">October 24</h2>
          <h3 className="font-serif text-3xl md:text-4xl text-white/50 italic mb-8">Two Thousand Twenty Six</h3>
          <p className="font-sans text-sm text-white/70 max-w-sm">
            Please arrive by 4:00 PM for a welcome drink. The ceremony will commence promptly at 4:30 PM.
          </p>
        </div>

        {/* Right Column - Locations & Schedule */}
        <div className="md:col-span-6 md:col-start-7 space-y-32 mt-16 md:mt-0">
          
          {/* Location Block */}
          <div className="reveal-block">
            <p className="font-sans text-brand-accent tracking-widest text-xs uppercase mb-4">Where</p>
            <h4 className="font-serif text-3xl mb-2">Villa Balbiano</h4>
            <p className="font-sans text-sm text-white/70 leading-relaxed mb-6">
              Via Regina, 56<br />
              22010 Ossuccio CO<br />
              Lake Como, Italy
            </p>
            <a href="#" className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest border-b border-brand-accent/30 pb-1 hover:border-brand-accent transition-colors">
              View Map
            </a>
          </div>

          {/* Schedule Block */}
          <div className="reveal-block">
             <p className="font-sans text-brand-accent tracking-widest text-xs uppercase mb-8">The Evening</p>
             
             <div className="space-y-8">
               <div className="grid grid-cols-[100px_1fr] gap-4 border-b border-white/10 pb-8">
                 <span className="font-sans text-sm text-white/50">4:30 PM</span>
                 <div>
                   <h5 className="font-serif text-xl mb-1">Ceremony</h5>
                   <p className="font-sans text-xs text-white/60">The Lakeside Gardens</p>
                 </div>
               </div>
               
               <div className="grid grid-cols-[100px_1fr] gap-4 border-b border-white/10 pb-8">
                 <span className="font-sans text-sm text-white/50">6:00 PM</span>
                 <div>
                   <h5 className="font-serif text-xl mb-1">Aperitivo</h5>
                   <p className="font-sans text-xs text-white/60">The Terrace</p>
                 </div>
               </div>

               <div className="grid grid-cols-[100px_1fr] gap-4 border-b border-white/10 pb-8">
                 <span className="font-sans text-sm text-white/50">8:00 PM</span>
                 <div>
                   <h5 className="font-serif text-xl mb-1">Dinner & Dancing</h5>
                   <p className="font-sans text-xs text-white/60">The Grand Hall</p>
                 </div>
               </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DetailsSection;
