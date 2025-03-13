
import React, { useState, useRef, useEffect } from 'react';
import { GalleryImage } from '@/types/gallery';
import { getRandomHeight, getAnimationDelay, getParallaxSpeed, getMouseParallax } from '@/utils/parallaxUtils';

interface GalleryItemProps {
  image: GalleryImage;
  index: number;
  scrollY: number;
  mousePosition: { x: number; y: number };
  isInView: boolean;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ 
  image, 
  index, 
  scrollY, 
  mousePosition,
  isInView
}) => {
  const height = getRandomHeight(image.id);
  const delay = getAnimationDelay(index);
  const speed = getParallaxSpeed(index, image.column);
  const mouseIntensity = getMouseParallax(image.column);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);
  
  // Setup intersection observer for image lazy loading
  useEffect(() => {
    const currentRef = itemRef.current;
    if (!currentRef) return;

    const observerOptions = {
      root: null,
      rootMargin: '200px 0px', // Load images 200px before they come into view
      threshold: 0.01
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(currentRef);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  // Only calculate parallax if the gallery is in view and this item is visible
  const transform = isInView && isVisible 
    ? `translateY(${scrollY * speed}px) translateX(${mousePosition.x * mouseIntensity}px) translateZ(0)` 
    : 'translateZ(0)';

  return (
    <div 
      ref={itemRef}
      key={`column${image.column}-${image.id}`} 
      className={`overflow-hidden ${height} rounded-lg shadow-md parallax-item opacity-0 animate-fade-in`}
      style={{ 
        animationDelay: delay,
        animationFillMode: 'forwards',
        transform
      }}
    >
      {isVisible && (
        <img
          src={image.src}
          alt={image.alt}
          className={`w-full h-full object-cover transition-all duration-700 ease-soft ${isLoaded ? 'opacity-100' : 'opacity-0'} hover:scale-[1.03]`}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
        />
      )}
    </div>
  );
};

export default GalleryItem;
