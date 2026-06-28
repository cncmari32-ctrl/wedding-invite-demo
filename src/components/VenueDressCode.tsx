import { motion } from 'motion/react';
import { MapPin, Sparkles } from 'lucide-react';

const dressCodeColors = [
  { name: "Slate Grey", hex: "#7a828a" },
  { name: "Dusty Blue", hex: "#a1b1c6" },
  { name: "Warm Brown", hex: "#9b8577" },
  { name: "Champagne Beige", hex: "#e7d9c9" },
  { name: "Blush Pastel", hex: "#eed1ca" }
];

export default function VenueDressCode() {
  return (
    <div className="py-24 bg-tilda-bg px-6 max-w-4xl mx-auto space-y-24">
      
      {/* Venue card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center bg-[#FAF9F5] border border-tilda-accent/10 p-8 md:p-12 rounded-3xl"
      >
        <div className="w-10 h-10 rounded-full bg-tilda-accent/5 flex items-center justify-center border border-tilda-accent/15 mx-auto mb-6">
          <MapPin className="w-5 h-5 text-tilda-accent" />
        </div>
        <h3 className="font-serif text-3xl font-light text-tilda-text mb-2">Wedding Venue</h3>
        <p className="font-serif text-xl text-tilda-accent italic mb-6">Villa Borghese</p>
        <p className="font-sans text-xs uppercase tracking-widest text-tilda-text/50">
          Address: Puerto Vallarta, MX
        </p>
      </motion.div>

      {/* Dress Code Section */}
      <div className="text-center space-y-12">
        <div className="space-y-4">
          <div className="w-10 h-10 rounded-full bg-tilda-accent/5 flex items-center justify-center border border-tilda-accent/15 mx-auto mb-6">
            <Sparkles className="w-5 h-5 text-tilda-accent" />
          </div>
          <h3 className="font-serif text-3xl font-light text-tilda-text">Dress Code</h3>
          <p className="font-sans text-sm text-tilda-text/70 max-w-xl mx-auto leading-relaxed font-light">
            We would be very happy if your outfit is in the colors of the wedding theme:
          </p>
        </div>

        {/* Color Swatches */}
        <div className="flex flex-wrap justify-center gap-6">
          {dressCodeColors.map((color, i) => (
            <motion.div
              key={color.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className="flex flex-col items-center gap-2"
            >
              <div 
                className="w-14 h-14 rounded-full shadow-inner border border-black/5 hover:scale-105 transition-transform duration-300"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
              <span className="font-sans text-[10px] tracking-wider text-tilda-text/50 uppercase">{color.name}</span>
            </motion.div>
          ))}
        </div>

        {/* Detailed Gender Guidelines */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto text-left border-t border-tilda-accent/10 pt-12">
          <div className="space-y-3">
            <h4 className="font-serif text-xl text-tilda-text">Ladies</h4>
            <p className="font-sans text-xs text-tilda-text/60 leading-relaxed font-light">
              Elegant summer dresses in pastel tones. We recommend bringing a hat and sunglasses for outdoor terrace comfort.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-serif text-xl text-tilda-text">Gentlemen</h4>
            <p className="font-sans text-xs text-tilda-text/60 leading-relaxed font-light">
              Suits or shirts in classic shades. Grey, blue, brown, and beige are perfect choices for the evening!
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
