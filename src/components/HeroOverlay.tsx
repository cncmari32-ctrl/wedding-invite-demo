import { useRef } from "react";

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const HeroOverlay = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=1000",
        scrub: true,
      }
    });

    // Fade out and move up the hero text as we scroll down
    tl.to(".hero-text", {
      y: -100,
      opacity: 0,
      stagger: 0.1,
      ease: "power1.inOut"
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 text-center px-6">
      <div className="overflow-hidden mb-6">
        <p className="hero-text font-sans tracking-[0.3em] text-xs uppercase text-brand-accent/80">
          The Wedding Celebration Of
        </p>
      </div>
      
      <div className="overflow-hidden">
        <h1 className="hero-text font-serif text-6xl md:text-8xl lg:text-9xl tracking-tight leading-none">
          Sarah <span className="text-brand-accent italic font-light">&</span> John
        </h1>
      </div>

      <div className="overflow-hidden mt-12">
        <p className="hero-text font-sans tracking-widest text-sm uppercase text-white/60">
          Scroll to enter
        </p>
        <div className="hero-text w-[1px] h-12 bg-white/20 mx-auto mt-4 origin-top" />
      </div>
    </div>
  );
};

export default HeroOverlay;
