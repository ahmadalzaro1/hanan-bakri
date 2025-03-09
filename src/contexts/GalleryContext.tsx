
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  column: 1 | 2 | 3;
  order?: number;
};

type GalleryContextType = {
  images: GalleryImage[];
  addImage: (image: Omit<GalleryImage, 'id'>) => void;
  updateImage: (id: string, updates: Partial<Omit<GalleryImage, 'id'>>) => void;
  deleteImage: (id: string) => void;
  reorderImages: (column: 1 | 2 | 3, newOrder: string[]) => void;
};

const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

// Initial images from ParallaxGallery component
const initialImages: GalleryImage[] = [
  {
    id: '1',
    src: 'https://images.unsplash.com/photo-1529154691717-3306083d869e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    alt: 'Fashion design piece with flowing red fabric',
    column: 1,
    order: 0
  },
  {
    id: '2',
    src: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    alt: 'Elegant white gown with detailed stitching',
    column: 2,
    order: 0
  },
  {
    id: '3',
    src: 'https://images.unsplash.com/photo-1495385794356-15371f348c31?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    alt: 'Deep red dress with structural design',
    column: 3,
    order: 0
  },
  {
    id: '4',
    src: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    alt: 'Dramatic dress with flowing fabric',
    column: 1,
    order: 1
  },
  {
    id: '5',
    src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    alt: 'Minimalist white design with intricate details',
    column: 2,
    order: 1
  },
  {
    id: '6',
    src: 'https://images.unsplash.com/photo-1456885284447-7dd4bb8720bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    alt: 'Structural piece with bold silhouette',
    column: 3,
    order: 1
  },
  {
    id: '7',
    src: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    alt: 'Contrasting textures in design',
    column: 1,
    order: 2
  },
  {
    id: '8',
    src: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80',
    alt: 'Elegant silhouette with detailed embroidery',
    column: 2,
    order: 2
  },
  {
    id: '9',
    src: 'public/lovable-uploads/1b80d65d-46ff-4e5e-a672-974b0f333440.png',
    alt: 'Krigor Jabotian design collection',
    column: 3,
    order: 2
  }
];

export const useGallery = () => {
  const context = useContext(GalleryContext);
  if (!context) {
    throw new Error('useGallery must be used within a GalleryProvider');
  }
  return context;
};

export const GalleryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [images, setImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
    // Load images from localStorage or use initial images
    const savedImages = localStorage.getItem('gallery_images');
    if (savedImages) {
      try {
        setImages(JSON.parse(savedImages));
      } catch (e) {
        console.error('Failed to parse saved images', e);
        setImages(initialImages);
      }
    } else {
      setImages(initialImages);
    }
  }, []);

  // Save images to localStorage whenever they change
  useEffect(() => {
    if (images.length > 0) {
      localStorage.setItem('gallery_images', JSON.stringify(images));
    }
  }, [images]);

  const addImage = (image: Omit<GalleryImage, 'id'>) => {
    const newImage = {
      ...image,
      id: Date.now().toString(),
      order: images.filter(img => img.column === image.column).length
    };
    
    setImages(prev => [...prev, newImage]);
    toast.success('Image added successfully');
  };

  const updateImage = (id: string, updates: Partial<Omit<GalleryImage, 'id'>>) => {
    setImages(prev => 
      prev.map(img => 
        img.id === id ? { ...img, ...updates } : img
      )
    );
    toast.success('Image updated successfully');
  };

  const deleteImage = (id: string) => {
    setImages(prev => prev.filter(img => img.id !== id));
    toast.success('Image deleted successfully');
  };

  const reorderImages = (column: 1 | 2 | 3, newOrder: string[]) => {
    setImages(prev => {
      const columnImages = prev.filter(img => img.column === column);
      const otherImages = prev.filter(img => img.column !== column);
      
      const reorderedImages = newOrder.map((id, index) => {
        const image = columnImages.find(img => img.id === id);
        if (!image) return null;
        return { ...image, order: index };
      }).filter(Boolean) as GalleryImage[];
      
      return [...otherImages, ...reorderedImages];
    });
    toast.success('Images reordered successfully');
  };

  return (
    <GalleryContext.Provider value={{ images, addImage, updateImage, deleteImage, reorderImages }}>
      {children}
    </GalleryContext.Provider>
  );
};
