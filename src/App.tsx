import { useState, useEffect } from 'react';
import VideoBackground from './components/VideoBackground';
import HeroOverlay from './components/HeroOverlay';
import DetailsSection from './components/DetailsSection';
import RSVPSection from './components/RSVPSection';
import PrintQR from './components/PrintQR';

function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  useEffect(() => {
    const onHashChange = () => {
      setCurrentHash(window.location.hash);
      window.scrollTo(0,0);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  if (currentHash === '#/print') {
    return <PrintQR />;
  }

  return (
    <main className="bg-brand-dark min-h-screen">
      {/* Absolute QR Print Button for the template owner */}
      <a 
        href="#/print"
        className="fixed top-6 right-6 z-50 px-5 py-2.5 bg-black/20 backdrop-blur-xl border border-white/10 text-white font-sans text-[10px] uppercase tracking-[0.2em] rounded-full hover:bg-white hover:text-brand-dark transition-all duration-300"
      >
        Get QR Code
      </a>

      {/* The new high-end video background */}
      <VideoBackground />

      {/* The elegant hero text that scrolls over the video */}
      <HeroOverlay />

      {/* Content sections with premium Bento layouts */}
      <div className="relative z-10">
         <DetailsSection />
         <RSVPSection />
         
         <footer className="bg-brand-dark py-16 text-center border-t border-white/5 relative z-20">
           <p className="font-sans text-[10px] uppercase tracking-widest text-white/30">
             Sarah & John — 2026
           </p>
         </footer>
      </div>
    </main>
  );
}

export default App;
