import { useState } from 'react';
import VideoBackground from './components/VideoBackground';
import HeroOverlay from './components/HeroOverlay';
import PrintQR from './components/PrintQR';

// Luxurious New Interactive Components
import CinematicIntro from './components/CinematicIntro';
import FloatingPetals from './components/FloatingPetals';
import AudioToggle from './components/AudioToggle';
import Countdown from './components/Countdown';
import StoryTimeline from './components/StoryTimeline';
import EventDetails from './components/EventDetails';
import TravelAccommodations from './components/TravelAccommodations';
import WeddingGallery from './components/WeddingGallery';
import FaqSection from './components/FaqSection';
import RsvpForm from './components/RsvpForm';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash);
  const [hasEntered, setHasEntered] = useState(false);

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
    <main className="bg-[#FAF9F5] text-brand-dark min-h-screen relative selection:bg-brand-accent/20">
      
      {/* 1. Cinematic Intro Screen */}
      <CinematicIntro onEnter={() => setHasEntered(true)} />

      {hasEntered && (
        <>
          {/* 2. Delicate Canvas Petal Rain */}
          <FloatingPetals />

          {/* 3. Ambient Wedding Audio Toggle */}
          <AudioToggle />

          {/* 4. Guest RSVP Management Dashboard */}
          <AdminDashboard />

          {/* 5. Unique QR Studio Access (For template owners) */}
          <a 
            href="#/print"
            className="fixed top-6 right-6 z-40 px-5 py-2.5 bg-white/80 backdrop-blur-md border border-brand-accent/20 text-brand-dark font-sans text-[10px] uppercase tracking-[0.2em] rounded-full hover:bg-brand-dark hover:text-white transition-all duration-300 shadow-sm"
          >
            Print QR Studio
          </a>

          {/* 6. Cinematic Background Video Loop (Veo generated) */}
          <VideoBackground />

          {/* 7. Hero section with parallax titles */}
          <HeroOverlay />

          {/* Immersive Scrollable Sections */}
          <div className="relative z-10">
            
            {/* The Countdown timer */}
            <Countdown />

            {/* Our Story section */}
            <StoryTimeline />

            {/* Details Grid (Bento style) */}
            <EventDetails />

            {/* Travel and Lodging guides */}
            <TravelAccommodations />

            {/* Premium slideshow carousel */}
            <WeddingGallery />

            {/* Common FAQ accordion */}
            <FaqSection />

            {/* Beautiful validated Guest RSVP Form */}
            <RsvpForm />

            {/* Footer with copyright */}
            <footer className="bg-brand-light py-16 text-center border-t border-brand-accent/10 relative z-20">
              <p className="font-serif text-3xl font-light text-brand-dark mb-4">Sarah & John</p>
              <p className="font-sans text-[10px] uppercase tracking-widest text-brand-dark/40 mb-2">
                Villa Balbiano, Lake Como, Italy
              </p>
              <p className="font-sans text-[9px] uppercase tracking-widest text-brand-dark/20">
                © 2026 Sarah & John. All rights reserved.
              </p>
            </footer>
          </div>
        </>
      )}
    </main>
  );
}

export default App;
