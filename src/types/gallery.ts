
export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  column: 1 | 2 | 3;
  order?: number;
};

export type GalleryContextType = {
  images: GalleryImage[];
  addImage: (image: Omit<GalleryImage, 'id'>) => void;
  updateImage: (id: string, updates: Partial<Omit<GalleryImage, 'id'>>) => void;
  deleteImage: (id: string) => void;
  reorderImages: (column: 1 | 2 | 3, newOrder: string[]) => void;
};
