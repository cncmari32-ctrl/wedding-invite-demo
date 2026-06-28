import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function ScratchReveal() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsSubmitted] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set dimensions to match container
    const width = (canvas.width = 320);
    const height = (canvas.height = 200);

    // Draw scratchable overlay layer
    ctx.fillStyle = '#ebdcc7'; // Golden champagne solid
    ctx.fillRect(0, 0, width, height);

    // Draw some subtle textured dots to make it look like scratch card foil
    ctx.fillStyle = 'rgba(141, 122, 107, 0.15)';
    for (let i = 0; i < 500; i++) {
      ctx.fillRect(Math.random() * width, Math.random() * height, 2, 2);
    }

    // Draw beautiful elegant serif instruction text on the scratch card
    ctx.font = 'italic 16px "Playfair Display", serif';
    ctx.fillStyle = '#4f4942'; // Dark olive
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✦ Scratch to reveal ✦', width / 2, height / 2);

    let isDrawing = false;

    const getCoordinates = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
    };

    const draw = (e: MouseEvent | TouchEvent) => {
      if (!isDrawing) return;
      e.preventDefault();

      const { x, y } = getCoordinates(e);

      // Clear the overlay using destination-out composite mode
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 22, 0, Math.PI * 2);
      ctx.fill();

      // Check how much is scratched off
      checkPercentage();
    };

    const checkPercentage = () => {
      const imgData = ctx.getImageData(0, 0, width, height);
      const pixels = imgData.data;
      let cleared = 0;

      for (let i = 0; i < pixels.length; i += 4) {
        if (pixels[i + 3] === 0) cleared++; // Transparency pixel count
      }

      const percentage = (cleared / (pixels.length / 4)) * 100;
      if (percentage > 45) {
        setIsSubmitted(true);
      }
    };

    const startDrawing = (e: MouseEvent | TouchEvent) => {
      isDrawing = true;
      draw(e);
    };

    const stopDrawing = () => {
      isDrawing = false;
    };

    // Listeners for mouse & touch controls
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseleave', stopDrawing);

    canvas.addEventListener('touchstart', startDrawing);
    canvas.addEventListener('touchmove', draw);
    canvas.addEventListener('touchend', stopDrawing);

    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseleave', stopDrawing);

      canvas.removeEventListener('touchstart', startDrawing);
      canvas.removeEventListener('touchmove', draw);
      canvas.removeEventListener('touchend', stopDrawing);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-[320px] h-[200px] mx-auto rounded-3xl overflow-hidden shadow-inner border border-tilda-accent/10">
      
      {/* Target Content underneath (Date reveal) */}
      <div className="absolute inset-0 bg-[#FFFDFB] flex flex-col items-center justify-center text-center p-6 space-y-2">
        <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-tilda-accent font-semibold block">The Date</span>
        <h4 className="font-serif text-5xl font-light text-tilda-text">18</h4>
        <h5 className="font-serif text-2xl text-tilda-accent italic">September</h5>
        <h6 className="font-sans text-xs tracking-widest text-tilda-text/50">2026</h6>
      </div>

      {/* Canvas scratch card layer overlay */}
      <AnimatePresence>
        {!isRevealed && (
          <motion.canvas
            ref={canvasRef}
            exit={{ opacity: 0, filter: "blur(8px)" }}
            transition={{ duration: 0.6 }}
            className="scratch-canvas absolute inset-0 z-10 w-full h-full"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
