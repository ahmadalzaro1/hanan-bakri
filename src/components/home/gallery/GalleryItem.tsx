
import React from 'react';
import { GalleryImage } from '@/types/gallery';
import { getRandomHeight, getAnimationDelay, getParallaxSpeed, getMouseParallax } from '@/utils/parallaxUtils';

interface GalleryItemProps {
  image: GalleryImage;
  index: number;
  scrollY: number;
  mousePosition: { x: number; y: number };
}

const GalleryItem: React.FC<GalleryItemProps> = ({ image, index, scrollY, mousePosition }) => {
  const height = getRandomHeight(image.id);
  const delay = getAnimationDelay(index);
  const speed = getParallaxSpeed(index, image.column);
  const mouseIntensity = getMouseParallax(image.column);
  
  return (
    <div 
      key={`column${image.column}-${image.id}`} 
      className={`overflow-hidden ${height} rounded-lg shadow-md parallax-item opacity-0 animate-fade-in`}
      style={{ 
        animationDelay: delay,
        animationFillMode: 'forwards',
        transform: `translateY(${scrollY * speed}px) translateX(${mousePosition.x * mouseIntensity}px) translateZ(0)`
      }}
    >
      <img
        src={image.src}
        alt={image.alt}
        className="w-full h-full object-cover transition-all duration-700 ease-soft hover:scale-[1.03]"
        loading="lazy"
      />
    </div>
  );
};

export default GalleryItem;
