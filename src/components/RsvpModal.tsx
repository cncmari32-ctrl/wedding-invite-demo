import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle } from 'lucide-react';

interface RsvpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RsvpModal({ isOpen, onClose }: RsvpModalProps) {
  const [name, setName] = useState('');
  const [attending, setAttending] = useState<'yes' | 'no' | 'later'>('yes');
  const [intolerance, setDietary] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }

    try {
      // 1. Log to LocalStorage registry
      const guestRsvp = {
        id: Math.random().toString(36).substring(2, 9),
        name,
        attending,
        meal: 'beef', // default mock
        plusOne: 'no',
        dietary: intolerance,
        message: 'Tilda RSVP',
        submittedAt: new Date().toLocaleString()
      };

      const existing = localStorage.getItem('wedding_rsvps');
      const list = existing ? JSON.parse(existing) : [];
      list.push(guestRsvp);
      localStorage.setItem('wedding_rsvps', JSON.stringify(list));

      // 2. Set submitted
      setIsSubmitted(true);

      // 3. WhatsApp Redirect
      const phoneNumber = "1234567890";
      let text = `*RSVP for Alexa & Richard's Wedding*%0A%0A`;
      text += `*Guest:* ${name}%0A`;
      
      let statusText = 'Accepts with joy';
      if (attending === 'no') statusText = 'Declines with regret';
      if (attending === 'later') statusText = 'Will decide later';
      
      text += `*Will you come:* ${statusText}%0A`;
      if (intolerance.trim()) {
        text += `*Food Intolerances:* ${intolerance}%0A`;
      }

      setTimeout(() => {
        window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank');
      }, 1500);

    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-brand-dark/50 backdrop-blur-sm flex items-center justify-center p-4"
        >
          {/* Backdrop Click close */}
          <div className="absolute inset-0" onClick={onClose} />

          <motion.div
            initial={{ scale: 0.95, y: 15 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 15 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white border border-tilda-accent/20 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative z-10 text-tilda-text p-8 md:p-12"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-tilda-text/50 hover:text-tilda-text hover:bg-tilda-accent/5 rounded-full transition-all"
              aria-label="Close form"
            >
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="text-center space-y-2">
                  <h3 className="font-serif text-3xl font-light">Confirm Your Attendance!</h3>
                  <p className="font-sans text-xs tracking-wider text-tilda-accent uppercase">
                    Please RSVP before September 30
                  </p>
                </div>

                {error && (
                  <div className="p-3 bg-red-50 border border-red-100 text-red-700 font-sans text-xs rounded-xl">
                    {error}
                  </div>
                )}

                {/* Name */}
                <div className="relative border-b border-tilda-accent/20 pb-2">
                  <label className="font-sans text-[10px] uppercase tracking-[0.2em] text-tilda-accent font-semibold block mb-2">
                    Your name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-transparent font-serif text-xl focus:outline-none placeholder:text-tilda-accent/20 text-tilda-text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                {/* Will you come */}
                <div className="space-y-4">
                  <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-tilda-accent font-semibold block mb-2">
                    Will you come?
                  </span>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${attending === 'yes' ? 'border-tilda-accent bg-tilda-accent/5' : 'border-tilda-accent/20'}`}>
                        {attending === 'yes' && <div className="w-2 h-2 rounded-full bg-tilda-accent" />}
                      </div>
                      <span className="font-sans text-sm text-tilda-text group-hover:text-tilda-accent transition-colors">Yes, I will</span>
                      <input type="radio" name="attending" value="yes" className="hidden" checked={attending === 'yes'} onChange={() => setAttending('yes')} />
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${attending === 'no' ? 'border-tilda-accent bg-tilda-accent/5' : 'border-tilda-accent/20'}`}>
                        {attending === 'no' && <div className="w-2 h-2 rounded-full bg-tilda-accent" />}
                      </div>
                      <span className="font-sans text-sm text-tilda-text group-hover:text-tilda-accent transition-colors">Unfortunately, I can't :(</span>
                      <input type="radio" name="attending" value="no" className="hidden" checked={attending === 'no'} onChange={() => setAttending('no')} />
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${attending === 'later' ? 'border-tilda-accent bg-tilda-accent/5' : 'border-tilda-accent/20'}`}>
                        {attending === 'later' && <div className="w-2 h-2 rounded-full bg-tilda-accent" />}
                      </div>
                      <span className="font-sans text-sm text-tilda-text group-hover:text-tilda-accent transition-colors">I'll tell you a bit later</span>
                      <input type="radio" name="attending" value="later" className="hidden" checked={attending === 'later'} onChange={() => setAttending('later')} />
                    </label>
                  </div>
                </div>

                {/* Dietary */}
                <div className="relative border-b border-tilda-accent/20 pb-2">
                  <label className="font-sans text-[10px] uppercase tracking-[0.2em] text-tilda-accent font-semibold block mb-2">
                    Do you have any food intolerances?
                  </label>
                  <input
                    type="text"
                    className="w-full bg-transparent font-serif text-xl focus:outline-none placeholder:text-tilda-accent/20 text-tilda-text"
                    placeholder="None / Glutes, nuts, etc."
                    value={intolerance}
                    onChange={(e) => setDietary(e.target.value)}
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-4 bg-brand-dark hover:bg-tilda-accent text-white hover:text-brand-dark rounded-full font-sans text-xs uppercase tracking-widest transition-all duration-500 shadow-md"
                  >
                    Submit Response
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center space-y-6 py-6">
                <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6 text-emerald-500 stroke-[1.5]" />
                </div>
                <h3 className="font-serif text-2xl font-light">Response Submitted!</h3>
                <p className="font-sans text-sm text-tilda-text/70 leading-relaxed font-light">
                  Thank you! Your response was recorded and prefilled to WhatsApp message format for direct notification.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      onClose();
                    }}
                    className="px-6 py-2 border border-tilda-accent/20 text-tilda-accent font-sans text-xs uppercase tracking-wider rounded-full hover:bg-tilda-accent hover:text-white transition-all"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
