import { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const RSVPSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    attending: 'yes',
    guests: '1',
    dietary: ''
  });

  useGSAP(() => {
    gsap.from(".rsvp-element", {
      y: 40,
      opacity: 0,
      stagger: 0.1,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      }
    });
  }, { scope: containerRef });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phoneNumber = "1234567890"; 
    let message = `*RSVP for Sarah & John's Wedding*%0A%0A`;
    message += `*Name:* ${formData.name}%0A`;
    message += `*Attending:* ${formData.attending === 'yes' ? 'Joyfully Accepts' : 'Regretfully Declines'}%0A`;
    if (formData.attending === 'yes') {
      message += `*Number of Guests:* ${formData.guests}%0A`;
      if (formData.dietary) {
        message += `*Dietary Restrictions:* ${formData.dietary}%0A`;
      }
    }
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div ref={containerRef} className="relative z-20 bg-brand-dark py-32 px-6 md:px-12 border-t border-white/5">
      
      {/* Background Accent glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative">
        <div className="text-center mb-16">
          <p className="rsvp-element font-sans text-brand-accent tracking-[0.4em] text-xs uppercase mb-6">
            Join Us
          </p>
          <h2 className="rsvp-element font-serif text-5xl md:text-7xl">
            Kindly RSVP
          </h2>
        </div>

        {/* Frosted Glass Form Container */}
        <div className="rsvp-element bg-white/[0.02] backdrop-blur-xl border border-white/10 p-8 md:p-16 rounded-3xl">
          <form onSubmit={handleSubmit} className="space-y-12">
            
            <div className="relative border-b border-white/20 pb-4">
              <input 
                type="text" 
                required
                className="w-full bg-transparent font-serif text-2xl md:text-4xl focus:outline-none placeholder:text-white/20 text-white"
                placeholder="Your Full Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div className="space-y-6">
              <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/40">Will you be joining us?</p>
              <div className="flex flex-col sm:flex-row gap-6">
                <label className="flex items-center gap-4 cursor-pointer group">
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${formData.attending === 'yes' ? 'border-brand-accent bg-brand-accent/10' : 'border-white/30'}`}>
                    {formData.attending === 'yes' && <div className="w-2.5 h-2.5 rounded-full bg-brand-accent" />}
                  </div>
                  <span className="font-serif text-2xl group-hover:text-brand-accent transition-colors">Joyfully Accept</span>
                  <input type="radio" name="attending" value="yes" className="hidden" checked={formData.attending === 'yes'} onChange={(e) => setFormData({...formData, attending: e.target.value})} />
                </label>
                
                <label className="flex items-center gap-4 cursor-pointer group">
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${formData.attending === 'no' ? 'border-brand-accent bg-brand-accent/10' : 'border-white/30'}`}>
                    {formData.attending === 'no' && <div className="w-2.5 h-2.5 rounded-full bg-brand-accent" />}
                  </div>
                  <span className="font-serif text-2xl text-white/50 group-hover:text-white transition-colors">Regretfully Decline</span>
                  <input type="radio" name="attending" value="no" className="hidden" checked={formData.attending === 'no'} onChange={(e) => setFormData({...formData, attending: e.target.value})} />
                </label>
              </div>
            </div>

            {formData.attending === 'yes' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="relative border-b border-white/20 pb-4">
                  <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2">Guests</p>
                  <select 
                    className="w-full bg-transparent font-serif text-2xl focus:outline-none appearance-none cursor-pointer text-white"
                    value={formData.guests}
                    onChange={(e) => setFormData({...formData, guests: e.target.value})}
                  >
                    <option value="1" className="bg-brand-dark">1 Guest (Just Me)</option>
                    <option value="2" className="bg-brand-dark">2 Guests</option>
                    <option value="3" className="bg-brand-dark">3 Guests</option>
                    <option value="4" className="bg-brand-dark">4 Guests</option>
                  </select>
                </div>

                <div className="relative border-b border-white/20 pb-4">
                  <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2">Dietary</p>
                  <input 
                    type="text" 
                    className="w-full bg-transparent font-serif text-2xl focus:outline-none placeholder:text-white/20 text-white"
                    placeholder="None"
                    value={formData.dietary}
                    onChange={(e) => setFormData({...formData, dietary: e.target.value})}
                  />
                </div>
              </div>
            )}

            <div className="pt-8 flex justify-center md:justify-end">
              <button 
                type="submit"
                className="px-12 py-5 bg-white text-brand-dark font-sans text-xs font-medium uppercase tracking-[0.2em] hover:bg-brand-accent transition-all duration-300 rounded-full w-full md:w-auto"
              >
                Send via WhatsApp
              </button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default RSVPSection;
