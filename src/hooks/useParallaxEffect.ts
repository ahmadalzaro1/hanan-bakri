
import { useState, useEffect, useRef, useCallback } from 'react';

type MousePosition = {
  x: number;
  y: number;
};

type ParallaxEffectResult = {
  scrollY: number;
  mousePosition: MousePosition;
  inViewRef: React.RefObject<HTMLDivElement>;
  isInView: boolean;
};

export const useParallaxEffect = (): ParallaxEffectResult => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Setup Intersection Observer for performance optimization
  useEffect(() => {
    const currentRef = containerRef.current;
    if (!currentRef) return;

    const observerOptions = {
      root: null, // viewport
      rootMargin: '100px 0px', // Start loading slightly before element comes into view
      threshold: 0.1, // Trigger when 10% of the element is visible
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        setIsInView(entry.isIntersecting);
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  // Handle scroll and mouse events with improved performance
  useEffect(() => {
    let rafId: number | null = null;
    let lastScrollY = window.scrollY;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let ticking = false;

    const handleScroll = () => {
      lastScrollY = window.scrollY;
      
      if (!ticking && isInView) {
        rafId = requestAnimationFrame(() => {
          setScrollY(lastScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
      
      if (!ticking && isInView) {
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

    // Only add event listeners if element is in view
    if (isInView) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      
      // Initial values
      handleScroll();
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isInView]);

  return {
    scrollY,
    mousePosition,
    inViewRef: containerRef,
    isInView,
  };
};
