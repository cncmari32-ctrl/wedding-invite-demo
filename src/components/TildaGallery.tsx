import { motion } from 'motion/react';

const galleryPhotos = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1520854221256-17451cc350db?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600&auto=format&fit=crop"
];

export default function TildaGallery() {
  return (
    <div className="py-24 bg-tilda-bg px-6 max-w-5xl mx-auto space-y-12">
      <div className="text-center mb-16">
        <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-tilda-accent mb-4 font-semibold">Moments</p>
        <h3 className="font-serif text-3xl md:text-4xl text-tilda-text font-light">Captured Moments</h3>
        <div className="w-12 h-[1px] bg-tilda-accent/30 mx-auto mt-6" />
      </div>

      {/* Grid collage matching Tilda template */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Large center */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8 }}
          className="md:col-span-8 h-[50vh] overflow-hidden rounded-3xl relative border border-tilda-accent/10 shadow-sm"
        >
          <img src={galleryPhotos[0]} alt="Couple 1" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
        </motion.div>

        {/* Small vertical right */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="md:col-span-4 h-[50vh] overflow-hidden rounded-3xl relative border border-tilda-accent/10 shadow-sm"
        >
          <img src={galleryPhotos[1]} alt="Couple 2" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
        </motion.div>

        {/* Three equal columns underneath */}
        {galleryPhotos.slice(2).map((url, index) => (
          <motion.div
            key={url}
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="md:col-span-4 h-[35vh] overflow-hidden rounded-3xl relative border border-tilda-accent/10 shadow-sm"
          >
            <img src={url} alt={`Couple ${index + 3}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
