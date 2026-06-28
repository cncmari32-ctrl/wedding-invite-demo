import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// The beautiful original video loop with the lake/ocean, terrace, sun, and door opening view!
const VIDEO_URL = "https://pub-4dc8201144ca418fb604349c73e8c724.r2.dev/Italian_villa_terrace_202604231419%20(1).MP4";

const VideoBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(() => {
    // Elegant soft parallax scrolling for cinematic depth
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
        This plays the stunning, photorealistic original video loop showing the romantic Italian villa, 
        terrace arches (like an open door), the sun, and the beautiful blue lake/ocean water of Lake Como.
      */}
      <video 
        ref={videoRef}
        src={VIDEO_URL}
        autoPlay 
        loop 
        muted 
        playsInline
        className="absolute inset-0 w-full h-[120%] object-cover opacity-60 mix-blend-screen scale-105"
        style={{ top: '-10%' }}
      />
      
      {/* Premium vignettes to ensure text legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#0a0a0a]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(10,10,10,0.8)_100%)]" />
    </div>
  );
};

export default VideoBackground;
