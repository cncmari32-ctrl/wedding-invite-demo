import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const IMG_VENUE = `${import.meta.env.BASE_URL}assets/lake-venue.jpg`;
const IMG_DETAILS = `${import.meta.env.BASE_URL}assets/silk-texture.jpg`;

const DetailsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Parallax images
    gsap.utils.toArray('.img-parallax').forEach((img: any) => {
      gsap.to(img, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: img.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });

    // Fade up text blocks
    gsap.from(".reveal-block", {
      y: 60,
      opacity: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      }
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative z-20 bg-brand-dark pt-32 pb-48 px-6 md:px-12 lg:px-24">
      
      <div className="max-w-7xl mx-auto">
        
        {/* Bento/Editorial Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
          
          {/* Large Image Left */}
          <div className="md:col-span-7 h-[60vh] md:h-[80vh] overflow-hidden relative reveal-block">
             <div className="absolute inset-0 bg-brand-dark/20 z-10" />
             <img src={IMG_VENUE} alt="Villa" className="img-parallax w-full h-[120%] object-cover object-center absolute -top-[10%]" />
             <div className="absolute bottom-8 left-8 z-20">
               <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-white/70 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                 Villa Balbiano, Lake Como
               </p>
             </div>
          </div>

          {/* Text Content Right */}
          <div className="md:col-span-5 flex flex-col justify-center py-12 md:pl-8">
            <div className="reveal-block mb-16">
              <p className="font-sans text-brand-accent tracking-widest text-xs uppercase mb-6">The Date</p>
              <h2 className="font-serif text-5xl md:text-6xl leading-tight mb-2">Oct 24</h2>
              <h3 className="font-serif text-3xl md:text-4xl text-white/50 italic mb-8">Two Thousand Twenty Six</h3>
              <p className="font-sans text-sm text-white/70 leading-relaxed">
                Join us on the shores of Lake Como. Please arrive by 4:00 PM for a welcome drink. The ceremony will commence promptly at 4:30 PM.
              </p>
            </div>

            <div className="reveal-block space-y-8 border-t border-white/10 pt-12">
               <div className="grid grid-cols-[80px_1fr] gap-4">
                 <span className="font-sans text-xs uppercase tracking-widest text-brand-accent/70 pt-1">4:30 PM</span>
                 <div>
                   <h5 className="font-serif text-2xl mb-1">Ceremony</h5>
                   <p className="font-sans text-xs text-white/50 uppercase tracking-widest">The Lakeside Gardens</p>
                 </div>
               </div>
               
               <div className="grid grid-cols-[80px_1fr] gap-4">
                 <span className="font-sans text-xs uppercase tracking-widest text-brand-accent/70 pt-1">6:00 PM</span>
                 <div>
                   <h5 className="font-serif text-2xl mb-1">Aperitivo</h5>
                   <p className="font-sans text-xs text-white/50 uppercase tracking-widest">The Terrace</p>
                 </div>
               </div>

               <div className="grid grid-cols-[80px_1fr] gap-4">
                 <span className="font-sans text-xs uppercase tracking-widest text-brand-accent/70 pt-1">8:00 PM</span>
                 <div>
                   <h5 className="font-serif text-2xl mb-1">Dinner</h5>
                   <p className="font-sans text-xs text-white/50 uppercase tracking-widest">The Grand Hall</p>
                 </div>
               </div>
            </div>
          </div>

          {/* Text Content Left */}
          <div className="md:col-span-5 flex flex-col justify-center py-12 md:pr-8 md:mt-24 reveal-block">
            <h4 className="font-serif text-4xl mb-6">Dress Code</h4>
            <p className="font-sans text-sm text-white/70 leading-relaxed mb-6">
              Black Tie Formal. We request that guests wear dark, muted tones—black, charcoal, or deep emerald. Let the venue and the evening be the primary colors.
            </p>
            <div className="w-16 h-[1px] bg-brand-accent/30" />
          </div>

          {/* Small Image Right */}
          <div className="md:col-span-7 h-[50vh] md:h-[70vh] overflow-hidden relative md:mt-24 reveal-block">
             <div className="absolute inset-0 bg-brand-dark/20 z-10" />
             <img src={IMG_DETAILS} alt="Details" className="img-parallax w-full h-[120%] object-cover object-center absolute -top-[10%]" />
          </div>

        </div>
      </div>
    </div>
  );
};

export default DetailsSection;
