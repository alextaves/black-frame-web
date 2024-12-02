import { useState, useEffect } from 'react'

export function useScrollDirection() {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  
  useEffect(() => {
    const threshold = 50 // Minimum scroll before triggering
    let ticking = false
    
    const updateScrollDirection = () => {
      const scrollY = window.scrollY
      
      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false
        return
      }
      
      setIsVisible(scrollY < lastScrollY || scrollY < threshold)
      setLastScrollY(scrollY > 0 ? scrollY : 0)
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDirection)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [lastScrollY])

  return isVisible
}

