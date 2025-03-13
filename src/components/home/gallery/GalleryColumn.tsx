
import React from 'react';
import { GalleryImage } from '@/types/gallery';
import GalleryItem from './GalleryItem';

interface GalleryColumnProps {
  columnImages: GalleryImage[];
  columnNumber: 1 | 2 | 3;
  scrollY: number;
  mousePosition: { x: number; y: number };
  isInView: boolean;
  offset?: string;
}

const GalleryColumn: React.FC<GalleryColumnProps> = ({ 
  columnImages, 
  columnNumber, 
  scrollY, 
  mousePosition,
  isInView,
  offset = '' 
}) => {
  return (
    <div className={`col-span-1 space-y-10 md:space-y-14 ${offset}`}>
      {columnImages.length > 0 ? (
        columnImages.map((image, index) => (
          <GalleryItem
            key={`column${columnNumber}-${image.id}`}
            image={image}
            index={index + (columnNumber === 2 ? 2 : columnNumber === 3 ? 4 : 0)} // Staggered offset
            scrollY={scrollY}
            mousePosition={mousePosition}
            isInView={isInView}
          />
        ))
      ) : (
        <div className="h-[500px] flex items-center justify-center">
          <p className="text-gray-400">No images in column {columnNumber}</p>
        </div>
      )}
    </div>
  );
};

export default GalleryColumn;
