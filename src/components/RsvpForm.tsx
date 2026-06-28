import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle } from 'lucide-react';

interface RsvpData {
  id: string;
  name: string;
  attending: 'yes' | 'no';
  plusOne: 'yes' | 'no';
  meal: 'beef' | 'fish' | 'vegan';
  dietary: string;
  message: string;
  submittedAt: string;
}

export default function RsvpForm() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<Omit<RsvpData, 'id' | 'submittedAt'>>({
    name: '',
    attending: 'yes',
    plusOne: 'no',
    meal: 'beef',
    dietary: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim()) {
      setError('Please provide your full name.');
      return;
    }

    try {
      // 1. Compile the guest entry
      const rsvpEntry: RsvpData = {
        id: Math.random().toString(36).substring(2, 9),
        ...formData,
        submittedAt: new Date().toLocaleString()
      };

      // 2. Write to LocalStorage database
      const existingRsvps = localStorage.getItem('wedding_rsvps');
      const rsvpsList: RsvpData[] = existingRsvps ? JSON.parse(existingRsvps) : [];
      rsvpsList.push(rsvpEntry);
      localStorage.setItem('wedding_rsvps', JSON.stringify(rsvpsList));

      // 3. Show success state
      setIsSubmitted(true);

      // 4. Optionally, trigger a redirect to WhatsApp for immediate couple notice
      const couplePhoneNumber = "1234567890";
      let text = `*RSVP for Sarah & John's Wedding*%0A%0A`;
      text += `*Guest:* ${formData.name}%0A`;
      text += `*Attending:* ${formData.attending === 'yes' ? 'Accepts with joy' : 'Declines with regret'}%0A`;
      
      if (formData.attending === 'yes') {
        text += `*Plus One:* ${formData.plusOne === 'yes' ? 'Yes' : 'No'}%0A`;
        text += `*Meal Choice:* ${formData.meal.toUpperCase()}%0A`;
        if (formData.dietary) {
          text += `*Dietary:* ${formData.dietary}%0A`;
        }
      }
      if (formData.message) {
        text += `*Message:* ${formData.message}%0A`;
      }

      // We'll open WhatsApp in a new tab so they get immediate direct notification, but the site confirms successfully regardless
      const whatsappUrl = `https://wa.me/${couplePhoneNumber}?text=${text}`;
      setTimeout(() => {
         window.open(whatsappUrl, '_blank');
      }, 1500);

    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div ref={containerRef} id="rsvp" className="relative z-20 bg-brand-light py-32 px-6 md:px-12 border-t border-brand-accent/5">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-accent/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative">
        <div className="text-center mb-16">
          <p className="font-sans text-[11px] uppercase tracking-[0.25em] text-brand-accent mb-6 font-semibold">
            Be our guest
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-dark tracking-tight leading-tight font-light">
            Kindly RSVP
          </h2>
          <div className="w-12 h-[1px] bg-brand-accent/30 mx-auto mt-8" />
        </div>

        {/* Dynamic State view */}
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="rsvp-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white border border-brand-accent/10 p-8 md:p-16 rounded-3xl shadow-sm relative z-10"
            >
              {error && (
                <div className="mb-8 p-4 bg-red-50 border border-red-100 text-red-700 font-sans text-xs rounded-xl">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-12">
                {/* Name */}
                <div className="relative border-b border-brand-accent/20 pb-4">
                  <label className="font-sans text-[10px] uppercase tracking-[0.2em] text-brand-accent/80 block mb-2 font-semibold">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-transparent font-serif text-2xl md:text-3xl focus:outline-none placeholder:text-brand-accent/20 text-brand-dark"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                {/* Attendance */}
                <div className="space-y-4">
                  <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-brand-accent/80 block mb-2 font-semibold">
                    Will you be joining us?
                  </span>
                  <div className="flex flex-col sm:flex-row gap-6">
                    <label className="flex items-center gap-4 cursor-pointer group">
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${formData.attending === 'yes' ? 'border-brand-accent bg-brand-accent/5' : 'border-brand-accent/20'}`}>
                        {formData.attending === 'yes' && <div className="w-2.5 h-2.5 rounded-full bg-brand-accent" />}
                      </div>
                      <span className="font-serif text-xl text-brand-dark group-hover:text-brand-accent transition-colors">Joyfully Accept</span>
                      <input type="radio" name="attending" value="yes" className="hidden" checked={formData.attending === 'yes'} onChange={() => setFormData({ ...formData, attending: 'yes' })} />
                    </label>

                    <label className="flex items-center gap-4 cursor-pointer group">
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${formData.attending === 'no' ? 'border-brand-accent bg-brand-accent/5' : 'border-brand-accent/20'}`}>
                        {formData.attending === 'no' && <div className="w-2.5 h-2.5 rounded-full bg-brand-accent" />}
                      </div>
                      <span className="font-serif text-xl text-brand-dark/50 group-hover:text-brand-dark transition-colors">Regretfully Decline</span>
                      <input type="radio" name="attending" value="no" className="hidden" checked={formData.attending === 'no'} onChange={() => setFormData({ ...formData, attending: 'no' })} />
                    </label>
                  </div>
                </div>

                {/* Conditional fields if attending */}
                {formData.attending === 'yes' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-12 overflow-hidden"
                  >
                    {/* Plus One */}
                    <div className="space-y-4">
                      <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-brand-accent/80 block mb-2 font-semibold">
                        Do you require a plus-one option?
                      </span>
                      <div className="flex gap-6">
                        <label className="flex items-center gap-3 cursor-pointer group">
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${formData.plusOne === 'yes' ? 'border-brand-accent bg-brand-accent/5' : 'border-brand-accent/20'}`}>
                            {formData.plusOne === 'yes' && <div className="w-2 h-2 rounded-full bg-brand-accent" />}
                          </div>
                          <span className="font-sans text-sm text-brand-dark">Yes, plus-one needed</span>
                          <input type="radio" name="plusOne" value="yes" className="hidden" checked={formData.plusOne === 'yes'} onChange={() => setFormData({ ...formData, plusOne: 'yes' })} />
                        </label>

                        <label className="flex items-center gap-3 cursor-pointer group">
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${formData.plusOne === 'no' ? 'border-brand-accent bg-brand-accent/5' : 'border-brand-accent/20'}`}>
                            {formData.plusOne === 'no' && <div className="w-2 h-2 rounded-full bg-brand-accent" />}
                          </div>
                          <span className="font-sans text-sm text-brand-dark/50">No plus-one</span>
                          <input type="radio" name="plusOne" value="no" className="hidden" checked={formData.plusOne === 'no'} onChange={() => setFormData({ ...formData, plusOne: 'no' })} />
                        </label>
                      </div>
                    </div>

                    {/* Meal Preference */}
                    <div className="space-y-4">
                      <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-brand-accent/80 block mb-2 font-semibold">
                        Select your meal choice
                      </span>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {['beef', 'fish', 'vegan'].map((mealOption) => (
                          <label key={mealOption} className={`border p-5 rounded-2xl cursor-pointer flex flex-col justify-between hover:border-brand-accent transition-all duration-300 ${formData.meal === mealOption ? 'border-brand-accent bg-brand-accent/3' : 'border-brand-accent/10'}`}>
                            <span className="font-serif text-lg text-brand-dark uppercase tracking-wide">{mealOption}</span>
                            <span className="font-sans text-[10px] text-brand-dark/50 mt-1 capitalize">{mealOption} entrée course</span>
                            <input type="radio" name="meal" value={mealOption} className="hidden" checked={formData.meal === mealOption} onChange={() => setFormData({ ...formData, meal: mealOption as any })} />
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Dietary Restrictions */}
                    <div className="relative border-b border-brand-accent/20 pb-4">
                      <label className="font-sans text-[10px] uppercase tracking-[0.2em] text-brand-accent/80 block mb-2 font-semibold">
                        Dietary Restrictions (Optional)
                      </label>
                      <input
                        type="text"
                        className="w-full bg-transparent font-serif text-xl focus:outline-none placeholder:text-brand-accent/20 text-brand-dark"
                        placeholder="Gluten-free, allergies, etc."
                        value={formData.dietary}
                        onChange={(e) => setFormData({ ...formData, dietary: e.target.value })}
                      />
                    </div>
                  </motion.div>
                )}

                {/* Optional Message */}
                <div className="relative border-b border-brand-accent/20 pb-4">
                  <label className="font-sans text-[10px] uppercase tracking-[0.2em] text-brand-accent/80 block mb-2 font-semibold">
                    Message to the Couple (Optional)
                  </label>
                  <textarea
                    rows={1}
                    className="w-full bg-transparent font-serif text-xl focus:outline-none placeholder:text-brand-accent/20 text-brand-dark resize-none"
                    placeholder="Leave a lovely note..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <div className="pt-8 flex justify-center">
                  <button
                    type="submit"
                    className="px-12 py-5 bg-brand-dark hover:bg-brand-accent text-white hover:text-brand-dark font-sans text-xs uppercase tracking-[0.25em] rounded-full transition-all duration-500 shadow-lg hover:shadow-xl w-full sm:w-auto"
                  >
                    Submit RSVP Invitation
                  </button>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success-card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white border border-brand-accent/10 p-12 md:p-24 rounded-3xl shadow-sm text-center relative z-10 space-y-6 max-w-xl mx-auto"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-emerald-500 stroke-[1.5]" />
              </div>
              <h3 className="font-serif text-3xl font-light text-brand-dark">Thank You</h3>
              <p className="font-sans text-sm text-brand-dark/70 leading-relaxed font-light">
                Your RSVP response has been successfully saved to our guest list registry. We can't wait to celebrate our special day with you!
              </p>
              <div className="pt-6">
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-8 py-3 bg-brand-light text-brand-accent border border-brand-accent/20 font-sans text-xs uppercase tracking-widest rounded-full hover:bg-brand-dark hover:text-white hover:border-transparent transition-all duration-300"
                >
                  Edit Response
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
