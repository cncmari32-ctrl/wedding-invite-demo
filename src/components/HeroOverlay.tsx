import { useRef } from 'react';
import ScratchReveal from './ScratchReveal';

export default function HeroOverlay() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative w-full py-24 px-6 text-center space-y-16">
      
      {/* Decorative top branch floral element */}
      <div className="flex justify-center select-none animate-floral">
        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="40" viewBox="0 0 100 60" fill="none" stroke="#8d7a6b" strokeWidth="1" strokeLinecap="round">
          <path d="M50 10 C35 25, 20 20, 10 30" />
          <path d="M50 10 C65 25, 80 20, 90 30" />
          <path d="M50 10 C50 30, 45 45, 50 55" />
          <circle cx="10" cy="30" r="2" fill="#8d7a6b" />
          <circle cx="90" cy="30" r="2" fill="#8d7a6b" />
          <circle cx="50" cy="55" r="2" fill="#8d7a6b" />
        </svg>
      </div>

      <div className="space-y-6">
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-tilda-text font-light tracking-tight leading-none">
          Alexa <br/>
          <span className="text-tilda-accent italic font-light">&</span> Richard
        </h1>
        <p className="font-sans text-xs md:text-sm tracking-[0.3em] uppercase text-tilda-accent font-semibold">
          are getting married!
        </p>
      </div>

      {/* Date scratch off section */}
      <div className="space-y-6 max-w-sm mx-auto">
        <ScratchReveal />
        <p className="font-serif text-xs italic text-tilda-accent/80 animate-pulse">
          ✦ Scratch to reveal the wedding date ✦
        </p>
      </div>

      {/* Envelope graphic decorative divider */}
      <div className="flex justify-center select-none pt-6">
        <img 
          src="https://thb.tildacdn.net/tild3132-3666-4637-a562-616361623963/-/resize/20x/Old_Open_Envelope_PN.png" 
          alt="Vintage Envelope Decor" 
          className="w-12 opacity-60"
        />
      </div>

    </div>
  );
}
