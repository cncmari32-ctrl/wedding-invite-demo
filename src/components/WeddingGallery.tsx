import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const galleryImages = [
  {
    url: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop",
    title: "Lake Como Romance",
    caption: "Overlooking the beautiful hills."
  },
  {
    url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=1200&auto=format&fit=crop",
    title: "Hand in Hand",
    caption: "A stroll through Paris."
  },
  {
    url: "https://images.unsplash.com/photo-1520854221256-17451cc350db?q=80&w=1200&auto=format&fit=crop",
    title: "A Quiet Moment",
    caption: "Chasing sunsets."
  },
  {
    url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200&auto=format&fit=crop",
    title: "Joyful Hearts",
    caption: "Laughter in the Alps."
  }
];

export default function WeddingGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <div className="py-32 bg-brand-light text-brand-dark px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-24">
          <p className="font-sans text-[11px] uppercase tracking-[0.25em] text-brand-accent mb-6 font-semibold">
            Captured Moments
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-dark tracking-tight leading-tight font-light">
            Our Gallery
          </h2>
          <div className="w-12 h-[1px] bg-brand-accent/30 mx-auto mt-8" />
        </div>

        {/* Large Cinematic Carousel */}
        <div className="relative h-[65vh] w-full rounded-3xl overflow-hidden shadow-xl border border-brand-accent/5">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, filter: "blur(6px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(6px)" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <img 
                src={galleryImages[currentIndex].url} 
                alt={galleryImages[currentIndex].title} 
                className="w-full h-full object-cover scale-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/50 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-10 left-10 text-white z-10">
                <h3 className="font-serif text-3xl font-light mb-1">
                  {galleryImages[currentIndex].title}
                </h3>
                <p className="font-sans text-xs tracking-wider text-brand-accent font-light">
                  {galleryImages[currentIndex].caption}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav Buttons */}
          <button 
            onClick={prevImage}
            className="absolute left-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-brand-dark transition-all duration-300 shadow-md hover:scale-105 z-20"
            aria-label="Previous Image"
          >
            <ArrowLeft className="w-5 h-5 stroke-[1.5]" />
          </button>
          
          <button 
            onClick={nextImage}
            className="absolute right-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-brand-dark transition-all duration-300 shadow-md hover:scale-105 z-20"
            aria-label="Next Image"
          >
            <ArrowRight className="w-5 h-5 stroke-[1.5]" />
          </button>
        </div>

        {/* Dots indicators */}
        <div className="flex justify-center gap-3 mt-8">
          {galleryImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-[1px] transition-all duration-500 ${i === currentIndex ? 'w-12 bg-brand-accent' : 'w-4 bg-brand-accent/20'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
