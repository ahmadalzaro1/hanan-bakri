
import { useState, useEffect, useRef } from 'react';

type MousePosition = {
  x: number;
  y: number;
};

type ParallaxEffectResult = {
  scrollY: number;
  mousePosition: MousePosition;
  inViewRef: React.RefObject<HTMLDivElement>;
};

export const useParallaxEffect = (): ParallaxEffectResult => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const inViewRef = useRef(false);

  // Handle scroll and mouse events with improved performance
  useEffect(() => {
    let rafId: number | null = null;
    let lastScrollY = window.scrollY;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let ticking = false;

    const handleScroll = () => {
      lastScrollY = window.scrollY;
      
      if (!ticking) {
        rafId = requestAnimationFrame(() => {
          if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const isInView = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isInView) {
              inViewRef.current = true;
              setScrollY(lastScrollY);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
      
      if (!ticking) {
        rafId = requestAnimationFrame(() => {
          setMousePosition({
            x: lastMouseX / window.innerWidth - 0.5, // -0.5 to 0.5
            y: lastMouseY / window.innerHeight - 0.5, // -0.5 to 0.5
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    handleScroll(); // Check immediately on mount
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return {
    scrollY,
    mousePosition,
    inViewRef: containerRef,
  };
};
