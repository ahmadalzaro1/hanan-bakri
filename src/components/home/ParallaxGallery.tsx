
import React, { useEffect, useRef, useState } from 'react';
import { useGallery } from '@/contexts/GalleryContext';

const ParallaxGallery = () => {
  const [scrollY, setScrollY] = useState(0);
  const galleryRef = useRef<HTMLDivElement>(null);
  const inViewRef = useRef(false);
  const { images } = useGallery();

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (galleryRef.current) {
        const rect = galleryRef.current.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isInView) {
          inViewRef.current = true;
          setScrollY(window.scrollY);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check immediately on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Get images for each column, sorted by order
  const sortedColumnImages = (column: 1 | 2 | 3) => {
    return [...images.filter(img => img.column === column)]
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  };

  const column1Images = sortedColumnImages(1);
  const column2Images = sortedColumnImages(2);
  const column3Images = sortedColumnImages(3);

  // Debug output to check what images we're displaying
  console.log('ParallaxGallery - Rendering with images:', { 
    total: images.length,
    column1: column1Images.length, 
    column2: column2Images.length, 
    column3: column3Images.length,
    allImages: images 
  });

  return (
    <div ref={galleryRef} className="w-full min-h-screen py-12">
      <div className="container mx-auto">
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
          {/* Column 1 - Moves Up */}
          <div 
            className="col-span-1 transition-transform duration-300 ease-soft" 
            style={{ transform: `translateY(${-scrollY * 0.1}px)` }}
          >
            {column1Images.length > 0 ? (
              column1Images.map((image) => (
                <div key={`column1-${image.id}`} className="mb-4 overflow-hidden rounded-lg shadow-md">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full object-cover transition-all duration-700 ease-soft hover:scale-105 h-[500px]"
                    loading="lazy"
                  />
                </div>
              ))
            ) : (
              <div className="h-[500px] bg-gray-100 flex items-center justify-center rounded-lg">
                <p className="text-gray-400">No images in column 1</p>
              </div>
            )}
          </div>

          {/* Column 2 - Moves Down */}
          <div 
            className="col-span-1 transition-transform duration-300 ease-soft" 
            style={{ transform: `translateY(${scrollY * 0.1}px)` }}
          >
            {column2Images.length > 0 ? (
              column2Images.map((image) => (
                <div key={`column2-${image.id}`} className="mb-4 overflow-hidden rounded-lg shadow-md">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full object-cover transition-all duration-700 ease-soft hover:scale-105 h-[500px]"
                    loading="lazy"
                  />
                </div>
              ))
            ) : (
              <div className="h-[500px] bg-gray-100 flex items-center justify-center rounded-lg">
                <p className="text-gray-400">No images in column 2</p>
              </div>
            )}
          </div>

          {/* Column 3 - Moves Up */}
          <div 
            className="col-span-1 transition-transform duration-300 ease-soft" 
            style={{ transform: `translateY(${-scrollY * 0.1}px)` }}
          >
            {column3Images.length > 0 ? (
              column3Images.map((image) => (
                <div key={`column3-${image.id}`} className="mb-4 overflow-hidden rounded-lg shadow-md">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full object-cover transition-all duration-700 ease-soft hover:scale-105 h-[500px]"
                    loading="lazy"
                  />
                </div>
              ))
            ) : (
              <div className="h-[500px] bg-gray-100 flex items-center justify-center rounded-lg">
                <p className="text-gray-400">No images in column 3</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParallaxGallery;
