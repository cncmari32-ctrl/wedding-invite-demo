import { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  r: number; // radius
  d: number; // density/weight
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  xSpeed: number;
  ySpeed: number;
  color: string;
}

export default function FloatingPetals() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Subtle premium wedding tones: blush pinks, gold, and warm ivories
    const colors = [
      'rgba(240, 218, 212, 0.65)', // Blush Pink
      'rgba(212, 175, 55, 0.45)',  // Soft Gold
      'rgba(245, 245, 240, 0.65)', // Off White / Ivory
      'rgba(255, 192, 203, 0.5)',  // Pastel Pink
    ];

    const maxPetals = 40;
    const petals: Petal[] = [];

    // Initialize petals
    for (let i = 0; i < maxPetals; i++) {
      petals.push(createPetal(true));
    }

    function createPetal(randomY = false): Petal {
      return {
        x: Math.random() * width,
        y: randomY ? Math.random() * height : -20,
        r: Math.random() * 8 + 6, // size
        d: Math.random() * 0.5 + 0.5,
        opacity: Math.random() * 0.6 + 0.3,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 0.5,
        xSpeed: Math.random() * 1.5 - 0.5,
        ySpeed: Math.random() * 1.2 + 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    }

    function drawPetal(p: Petal) {
      if (!ctx) return;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.beginPath();
      
      // Draw organic petal / drop shape
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-p.r, -p.r, -p.r * 1.5, p.r / 2, 0, p.r * 1.5);
      ctx.bezierCurveTo(p.r * 1.5, p.r / 2, p.r, -p.r, 0, 0);
      
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;
      ctx.fill();
      ctx.restore();
    }

    function update() {
      ctx!.clearRect(0, 0, width, height);

      petals.forEach((p, index) => {
        p.y += p.ySpeed;
        p.x += p.xSpeed + Math.sin(p.y / 30) * 0.5; // gentle waving drift
        p.rotation += p.rotationSpeed;

        // Draw the updated petal
        drawPetal(p);

        // Reset petal if it flows off-screen
        if (p.y > height + 20 || p.x > width + 20 || p.x < -20) {
          petals[index] = createPetal(false);
        }
      });

      animationFrameId = requestAnimationFrame(update);
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    update();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
