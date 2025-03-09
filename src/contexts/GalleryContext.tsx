
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
    src: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
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

  // Load images from localStorage on component mount
  useEffect(() => {
    const loadImages = () => {
      try {
        const savedImages = localStorage.getItem('gallery_images');
        if (savedImages) {
          const parsedImages = JSON.parse(savedImages);
          console.log('GalleryContext - Loaded images from localStorage:', parsedImages.length);
          if (Array.isArray(parsedImages) && parsedImages.length > 0) {
            setImages(parsedImages);
            return;
          }
        }
        // If no valid saved images, use initial images
        console.log('GalleryContext - Using initial images');
        setImages(initialImages);
      } catch (error) {
        console.error('Failed to load gallery images:', error);
        setImages(initialImages);
      }
    };

    loadImages();
  }, []);

  // Save images to localStorage whenever they change
  useEffect(() => {
    if (images.length > 0) {
      console.log('GalleryContext - Saving images to localStorage:', images.length);
      try {
        localStorage.setItem('gallery_images', JSON.stringify(images));
      } catch (error) {
        console.error('Failed to save gallery images:', error);
        toast.error('Failed to save gallery changes');
      }
    }
  }, [images]);

  const addImage = (image: Omit<GalleryImage, 'id'>) => {
    const newImage = {
      ...image,
      id: Date.now().toString(),
      order: Math.max(0, ...images.filter(img => img.column === image.column).map(img => (img.order || 0) + 1))
    };
    
    console.log('GalleryContext - Adding new image:', newImage);
    setImages(prev => [...prev, newImage]);
    toast.success('Image added successfully');
  };

  const updateImage = (id: string, updates: Partial<Omit<GalleryImage, 'id'>>) => {
    console.log('GalleryContext - Updating image:', id, updates);
    setImages(prev => 
      prev.map(img => 
        img.id === id ? { ...img, ...updates } : img
      )
    );
    toast.success('Image updated successfully');
  };

  const deleteImage = (id: string) => {
    console.log('GalleryContext - Deleting image:', id);
    setImages(prev => prev.filter(img => img.id !== id));
    toast.success('Image deleted successfully');
  };

  const reorderImages = (column: 1 | 2 | 3, newOrder: string[]) => {
    console.log('GalleryContext - Reordering images in column', column, newOrder);
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

  // Log current images whenever they change (debug only)
  useEffect(() => {
    console.log('GalleryContext - Current images:', images);
  }, [images]);

  return (
    <GalleryContext.Provider value={{ images, addImage, updateImage, deleteImage, reorderImages }}>
      {children}
    </GalleryContext.Provider>
  );
};
