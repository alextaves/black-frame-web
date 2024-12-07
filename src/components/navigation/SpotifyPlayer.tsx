'use client';

import { useState, useEffect } from 'react';

export default function SpotifyPlayer() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  
  // Automatically hide tooltip after 5 seconds
  useEffect(() => {
    if (showTooltip) {
      const timer = setTimeout(() => {
        setShowTooltip(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showTooltip]);

  const handleClick = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setShowTooltip(true);
    }
  };

  return (
    <>
      {/* Center tooltip */}
      <div className={`
        fixed inset-0 flex items-center justify-center z-[60] pointer-events-none
        transition-all duration-500 ease-in-out
        ${showTooltip ? 'opacity-100' : 'opacity-0'}
      `}>
        <div className="bg-black/80 backdrop-blur-sm text-white/90 px-6 py-4 rounded-lg text-sm tracking-wide">
          For full playback, log into Spotify Premium in your browser
        </div>
      </div>

      {/* Your existing Spotify player */}
      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={handleClick}
          className="w-12 h-12 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center
            hover:bg-black/30 transition-all duration-300 ease-in-out"
        >
          {isOpen ? (
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M9 18V5l12 7-12 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>

        <div className={`
          absolute bottom-16 right-0
          transform transition-all duration-500 ease-in-out
          ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
        `}>
          <div className="bg-black/20 backdrop-blur-sm p-4 rounded-lg w-[300px]">
            <iframe
              src="https://open.spotify.com/embed/playlist/0MqplLTYVXfOfLIDy77Atr?utm_source=generator&theme=0"
              width="100%"
              height="352"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </>
  );
}