import { useRef, useState } from "react";

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
      y: 50,
      opacity: 0,
      stagger: 0.1,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      }
    });
  }, { scope: containerRef });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format the message for WhatsApp
    // Replace this number with the couple's actual WhatsApp number
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
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div ref={containerRef} className="relative z-20 bg-brand-dark pb-48 px-6 md:px-12">
      <div className="max-w-2xl mx-auto text-center">
        
        <p className="rsvp-element font-sans text-brand-accent tracking-[0.3em] text-xs uppercase mb-6">
          Join Us
        </p>
        <h2 className="rsvp-element font-serif text-5xl md:text-7xl mb-12">
          Kindly RSVP
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8 text-left">
          
          <div className="rsvp-element relative border-b border-white/20 pb-2">
            <input 
              type="text" 
              required
              className="w-full bg-transparent font-serif text-2xl md:text-3xl focus:outline-none placeholder:text-white/20"
              placeholder="Your Full Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="rsvp-element space-y-4">
            <p className="font-sans text-xs uppercase tracking-widest text-white/50">Will you be joining us?</p>
            <div className="flex gap-6">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-4 h-4 rounded-full border border-white/30 flex items-center justify-center transition-colors ${formData.attending === 'yes' ? 'border-brand-accent' : ''}`}>
                  {formData.attending === 'yes' && <div className="w-2 h-2 rounded-full bg-brand-accent" />}
                </div>
                <span className="font-serif text-lg group-hover:text-brand-accent transition-colors">Joyfully Accept</span>
                <input type="radio" name="attending" value="yes" className="hidden" checked={formData.attending === 'yes'} onChange={(e) => setFormData({...formData, attending: e.target.value})} />
              </label>
              
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-4 h-4 rounded-full border border-white/30 flex items-center justify-center transition-colors ${formData.attending === 'no' ? 'border-brand-accent' : ''}`}>
                  {formData.attending === 'no' && <div className="w-2 h-2 rounded-full bg-brand-accent" />}
                </div>
                <span className="font-serif text-lg text-white/50 group-hover:text-white transition-colors">Regretfully Decline</span>
                <input type="radio" name="attending" value="no" className="hidden" checked={formData.attending === 'no'} onChange={(e) => setFormData({...formData, attending: e.target.value})} />
              </label>
            </div>
          </div>

          {formData.attending === 'yes' && (
            <>
              <div className="rsvp-element relative border-b border-white/20 pb-2 pt-6">
                <select 
                  className="w-full bg-transparent font-serif text-2xl md:text-3xl focus:outline-none appearance-none cursor-pointer"
                  value={formData.guests}
                  onChange={(e) => setFormData({...formData, guests: e.target.value})}
                >
                  <option value="1" className="bg-brand-dark text-lg">1 Guest (Just Me)</option>
                  <option value="2" className="bg-brand-dark text-lg">2 Guests</option>
                  <option value="3" className="bg-brand-dark text-lg">3 Guests</option>
                  <option value="4" className="bg-brand-dark text-lg">4 Guests</option>
                </select>
              </div>

              <div className="rsvp-element relative border-b border-white/20 pb-2 pt-6">
                <input 
                  type="text" 
                  className="w-full bg-transparent font-serif text-2xl focus:outline-none placeholder:text-white/20"
                  placeholder="Any dietary restrictions? (Optional)"
                  value={formData.dietary}
                  onChange={(e) => setFormData({...formData, dietary: e.target.value})}
                />
              </div>
            </>
          )}

          <div className="rsvp-element pt-12 flex justify-center">
            <button 
              type="submit"
              className="px-12 py-4 border border-brand-accent/50 text-brand-accent font-sans text-xs uppercase tracking-[0.2em] hover:bg-brand-accent hover:text-brand-dark transition-all duration-300"
            >
              Send via WhatsApp
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default RSVPSection;
