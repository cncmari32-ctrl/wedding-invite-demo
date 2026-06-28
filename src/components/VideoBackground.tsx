import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function VideoBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Force play on first user interaction
    const forcePlay = () => {
      if (video.paused) {
        video.play().catch(() => {});
      }
    };
    window.addEventListener('click', forcePlay);
    window.addEventListener('touchstart', forcePlay);

    // Scroll-triggered Play on Scroll behavior
    let scrollTimeout: NodeJS.Timeout;
    
    const handleScrollPlay = () => {
      // 1. Play the video when scrolling is detected
      if (video.paused) {
        video.play().catch(() => {});
      }

      // 2. Clear previous timeout and set a new one to pause when scrolling stops (idle detection)
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        video.pause();
      }, 150); // Pause 150ms after scroll stops for a smooth deceleration effect
    };

    window.addEventListener('scroll', handleScrollPlay, { passive: true });

    // GSAP ScrollTrigger for smooth zoom/parallax on scroll
    const ctx = gsap.context(() => {
      gsap.to(video, {
        scale: 1.15,
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        }
      });
    }, containerRef);

    return () => {
      window.removeEventListener('click', forcePlay);
      window.removeEventListener('touchstart', forcePlay);
      window.removeEventListener('scroll', handleScrollPlay);
      clearTimeout(scrollTimeout);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 w-full h-svh z-0 bg-[#f9f6f3] overflow-hidden pointer-events-none">
      {/* 
        Fully responsive high-end backdrop video stream.
        Plays dynamically when the user is scrolling and pauses when the screen is idle!
      */}
      <video 
        ref={videoRef}
        src="https://pub-4dc8201144ca418fb604349c73e8c724.r2.dev/Italian_villa_terrace_202604231419%20(1).MP4"
        loop 
        muted 
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-[115%] object-cover opacity-[0.06] mix-blend-multiply scale-105"
        style={{ top: '-5%' }}
      />
      
      {/* Delicate vintage paper texture */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none" 
           style={{ 
             backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath d='M1 1 H3 V3 H1 Z' fill='%23000'/%3E%3C/svg%3E")`,
             backgroundSize: '8px 8px' 
           }} 
      />
      
      {/* Soft gradient overlays for maximum text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f9f6f3]/20 via-transparent to-[#f9f6f3]" />
    </div>
  );
}
