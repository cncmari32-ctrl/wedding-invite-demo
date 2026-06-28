import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const HeroOverlay = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });

    // Elegant scroll fade-out on the hero element text
    tl.to(".hero-element", {
      y: -150,
      opacity: 0,
      stagger: 0.05,
      ease: "power2.inOut"
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative z-10 w-full h-svh flex flex-col justify-end pb-24 px-8 md:px-16 lg:px-32 pointer-events-none">
      <div className="max-w-4xl">
        <div className="overflow-hidden mb-8">
          <p className="hero-element font-sans tracking-[0.4em] text-xs md:text-sm uppercase text-brand-accent/80">
            The Wedding Celebration Of
          </p>
        </div>
        
        <div className="overflow-hidden">
          <h1 className="hero-element font-serif text-7xl md:text-9xl lg:text-[10rem] tracking-tighter leading-[0.9] font-light text-white">
            Alexa <br/>
            <span className="text-brand-accent italic pr-6">&</span> Richard
          </h1>
        </div>

        <div className="hero-element mt-16 flex items-center gap-6">
          <div className="w-12 h-[1px] bg-white/30" />
          <p className="font-sans tracking-widest text-xs uppercase text-white/50">
            September 14, 2027 • Nantes, France
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroOverlay;
