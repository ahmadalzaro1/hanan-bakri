
import React, { useEffect, useRef, useState } from 'react';

type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  column: 1 | 2 | 3;
};

const galleryImages: GalleryImage[] = [
  {
    id: '1',
    src: 'https://images.unsplash.com/photo-1529154691717-3306083d869e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    alt: 'Fashion design piece with flowing red fabric',
    column: 1,
  },
  {
    id: '2',
    src: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    alt: 'Elegant white gown with detailed stitching',
    column: 2,
  },
  {
    id: '3',
    src: 'https://images.unsplash.com/photo-1495385794356-15371f348c31?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    alt: 'Deep red dress with structural design',
    column: 3,
  },
  {
    id: '4',
    src: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    alt: 'Dramatic dress with flowing fabric',
    column: 1,
  },
  {
    id: '5',
    src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    alt: 'Minimalist white design with intricate details',
    column: 2,
  },
  {
    id: '6',
    src: 'https://images.unsplash.com/photo-1456885284447-7dd4bb8720bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    alt: 'Structural piece with bold silhouette',
    column: 3,
  },
  {
    id: '7',
    src: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    alt: 'Contrasting textures in design',
    column: 1,
  },
  {
    id: '8',
    src: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80',
    alt: 'Elegant silhouette with detailed embroidery',
    column: 2,
  },
  {
    id: '9',
    src: 'public/lovable-uploads/1b80d65d-46ff-4e5e-a672-974b0f333440.png',
    alt: 'Krigor Jabotian design collection',
    column: 3,
  }
];

const ParallaxGallery = () => {
  const [scrollY, setScrollY] = useState(0);
  const galleryRef = useRef<HTMLDivElement>(null);
  const inViewRef = useRef(false);

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
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initial check for element visibility
  useEffect(() => {
    if (galleryRef.current) {
      const rect = galleryRef.current.getBoundingClientRect();
      inViewRef.current = rect.top < window.innerHeight && rect.bottom > 0;
      if (inViewRef.current) {
        setScrollY(window.scrollY);
      }
    }
  }, []);

  // Get images for each column
  const column1Images = galleryImages.filter(img => img.column === 1);
  const column2Images = galleryImages.filter(img => img.column === 2);
  const column3Images = galleryImages.filter(img => img.column === 3);

  return (
    <div ref={galleryRef} className="w-full min-h-screen">
      <div className="relative grid grid-cols-3 gap-1 h-full">
        {/* Column 1 - Moves Up */}
        <div 
          className="col-span-1 transition-transform duration-300 ease-soft" 
          style={{ transform: `translateY(${-scrollY * 0.1}px)` }}
        >
          {column1Images.map((image) => (
            <div key={image.id} className="mb-1 overflow-hidden">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full object-cover transition-all duration-700 ease-soft hover:scale-105 h-[500px]"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Column 2 - Moves Down */}
        <div 
          className="col-span-1 transition-transform duration-300 ease-soft" 
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        >
          {column2Images.map((image) => (
            <div key={image.id} className="mb-1 overflow-hidden">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full object-cover transition-all duration-700 ease-soft hover:scale-105 h-[500px]"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Column 3 - Moves Up */}
        <div 
          className="col-span-1 transition-transform duration-300 ease-soft" 
          style={{ transform: `translateY(${-scrollY * 0.1}px)` }}
        >
          {column3Images.map((image) => (
            <div key={image.id} className="mb-1 overflow-hidden">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full object-cover transition-all duration-700 ease-soft hover:scale-105 h-[500px]"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ParallaxGallery;
