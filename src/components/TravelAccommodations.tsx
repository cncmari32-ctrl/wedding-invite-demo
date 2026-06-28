import { useRef } from 'react';
import { motion } from 'motion/react';
import { Plane, Hotel, Car } from 'lucide-react';

const accommodations = [
  {
    name: "Grand Hotel Tremezzo",
    type: "Luxury Resort",
    desc: "A stunning historic landmark with panoramic lake views and world-class pools. Located 15 minutes from the wedding venue.",
    link: "https://www.grandhoteltremezzo.com/"
  },
  {
    name: "Sheraton Lake Como Hotel",
    type: "Contemporary Comfort",
    desc: "Set within a beautiful private park, offering spacious rooms and modern amenities. A 25-minute drive from the wedding venue.",
    link: "https://www.marriott.com/"
  }
];

export default function TravelAccommodations() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="py-32 bg-[#FAF9F5] text-brand-dark px-6 md:px-12 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-accent/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <p className="font-sans text-[11px] uppercase tracking-[0.25em] text-brand-accent mb-6 font-semibold">
            Plan your stay
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-dark tracking-tight leading-tight font-light">
            Travel & Lodging
          </h2>
          <div className="w-12 h-[1px] bg-brand-accent/30 mx-auto mt-8" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Transport & Air Travel Column */}
          <div className="lg:col-span-5 space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-accent/5 flex items-center justify-center border border-brand-accent/15">
                  <Plane className="w-4 h-4 text-brand-accent" />
                </div>
                <h3 className="font-serif text-2xl font-light">By Air</h3>
              </div>
              <p className="font-sans text-sm text-brand-dark/70 leading-relaxed font-light">
                The closest major international airports are **Milan Malpensa (MXP)** and **Milan Linate (LIN)**. Both airports are approximately an hour and fifteen minutes by car from Lake Como.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-accent/5 flex items-center justify-center border border-brand-accent/15">
                  <Car className="w-4 h-4 text-brand-accent" />
                </div>
                <h3 className="font-serif text-2xl font-light">Ground Transport</h3>
              </div>
              <p className="font-sans text-sm text-brand-dark/70 leading-relaxed font-light">
                We will be providing complimentary guest shuttle transport to and from the wedding venue (Villa Balbiano) from major hotel hubs in Tremezzo and Como. Private driver details can also be arranged.
              </p>
            </motion.div>
          </div>

          {/* Accommodations suggestions Column */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-brand-accent/5 flex items-center justify-center border border-brand-accent/15">
                <Hotel className="w-4 h-4 text-brand-accent" />
              </div>
              <h3 className="font-serif text-2xl font-light">Hotel Suggestions</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {accommodations.map((hotel, i) => (
                <motion.div
                  key={hotel.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className="bg-white p-8 rounded-3xl border border-brand-accent/10 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300"
                >
                  <div>
                    <span className="font-sans text-[9px] uppercase tracking-widest text-brand-accent font-semibold block mb-2">
                      {hotel.type}
                    </span>
                    <h4 className="font-serif text-xl mb-3 text-brand-dark font-light">{hotel.name}</h4>
                    <p className="font-sans text-xs text-brand-dark/60 leading-relaxed font-light mb-6">
                      {hotel.desc}
                    </p>
                  </div>
                  <a 
                    href={hotel.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-sans text-[10px] uppercase tracking-widest border-b border-brand-accent/20 pb-1 hover:border-brand-accent text-brand-accent hover:text-brand-dark transition-colors"
                  >
                    Visit Website
                  </a>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
