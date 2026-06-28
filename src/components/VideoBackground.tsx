import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const VIDEO_URL = `${import.meta.env.BASE_URL}assets/veo-background.mp4`;

const VideoBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(() => {
    // Elegant soft parallax scrolling
    gsap.to(videoRef.current, {
      yPercent: 20,
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
    <div ref={containerRef} className="fixed inset-0 w-full h-svh z-0 bg-[#0a0a0a] overflow-hidden pointer-events-none">
      {/* 
        This plays your custom, photorealistic Veo-generated background video (champagne silk rippling).
        It sits as an incredibly fluid, gorgeous full-screen animated backdrop loop.
      */}
      <video 
        ref={videoRef}
        src={VIDEO_URL}
        autoPlay 
        loop 
        muted 
        playsInline
        className="absolute inset-0 w-full h-[120%] object-cover opacity-50 mix-blend-screen scale-105"
        style={{ top: '-10%' }}
      />
      
      {/* Premium vignettes to ensure text legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#0a0a0a]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(10,10,10,0.8)_100%)]" />
    </div>
  );
};

export default VideoBackground;
