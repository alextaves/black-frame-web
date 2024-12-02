// src/components/SpotifyPlayer.tsx
'use client';

import { useState } from 'react';

export default function SpotifyPlayer() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
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
            src="https://open.spotify.com/embed/playlist/0MqplLTYVXfOfLIDy77Atr"
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
  );
}