import { useRef } from 'react';
import { motion } from 'motion/react';
import { MapPin, Clock, Shirt } from 'lucide-react';

export default function EventDetails() {
  const containerRef = useRef<HTMLDivElement>(null);

  const cardVariants: any = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  return (
    <div ref={containerRef} className="py-32 bg-brand-light text-brand-dark px-6 md:px-12 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <p className="font-sans text-[11px] uppercase tracking-[0.25em] text-brand-accent mb-6 font-semibold">
            The Celebration
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-dark tracking-tight leading-tight font-light">
            Event Details
          </h2>
          <div className="w-12 h-[1px] bg-brand-accent/30 mx-auto mt-8" />
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Box 1: Ceremony */}
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardVariants}
            className="md:col-span-6 bg-white border border-brand-accent/10 p-8 md:p-12 rounded-3xl shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-full bg-brand-accent/5 flex items-center justify-center mb-8 border border-brand-accent/10">
                <MapPin className="w-5 h-5 text-brand-accent" />
              </div>
              <h3 className="font-serif text-2xl mb-4 font-light text-brand-dark">The Ceremony</h3>
              <p className="font-sans text-sm text-brand-dark/70 mb-8 leading-relaxed font-light">
                Our promises will be spoken in the Lakeside Gardens of Villa Balbiano, overlooking the serene waters of Lake Como.
              </p>
            </div>
            <div className="space-y-4 border-t border-brand-accent/10 pt-6">
              <div className="flex items-center gap-3 font-sans text-xs text-brand-accent uppercase tracking-widest font-semibold">
                <Clock className="w-4 h-4 stroke-[1.5]" />
                <span>4:30 PM • Lakeside Gardens</span>
              </div>
            </div>
          </motion.div>

          {/* Box 2: Reception */}
          <motion.div
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardVariants}
            className="md:col-span-6 bg-white border border-brand-accent/10 p-8 md:p-12 rounded-3xl shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-full bg-brand-accent/5 flex items-center justify-center mb-8 border border-brand-accent/10">
                <Clock className="w-5 h-5 text-brand-accent" />
              </div>
              <h3 className="font-serif text-2xl mb-4 font-light text-brand-dark">The Reception</h3>
              <p className="font-sans text-sm text-brand-dark/70 mb-8 leading-relaxed font-light">
                An evening of fine dining, laughter, and dance inside the Grand Hall, celebrating our first night as husband and wife.
              </p>
            </div>
            <div className="space-y-4 border-t border-brand-accent/10 pt-6">
              <div className="flex items-center gap-3 font-sans text-xs text-brand-accent uppercase tracking-widest font-semibold">
                <Clock className="w-4 h-4 stroke-[1.5]" />
                <span>8:00 PM • The Grand Hall</span>
              </div>
            </div>
          </motion.div>

          {/* Box 3: Dress Code */}
          <motion.div
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardVariants}
            className="md:col-span-5 bg-white border border-brand-accent/10 p-8 md:p-12 rounded-3xl shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-full bg-brand-accent/5 flex items-center justify-center mb-8 border border-brand-accent/10">
                <Shirt className="w-5 h-5 text-brand-accent" />
              </div>
              <h3 className="font-serif text-2xl mb-4 font-light text-brand-dark">The Dress Code</h3>
              <p className="font-sans text-sm text-brand-dark/70 leading-relaxed font-light">
                Black Tie Formal. We kindly request that our guests dress in elegant, dark, or muted colors (e.g., black, forest green, deep navy, champagne, or rose gold).
              </p>
            </div>
          </motion.div>

          {/* Box 4: Lake Como Backdrop image */}
          <motion.div
            custom={3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardVariants}
            className="md:col-span-7 h-[45vh] md:h-auto rounded-3xl overflow-hidden relative shadow-sm"
          >
            <img 
              src={`${import.meta.env.BASE_URL}assets/lake-venue.jpg`} 
              alt="Villa Balbiano" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2000ms]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 text-white z-10">
              <p className="font-sans text-[10px] uppercase tracking-widest text-brand-accent font-semibold mb-1">Venue</p>
              <h4 className="font-serif text-2xl font-light">Villa Balbiano, Italy</h4>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
