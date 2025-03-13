
import React, { useEffect, useRef, useState } from 'react';
import { useGallery } from '@/contexts/GalleryContext';

const ParallaxGallery = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const galleryRef = useRef<HTMLDivElement>(null);
  const inViewRef = useRef(false);
  const { images } = useGallery();

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
          if (galleryRef.current) {
            const rect = galleryRef.current.getBoundingClientRect();
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

  // Get images for each column, sorted by order
  const sortedColumnImages = (column: 1 | 2 | 3) => {
    return [...images.filter(img => img.column === column)]
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  };

  const column1Images = sortedColumnImages(1);
  const column2Images = sortedColumnImages(2);
  const column3Images = sortedColumnImages(3);

  // Enhanced height variation for a more natural layout
  const getRandomHeight = (id: string) => {
    // Use the image ID as a seed for pseudo-randomness
    const seed = id.length;
    const heights = ['h-[380px]', 'h-[440px]', 'h-[500px]', 'h-[560px]', 'h-[620px]', 'h-[680px]'];
    return heights[seed % heights.length];
  };

  // More varied animation delay for staggered reveal effect
  const getAnimationDelay = (index: number) => {
    const delays = ['0s', '0.1s', '0.2s', '0.25s', '0.3s', '0.35s', '0.4s', '0.45s', '0.5s'];
    return delays[index % delays.length];
  };

  // Enhanced parallax speed calculation for more natural movement
  const getParallaxSpeed = (index: number, column: number) => {
    // Base speed varies by column to create layered effect
    const baseSpeed = column === 1 ? 0.08 : column === 2 ? 0.05 : 0.12;
    
    // Add variation based on position in column
    const positionFactor = ((index % 4) * 0.01) + 0.01;
    
    // Direction varies by column
    const direction = column === 2 ? -1 : 1;
    
    return baseSpeed * direction * (1 + positionFactor);
  };

  // Calculate mouse parallax intensity
  const getMouseParallax = (column: number) => {
    // Intensity varies by column to create layered effect
    return column === 1 ? 15 : column === 2 ? -25 : 20;
  };

  return (
    <div ref={galleryRef} className="w-full min-h-screen py-16 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {/* Column 1 - Left */}
          <div className="col-span-1 space-y-10 md:space-y-14">
            {column1Images.length > 0 ? (
              column1Images.map((image, index) => {
                const height = getRandomHeight(image.id);
                const delay = getAnimationDelay(index);
                const speed = getParallaxSpeed(index, 1);
                const mouseIntensity = getMouseParallax(1);
                
                return (
                  <div 
                    key={`column1-${image.id}`} 
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
              })
            ) : (
              <div className="h-[500px] flex items-center justify-center">
                <p className="text-gray-400">No images in column 1</p>
              </div>
            )}
          </div>

          {/* Column 2 - Middle */}
          <div className="col-span-1 md:mt-20 space-y-10 md:space-y-14">
            {column2Images.length > 0 ? (
              column2Images.map((image, index) => {
                const height = getRandomHeight(image.id);
                const delay = getAnimationDelay(index + 2); // Staggered offset
                const speed = getParallaxSpeed(index, 2);
                const mouseIntensity = getMouseParallax(2);
                
                return (
                  <div 
                    key={`column2-${image.id}`} 
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
              })
            ) : (
              <div className="h-[500px] flex items-center justify-center">
                <p className="text-gray-400">No images in column 2</p>
              </div>
            )}
          </div>

          {/* Column 3 - Right */}
          <div className="col-span-1 md:mt-32 space-y-10 md:space-y-14">
            {column3Images.length > 0 ? (
              column3Images.map((image, index) => {
                const height = getRandomHeight(image.id);
                const delay = getAnimationDelay(index + 4); // More staggered offset
                const speed = getParallaxSpeed(index, 3);
                const mouseIntensity = getMouseParallax(3);
                
                return (
                  <div 
                    key={`column3-${image.id}`} 
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
