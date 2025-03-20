
import { RefObject } from "react";

export const setupIntersectionObserver = (
  refs: RefObject<HTMLElement>[],
  cleanup: boolean = false
): (() => void) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      });
    },
    { threshold: 0.1 }
  );
  
  // Observe all refs
  refs.forEach(ref => {
    if (ref.current) observer.observe(ref.current);
  });
  
  // Return cleanup function
  return () => {
    if (cleanup) {
      refs.forEach(ref => {
        if (ref.current) observer.unobserve(ref.current);
      });
    }
  };
};
