'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  useEffect(() => {
    const threshold = 50;
    let ticking = false;
    
    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      
      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }
      
      setIsVisible(scrollY < lastScrollY || scrollY < threshold);
      setLastScrollY(scrollY > 0 ? scrollY : 0);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDirection);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastScrollY]);

  const navItems = [
    { name: 'B&W PORTRAIT', path: '/bw-portrait' },
    { name: 'DETROIT', path: '/detroit' },
    { name: 'ROME', path: '/rome' },
    { name: 'TOKYO OLYMPICS', path: '/tokyo-olympics' }
  ];

  const isWhiteTextPage = pathname === '/detroit' || pathname === '/tokyo-olympics';

  return (
    <header 
      className={`
        fixed top-0 left-0 p-8 z-50
        transform transition-all duration-500 ease-in-out
        ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}
      `}
    >
      <nav>
        <div className="flex flex-col space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`text-sm tracking-wider hover:opacity-75 transition-opacity duration-300
                ${pathname === item.path 
                  ? (isWhiteTextPage ? 'text-white' : 'text-black')
                  : (isWhiteTextPage ? 'text-white/90' : 'text-gray-900')
                }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}