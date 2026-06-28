import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "What is the dress code?",
    answer: "The dress code is Black Tie Formal. We kindly ask our guests to wear elegant, dark, or muted colors (e.g., black, forest green, deep navy, champagne, or rose gold). White, ivory, and cream are reserved for the bride."
  },
  {
    question: "Can I bring a plus one?",
    answer: "Due to the intimate nature of our venue, we can only accommodate guests who are formally named on the invitation. Please refer to your invitation or check your plus-one options in the RSVP form."
  },
  {
    question: "Are children allowed?",
    answer: "To allow all our guests, including parents, an evening of relaxation and unhindered celebration, we have chosen for our wedding to be an adult-only occasion."
  },
  {
    question: "Will transportation be provided?",
    answer: "Yes, we will provide guest shuttle services before the ceremony and after the reception between Villa Balbiano and major designated guest lodging hubs. Precise schedules will be shared closer to the date."
  },
  {
    question: "When should I RSVP by?",
    answer: "We kindly ask that you submit your RSVP responses by **August 1, 2026**, so we can finalize our dining and seating arrangements with our caterers."
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-32 bg-[#FAF9F5] text-brand-dark px-6 md:px-12 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-accent/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <p className="font-sans text-[11px] uppercase tracking-[0.25em] text-brand-accent mb-6 font-semibold">
            Common Questions
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-dark tracking-tight leading-tight font-light">
            Questions & Answers
          </h2>
          <div className="w-12 h-[1px] bg-brand-accent/30 mx-auto mt-8" />
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div 
                key={faq.question}
                className="bg-white border border-brand-accent/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-brand-accent/20 transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between gap-4 font-serif text-xl text-brand-dark focus:outline-none"
                >
                  <span className="font-light">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-brand-accent transition-transform duration-500 ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-8 pb-6 text-brand-dark/70 font-sans text-sm leading-relaxed border-t border-brand-accent/5 pt-4 font-light">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
