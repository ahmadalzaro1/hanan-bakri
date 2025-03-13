
import React from 'react';
import { useGallery } from '@/contexts/GalleryContext';
import { useParallaxEffect } from '@/hooks/useParallaxEffect';
import GalleryColumn from './gallery/GalleryColumn';

const ParallaxGallery = () => {
  const { scrollY, mousePosition, inViewRef } = useParallaxEffect();
  const { images } = useGallery();

  // Get images for each column, sorted by order
  const sortedColumnImages = (column: 1 | 2 | 3) => {
    return [...images.filter(img => img.column === column)]
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  };

  const column1Images = sortedColumnImages(1);
  const column2Images = sortedColumnImages(2);
  const column3Images = sortedColumnImages(3);

  return (
    <div ref={inViewRef} className="w-full min-h-screen py-16 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {/* Column 1 - Left */}
          <GalleryColumn 
            columnImages={column1Images} 
            columnNumber={1} 
            scrollY={scrollY} 
            mousePosition={mousePosition} 
          />

          {/* Column 2 - Middle */}
          <GalleryColumn 
            columnImages={column2Images} 
            columnNumber={2} 
            scrollY={scrollY} 
            mousePosition={mousePosition} 
            offset="md:mt-20" 
          />

          {/* Column 3 - Right */}
          <GalleryColumn 
            columnImages={column3Images} 
            columnNumber={3} 
            scrollY={scrollY} 
            mousePosition={mousePosition} 
            offset="md:mt-32" 
          />
        </div>
      </div>
    </div>
  );
};

export default ParallaxGallery;
