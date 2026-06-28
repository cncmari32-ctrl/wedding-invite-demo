import { useState } from 'react';
import { motion } from 'motion/react';

// Custom Luxurious React Components
import TildaEnvelope from './components/TildaEnvelope';
import VideoBackground from './components/VideoBackground';
import FloatingPetals from './components/FloatingPetals';
import HeroOverlay from './components/HeroOverlay';
import Countdown from './components/Countdown';
import StoryTimeline from './components/StoryTimeline';
import EventDetails from './components/EventDetails';
import TravelAccommodations from './components/TravelAccommodations';
import WeddingGallery from './components/WeddingGallery';
import FaqSection from './components/FaqSection';
import RsvpForm from './components/RsvpForm';
import AdminDashboard from './components/AdminDashboard';
import PrintQR from './components/PrintQR';

function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash);
  const [hasOpened, setHasOpened] = useState(false);

  // Monitor URL hash changes (for our physical QR print template view)
  useState(() => {
    const onHashChange = () => {
      setCurrentHash(window.location.hash);
      window.scrollTo(0,0);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  });

  if (currentHash === '#/print') {
    return <PrintQR />;
  }

  return (
    <main className="bg-[#0a0a0a] text-[#FAF9F5] min-h-screen relative selection:bg-brand-accent/20">
      
      {/* 1. Luxurious React TildaEnvelope Entrance (Alexa & Richard) */}
      <TildaEnvelope onOpen={() => setHasOpened(true)} />

      {hasOpened && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* 2. Floating Petal Canvas Rain */}
          <FloatingPetals />

          {/* 3. Secure Admin Registry Access Dashboard (love2027) */}
          <AdminDashboard />

          {/* 4. Print QR card view trigger */}
          <a 
            href="#/print"
            className="fixed top-6 right-6 z-40 px-5 py-2.5 bg-black/40 backdrop-blur-xl border border-white/10 text-white font-sans text-[10px] uppercase tracking-[0.2em] rounded-full hover:bg-white hover:text-brand-dark transition-all duration-300 shadow-sm"
          >
            Print QR Studio
          </a>

          {/* 5. Custom-Generated Background Video Loop (Veo) */}
          <VideoBackground />

          {/* 6. Gorgeous Parallax Hero Overlay (Alexa & Richard) */}
          <HeroOverlay />

          {/* Immersive content sections */}
          <div className="relative z-10">
            
            {/* Countdown timer to September 14, 2027 */}
            <Countdown />

            {/* Timeless Story timeline */}
            <StoryTimeline />

            {/* Event Details Bento card styled grid with Google Map */}
            <EventDetails />

            {/* Lodgings and Transport guides */}
            <TravelAccommodations />

            {/* Image slide carousel */}
            <WeddingGallery />

            {/* Questions & Answers accordion */}
            <FaqSection />

            {/* Fully validated RSVP Form (LocalStorage registry + WhatsApp trigger) */}
            <RsvpForm />

            {/* Footer */}
            <footer className="bg-brand-dark py-16 text-center border-t border-white/5 relative z-20">
              <p className="font-serif text-3xl font-light text-brand-light mb-4">Alexa & Richard</p>
              <p className="font-sans text-[10px] uppercase tracking-widest text-brand-light/40 mb-2">
                Nantes, France
              </p>
              <p className="font-sans text-[9px] uppercase tracking-widest text-brand-light/20">
                © 2027 Alexa & Richard. All rights reserved.
              </p>
            </footer>

          </div>
        </motion.div>
      )}

    </main>
  );
}

export default App;
