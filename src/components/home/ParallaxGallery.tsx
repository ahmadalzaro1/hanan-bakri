
import React, { useEffect, useRef, useState } from 'react';
import { useGallery } from '@/contexts/GalleryContext';

const ParallaxGallery = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
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

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5, // -0.5 to 0.5
        y: e.clientY / window.innerHeight - 0.5, // -0.5 to 0.5
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    handleScroll(); // Check immediately on mount
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Get images for each column, sorted by order
  const sortedColumnImages = (column: 1 | 2 | 3) => {
    return [...images.filter(img => img.column === column)]
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  };

  const column1Images = sortedColumnImages(1);
  const column2Images = sortedColumnImages(2);
  const column3Images = sortedColumnImages(3);

  // Determine heights for images to create a more dynamic layout
  const getRandomHeight = (id: string) => {
    // Use the image ID as a seed for pseudo-randomness
    const seed = id.length;
    const heights = ['h-[420px]', 'h-[480px]', 'h-[540px]', 'h-[600px]', 'h-[660px]'];
    return heights[seed % heights.length];
  };

  // Get random animation delay for staggered reveal
  const getAnimationDelay = (index: number) => {
    const delays = ['0s', '0.1s', '0.2s', '0.3s', '0.4s', '0.5s'];
    return delays[index % delays.length];
  };

  // Get animation speed multiplier based on image position
  const getSpeedMultiplier = (index: number, column: number) => {
    // Create varied speeds for different images
    const baseSpeed = 0.05;
    const variationFactor = ((index % 3) + 1) * 0.01;
    const columnFactor = column === 2 ? -1 : 1; // Middle column moves opposite
    
    return baseSpeed * columnFactor * (1 + variationFactor);
  };

  return (
    <div ref={galleryRef} className="w-full min-h-screen py-12 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {/* Column 1 - Moves Up + Mouse parallax */}
          <div className="col-span-1 space-y-8 md:space-y-12">
            {column1Images.length > 0 ? (
              column1Images.map((image, index) => {
                const height = getRandomHeight(image.id || '');
                const delay = getAnimationDelay(index);
                const speed = getSpeedMultiplier(index, 1);
                
                return (
                  <div 
                    key={`column1-${image.id}`} 
                    className={`overflow-hidden ${height} rounded-lg shadow-lg transition-all duration-700 opacity-0 animate-fade-in`}
                    style={{ 
                      animationDelay: delay,
                      animationFillMode: 'forwards',
                      transform: `translateY(${-scrollY * speed}px) translateX(${mousePosition.x * 15}px)`
                    }}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-all duration-700 ease-soft hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                );
              })
            ) : (
              <div className="h-[500px] flex items-center justify-center">
                <p className="text-gray-400">No images in column 1</p>
              </div>
            )}
          </div>

          {/* Column 2 - Moves Down + Mouse parallax */}
          <div className="col-span-1 md:mt-24 space-y-8 md:space-y-12">
            {column2Images.length > 0 ? (
              column2Images.map((image, index) => {
                const height = getRandomHeight(image.id || '');
                const delay = getAnimationDelay(index + 1); // Offset for staggered effect
                const speed = getSpeedMultiplier(index, 2);
                
                return (
                  <div 
                    key={`column2-${image.id}`} 
                    className={`overflow-hidden ${height} rounded-lg shadow-lg transition-all duration-700 opacity-0 animate-fade-in`}
                    style={{ 
                      animationDelay: delay,
                      animationFillMode: 'forwards',
                      transform: `translateY(${scrollY * speed}px) translateX(${mousePosition.x * -15}px)`
                    }}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-all duration-700 ease-soft hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                );
              })
            ) : (
              <div className="h-[500px] flex items-center justify-center">
                <p className="text-gray-400">No images in column 2</p>
              </div>
            )}
          </div>

          {/* Column 3 - Moves Up with different speed + Mouse parallax */}
          <div className="col-span-1 md:mt-12 space-y-8 md:space-y-12">
            {column3Images.length > 0 ? (
              column3Images.map((image, index) => {
                const height = getRandomHeight(image.id || '');
                const delay = getAnimationDelay(index + 2); // Offset for staggered effect
                const speed = getSpeedMultiplier(index, 3);
                
                return (
                  <div 
                    key={`column3-${image.id}`} 
                    className={`overflow-hidden ${height} rounded-lg shadow-lg transition-all duration-700 opacity-0 animate-fade-in`}
                    style={{ 
                      animationDelay: delay,
                      animationFillMode: 'forwards',
                      transform: `translateY(${-scrollY * speed}px) translateX(${mousePosition.x * 20}px)`
                    }}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-all duration-700 ease-soft hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                );
              })
            ) : (
              <div className="h-[500px] flex items-center justify-center">
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
