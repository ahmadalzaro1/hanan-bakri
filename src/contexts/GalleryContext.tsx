
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { GalleryImage, GalleryContextType } from '@/types/gallery';
import { initialImages } from '@/data/mockGalleryImages';
import { saveGalleryToLocalStorage, loadGalleryFromLocalStorage } from '@/utils/galleryUtils';

const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

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
    const loadedImages = loadGalleryFromLocalStorage(initialImages);
    setImages(loadedImages);
  }, []);

  // Save images to localStorage whenever they change
  useEffect(() => {
    saveGalleryToLocalStorage(images);
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
