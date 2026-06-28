import { useRef } from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

const timelineEvents = [
  {
    date: "August 2021",
    title: "How We Met",
    desc: "A chance meeting on a quiet summer afternoon in Paris. We spoke for hours, lost in conversation, realizing we shared a vision of the world that matched perfectly.",
    img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=600&auto=format&fit=crop"
  },
  {
    date: "December 2023",
    title: "The Proposal",
    desc: "Under a snowy mountain canopy in St. Moritz, surrounded by towering pines and candlelight, he asked and she joyfully accepted.",
    img: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=600&auto=format&fit=crop"
  },
  {
    date: "October 2026",
    title: "Our Forever",
    desc: "The beginning of our most beautiful adventure together, returning to our favorite place on earth—Lake Como—to make our promises official.",
    img: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600&auto=format&fit=crop"
  }
];

export default function StoryTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="py-32 bg-brand-light text-brand-dark px-6 md:px-12 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-24">
          <p className="font-sans text-[11px] uppercase tracking-[0.25em] text-brand-accent mb-6 font-semibold">
            Our Journey
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-dark tracking-tight leading-tight font-light">
            Our Love Story
          </h2>
          <div className="w-12 h-[1px] bg-brand-accent/30 mx-auto mt-8" />
        </div>

        {/* Timeline path */}
        <div className="relative space-y-24">
          {/* Vertical line connector (desktop only) */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-brand-accent/20 hidden md:block -translate-x-1/2" />

          {timelineEvents.map((event, i) => {
            const isEven = i % 2 === 0;
            return (
              <div 
                key={event.title}
                className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center relative"
              >
                {/* Timeline node */}
                <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border border-brand-accent/30 bg-brand-light flex items-center justify-center hidden md:flex z-10">
                  <Heart className="w-3.5 h-3.5 text-brand-accent stroke-[1.5]" />
                </div>

                {/* Left col - Image */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative overflow-hidden rounded-3xl h-[40vh] md:h-[50vh] ${isEven ? 'md:order-1' : 'md:order-2'}`}
                >
                  <img 
                    src={event.img} 
                    alt={event.title} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-brand-dark/10 pointer-events-none" />
                </motion.div>

                {/* Right col - Text */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  className={`space-y-6 ${isEven ? 'md:order-2 md:pl-12' : 'md:order-1 md:pr-12'}`}
                >
                  <span className="font-sans text-xs uppercase tracking-[0.2em] text-brand-accent font-semibold block">
                    {event.date}
                  </span>
                  <h3 className="font-serif text-3xl text-brand-dark font-light">
                    {event.title}
                  </h3>
                  <p className="font-sans text-sm text-brand-dark/70 leading-relaxed font-light">
                    {event.desc}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
