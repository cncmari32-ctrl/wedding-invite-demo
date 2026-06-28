import { motion } from 'motion/react';

const scheduleData = [
  { time: "16:30", title: "Opening of the doors" },
  { time: "17:00", title: "Ceremony" },
  { time: "18:00", title: "Cocktail and dancing time" },
  { time: "20:00", title: "Dinner" },
  { time: "21:00", title: "Party and Open Bar" },
  { time: "23:00", title: "End of the celebration" }
];

export default function ScheduleEvents() {
  return (
    <div className="py-24 bg-tilda-bg px-6 max-w-3xl mx-auto">
      <div className="text-center mb-16">
        <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-tilda-accent mb-4 font-semibold">Timeline</p>
        <h3 className="font-serif text-3xl md:text-4xl text-tilda-text font-light">Schedule of Events</h3>
        <div className="w-12 h-[1px] bg-tilda-accent/30 mx-auto mt-6" />
      </div>

      <div className="space-y-6">
        {scheduleData.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: i * 0.05, duration: 0.6 }}
            className="flex items-center justify-between border-b border-tilda-accent/10 pb-4"
          >
            <span className="font-serif text-xl md:text-2xl font-light text-tilda-text">
              {item.title}
            </span>
            <span className="font-sans text-sm tracking-wider text-tilda-accent font-semibold">
              {item.time}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
