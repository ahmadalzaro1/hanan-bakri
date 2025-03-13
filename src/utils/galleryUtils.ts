
import { GalleryImage } from "@/types/gallery";
import { toast } from "sonner";

/**
 * Save gallery images to localStorage
 */
export const saveGalleryToLocalStorage = (images: GalleryImage[]): void => {
  if (images.length > 0) {
    console.log('GalleryUtils - Saving images to localStorage:', images.length);
    try {
      localStorage.setItem('gallery_images', JSON.stringify(images));
    } catch (error) {
      console.error('Failed to save gallery images:', error);
      toast.error('Failed to save gallery changes');
    }
  }
};

/**
 * Load gallery images from localStorage
 */
export const loadGalleryFromLocalStorage = (defaultImages: GalleryImage[]): GalleryImage[] => {
  try {
    const savedImages = localStorage.getItem('gallery_images');
    if (savedImages) {
      const parsedImages = JSON.parse(savedImages);
      console.log('GalleryUtils - Loaded images from localStorage:', parsedImages.length);
      if (Array.isArray(parsedImages) && parsedImages.length > 0) {
        return parsedImages;
      }
    }
    // If no valid saved images, use default images
    console.log('GalleryUtils - Using default images');
    return defaultImages;
  } catch (error) {
    console.error('Failed to load gallery images:', error);
    return defaultImages;
  }
};
