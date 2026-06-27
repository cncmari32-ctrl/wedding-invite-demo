import { useRef, useEffect, useState } from "react";

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// This component handles the cinematic video scrub on scroll
const CinematicCanvas = ({ frameCount = 60 }: { frameCount?: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  
  // We'll use placeholder solid colors/gradients for the "video" frames since we don't have a real image sequence yet
  // In a real app, you'd load images from S3/CloudFront here
  const images = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    // Generate placeholder frames (a shifting gradient/color)
    const generatePlaceholders = async () => {
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = 1920;
      tempCanvas.height = 1080;
      const ctx = tempCanvas.getContext('2d');
      
      let loaded = 0;
      for (let i = 0; i < frameCount; i++) {
        if (ctx) {
          // Create a shifting dark moody aesthetic
          const progress = i / frameCount;
          const gradient = ctx.createLinearGradient(0, 0, tempCanvas.width, tempCanvas.height);
          gradient.addColorStop(0, `#${Math.floor(10 + progress * 20).toString(16)}0a0a`);
          gradient.addColorStop(1, `#0a0a${Math.floor(10 + (1-progress) * 20).toString(16)}`);
          
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
          
          // Add some "cinematic" grain/texture overlay
          ctx.fillStyle = 'rgba(255,255,255,0.02)';
          for(let k=0; k<1000; k++) {
             ctx.fillRect(Math.random()*tempCanvas.width, Math.random()*tempCanvas.height, 2, 2);
          }
          
          const img = new Image();
          img.src = tempCanvas.toDataURL('image/jpeg', 0.8);
          
          // Wait for load (though data URLs are mostly sync, good practice)
          await new Promise<void>((resolve) => {
            img.onload = () => {
              images.current[i] = img;
              loaded++;
              setImagesLoaded(loaded);
              resolve();
            };
          });
        }
      }
      
      // Draw first frame initially
      if (canvasRef.current && images.current[0]) {
         const dCtx = canvasRef.current.getContext('2d');
         if(dCtx) dCtx.drawImage(images.current[0], 0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    };

    generatePlaceholders();
  }, [frameCount]);

  useGSAP(() => {
    if (imagesLoaded !== frameCount || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Object to hold the current frame index for GSAP to animate
    const playhead = { frame: 0 };

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "+=4000", // The scrub distance (higher = slower scrub)
      pin: true,
      scrub: 0.5, // Slight smoothing
      animation: gsap.to(playhead, {
        frame: frameCount - 1,
        snap: "frame", // Snap to integer frames
        ease: "none",
        onUpdate: () => {
          if (ctx && images.current[playhead.frame]) {
            // Clear and draw the new frame
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // Draw image covering canvas
            ctx.drawImage(images.current[playhead.frame], 0, 0, canvas.width, canvas.height);
          }
        }
      })
    });

  }, { dependencies: [imagesLoaded], scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-full h-svh bg-brand-dark overflow-hidden">
      {/* Loading State */}
      {imagesLoaded < frameCount && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-brand-dark">
          <p className="font-sans text-xs tracking-[0.2em] text-white/50 uppercase">Loading Cinematic Experience {Math.round((imagesLoaded/frameCount)*100)}%</p>
        </div>
      )}
      
      {/* The Canvas */}
      <canvas 
        ref={canvasRef}
        width={1920}
        height={1080}
        className="w-full h-full object-cover opacity-60 mix-blend-screen"
      />
      
      {/* Gradient Overlay for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/40 via-transparent to-brand-dark pointer-events-none" />
    </div>
  );
};

export default CinematicCanvas;
