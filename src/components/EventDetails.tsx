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

  const mapIframe = `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2710.222718317551!2d-1.5583939!3d47.213233!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4805ec6a235313a6%3A0xc3b00bd561a01dd8!2s33%20Rue%20de%20l'Indre%2C%2044000%20Nantes%2C%20France!5e0!3m2!1sen!2sus!4v1781959653!5m2!1sen!2sus" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;

  return (
    <div ref={containerRef} className="py-32 bg-[#0c0c0c] text-white px-6 md:px-12 lg:px-24 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <p className="font-sans text-[11px] uppercase tracking-[0.25em] text-brand-accent mb-6 font-semibold">
            The Celebration
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight font-light text-white">
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
            className="md:col-span-6 bg-[#121212] border border-white/5 p-8 md:p-12 rounded-3xl flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-full bg-brand-accent/5 flex items-center justify-center mb-8 border border-white/10">
                <MapPin className="w-5 h-5 text-brand-accent" />
              </div>
              <h3 className="font-serif text-2xl mb-4 font-light text-white">The Ceremony</h3>
              <p className="font-sans text-sm text-white/70 mb-8 leading-relaxed font-light">
                Our promises will be spoken in the beautiful Lakeside Gardens of Villa Borghese, followed by a cocktail hour at sunset.
              </p>
            </div>
            <div className="space-y-4 border-t border-white/5 pt-6">
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
            className="md:col-span-6 bg-[#121212] border border-white/5 p-8 md:p-12 rounded-3xl flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-full bg-brand-accent/5 flex items-center justify-center mb-8 border border-white/10">
                <Clock className="w-5 h-5 text-brand-accent" />
              </div>
              <h3 className="font-serif text-2xl mb-4 font-light text-white">The Reception</h3>
              <p className="font-sans text-sm text-white/70 mb-8 leading-relaxed font-light">
                An evening of fine dining, laughter, and dance inside the Grand Hall, celebrating our first night as husband and wife.
              </p>
            </div>
            <div className="space-y-4 border-t border-white/5 pt-6">
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
            className="md:col-span-5 bg-[#121212] border border-white/5 p-8 md:p-12 rounded-3xl flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-full bg-brand-accent/5 flex items-center justify-center mb-8 border border-white/10">
                <Shirt className="w-5 h-5 text-brand-accent" />
              </div>
              <h3 className="font-serif text-2xl mb-4 font-light text-white">The Dress Code</h3>
              <p className="font-sans text-sm text-white/70 leading-relaxed font-light">
                Black Tie Formal. We kindly request that our guests dress in elegant, dark, or muted colors (e.g., black, forest green, deep navy, champagne, or rose gold).
              </p>
            </div>
          </motion.div>

          {/* Box 4: Interactive Google Map of Nantes Location */}
          <motion.div
            custom={3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardVariants}
            className="md:col-span-7 h-[45vh] md:h-auto rounded-3xl overflow-hidden relative border border-white/5"
          >
            <div className="w-full h-full min-h-[350px]" dangerouslySetInnerHTML={{ __html: mapIframe }} />
          </motion.div>

        </div>
      </div>
    </div>
  );
}
