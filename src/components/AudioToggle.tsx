import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const ROMANTIC_TRACK_URL = "https://pub-4dc8201144ca418fb604349c73e8c724.r2.dev/Forever%20and%20Ever%20and%20Always%20(The%20Wedding%20Song)%20-%20Ryan%20Mack%20(1).mp3"; // Beautiful wedding track

export default function AudioToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(ROMANTIC_TRACK_URL);
    audio.loop = true;
    audio.volume = 0.45; // Subtle, elegant background volume
    audioRef.current = audio;

    return () => {
      audio.pause();
    };
  }, []);

  const togglePlayback = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => console.log("Audio play deferred until user gesture:", err));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <button
      onClick={togglePlayback}
      className="fixed bottom-6 right-6 z-50 p-4 bg-brand-light/90 border border-brand-accent/20 text-brand-dark rounded-full shadow-lg hover:scale-105 transition-all duration-300 backdrop-blur-md flex items-center justify-center group"
      aria-label={isPlaying ? "Mute Background Music" : "Play Background Music"}
    >
      {isPlaying ? (
        <Volume2 className="w-5 h-5 text-brand-accent animate-pulse" />
      ) : (
        <VolumeX className="w-5 h-5 text-brand-accent/60 group-hover:text-brand-accent" />
      )}
    </button>
  );
}
