import { useState } from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

// Tilda Styled Custom Components
import TildaEnvelope from './components/TildaEnvelope';
import VideoBackground from './components/VideoBackground';
import HeroOverlay from './components/HeroOverlay';
import ScheduleEvents from './components/ScheduleEvents';
import VenueDressCode from './components/VenueDressCode';
import TildaGallery from './components/TildaGallery';
import RsvpModal from './components/RsvpModal';

// Interactive Extras
import AudioToggle from './components/AudioToggle';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [hasOpenedEnvelope, setHasOpenedEnvelope] = useState(false);
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);

  return (
    <main className="bg-[#f9f6f3] text-tilda-text min-h-screen relative selection:bg-tilda-accent/20">
      
      {/* 1. Vintage Envelope Intro Screen */}
      <TildaEnvelope onOpen={() => setHasOpenedEnvelope(true)} />

      {hasOpenedEnvelope && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* 2. Audio Control Toggle & Admin Key */}
          <AudioToggle />
          <AdminDashboard />

          {/* 3. Subtle Paper & Silk Parallax Background */}
          <VideoBackground />

          {/* 4. Hero Section with names & Scratch card */}
          <HeroOverlay />

          {/* Immersive Scrollable Sections */}
          <div className="relative z-10 max-w-5xl mx-auto space-y-16">
            
            {/* 5. Welcome Note Letter */}
            <section className="py-20 px-6 text-center space-y-8 max-w-2xl mx-auto">
              <div className="flex justify-center select-none">
                <Heart className="w-5 h-5 text-tilda-accent stroke-[1.2]" />
              </div>
              
              <h2 className="font-serif text-2xl text-tilda-accent italic">Dear friends and family,</h2>
              
              <p className="font-sans text-sm text-tilda-text/80 leading-relaxed font-light">
                As we get ready to say “I do,” we feel grateful for the wonderful people in our lives.
                <br /><br />
                Your support means the world to us, and we would be honored to have you with us as we begin our life together.
              </p>
              
              <div className="w-12 h-[1px] bg-tilda-accent/20 mx-auto pt-6" />
            </section>

            {/* 6. Timeline of the day */}
            <ScheduleEvents />

            {/* 7. Location & Dress code colors */}
            <VenueDressCode />

            {/* 8. Image Collage Grid */}
            <TildaGallery />

            {/* 9. Direct RSVP Action Bar */}
            <section className="py-24 text-center space-y-8 px-6">
              <div className="space-y-4">
                <h3 className="font-serif text-3xl font-light">Join Our Joy</h3>
                <p className="font-sans text-xs tracking-wider text-tilda-accent uppercase">
                  To help us prepare for a joyful celebration, kindly confirm your attendance.
                </p>
              </div>

              <button
                onClick={() => setIsRsvpOpen(true)}
                className="px-12 py-5 bg-brand-dark hover:bg-tilda-accent text-white hover:text-brand-dark font-sans text-xs uppercase tracking-[0.25em] rounded-full transition-all duration-500 shadow-md hover:shadow-lg hover:scale-105"
              >
                Confirm Your Attendance
              </button>
            </section>

            {/* 10. The Popup RSVP modal */}
            <RsvpModal isOpen={isRsvpOpen} onClose={() => setIsRsvpOpen(false)} />

            {/* Footer */}
            <footer className="py-20 text-center border-t border-tilda-accent/10">
              <div className="flex justify-center select-none mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 100 100" fill="none" stroke="#8d7a6b" strokeWidth="1">
                  <path d="M50 20 C40 40, 20 45, 50 80 C80 45, 60 40, 50 20 Z" />
                </svg>
              </div>
              <p className="font-serif text-3xl font-light text-tilda-text mb-4">Clara & Julian</p>
              <p className="font-sans text-[10px] uppercase tracking-widest text-tilda-accent/60">
                Hope to see you there!
              </p>
            </footer>

          </div>
        </motion.div>
      )}

    </main>
  );
}

export default App;
