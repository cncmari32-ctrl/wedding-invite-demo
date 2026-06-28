import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// We use a high-end cinematic stock video for the demo.
// Once you run your Veo script, replace this URL with your generated video!
const DEMO_VIDEO_URL = `${import.meta.env.BASE_URL}assets/veo-background.mp4`;

const VideoBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(() => {
    // Parallax effect on the video as you scroll
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
    <div ref={containerRef} className="fixed inset-0 w-full h-svh z-0 bg-brand-dark overflow-hidden pointer-events-none">
      <video 
        ref={videoRef}
        src={DEMO_VIDEO_URL}
        autoPlay 
        loop 
        muted 
        playsInline
        className="absolute inset-0 w-full h-[120%] object-cover opacity-50 mix-blend-screen scale-105"
        style={{ top: '-10%' }} // Offset for parallax
      />
      
      {/* Premium cinematic vignettes to ensure text legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/40 via-transparent to-brand-dark" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(10,10,10,0.8)_100%)]" />
    </div>
  );
};

export default VideoBackground;
