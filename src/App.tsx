
import CinematicCanvas from './components/CinematicCanvas';
import HeroOverlay from './components/HeroOverlay';
import DetailsSection from './components/DetailsSection';
import RSVPSection from './components/RSVPSection';

function App() {
  return (
    <main className="bg-brand-dark min-h-screen">
      {/* 
        The CinematicCanvas is pinned by GSAP.
        It sits fixed in the background while the user scrubs through the sequence.
      */}
      <div className="relative">
        <CinematicCanvas frameCount={100} />
        <HeroOverlay />
      </div>

      {/* 
        These sections scroll over the canvas organically after the canvas unpins,
        or they can have a solid background to cover it up.
      */}
      <div className="relative z-10 bg-brand-dark">
         <DetailsSection />
         <RSVPSection />
         
         <footer className="py-12 text-center border-t border-white/5">
           <p className="font-sans text-[10px] uppercase tracking-widest text-white/30">
             Sarah & John — 2026
           </p>
         </footer>
      </div>
    </main>
  );
}

export default App;
