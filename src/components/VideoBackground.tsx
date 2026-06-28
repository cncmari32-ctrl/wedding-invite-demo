import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function VideoBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(() => {
    // Elegant soft parallax scrolling
    gsap.to(videoRef.current, {
      yPercent: 15,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="fixed inset-0 w-full h-svh z-0 bg-tilda-bg overflow-hidden pointer-events-none">
      {/* 
        We play your custom Veo generated video, but beautifully blended at low opacity
        so it adds elegant flowing-silk texture overlays to the Tilda cream paper aesthetic!
      */}
      <video 
        ref={videoRef}
        src={`${import.meta.env.BASE_URL}assets/veo-background.mp4`}
        autoPlay 
        loop 
        muted 
        playsInline
        className="absolute inset-0 w-full h-[115%] object-cover opacity-[0.04] mix-blend-multiply scale-105"
        style={{ top: '-5%' }}
      />
      
      {/* Subtle luxury paper textured overlay design */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none" 
           style={{ 
             backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath d='M1 1 H3 V3 H1 Z' fill='%23000'/%3E%3C/svg%3E")`,
             backgroundSize: '8px 8px' 
           }} 
      />
      
      {/* Edge gradient vignettes */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f9f6f3]/10 via-transparent to-[#f9f6f3]" />
    </div>
  );
}
