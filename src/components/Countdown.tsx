import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

const WEDDING_DATE = new Date("2026-10-24T16:30:00").getTime();

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = WEDDING_DATE - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds }
  ];

  return (
    <div className="py-24 bg-[#FAF9F5] border-y border-brand-accent/10 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-accent/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <p className="font-sans text-[11px] uppercase tracking-[0.25em] text-brand-accent mb-6 font-semibold">
          Count every moment
        </p>
        <h3 className="font-serif text-3xl md:text-4xl text-brand-dark mb-12 font-light">
          Until We Say "I Do"
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {timeUnits.map((unit, i) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="bg-white/80 border border-brand-accent/10 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-md hover:border-brand-accent/20 transition-all duration-300"
            >
              <div className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-dark font-light mb-2">
                {String(unit.value).padStart(2, '0')}
              </div>
              <div className="font-sans text-[10px] uppercase tracking-[0.2em] text-brand-accent/80">
                {unit.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
