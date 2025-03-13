
import React, { useState } from 'react';
import { X } from 'lucide-react';

type ImagePreviewGridProps = {
  previewUrls: string[];
  selectedFiles: File[];
  onRemoveImage?: (index: number) => void;
};

const ImagePreviewGrid = ({ 
  previewUrls, 
  selectedFiles,
  onRemoveImage
}: ImagePreviewGridProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  if (previewUrls.length === 0) return null;
  
  // Determine dynamic heights for images to create a more artistic layout
  const getRandomHeight = (index: number) => {
    // Use the file name as a seed for pseudo-randomness to ensure consistency
    const seed = selectedFiles[index]?.name.length || index;
    const heights = ['h-64', 'h-72', 'h-80', 'h-88', 'h-96'];
    return heights[seed % heights.length];
  };
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[600px] overflow-y-auto p-2">
      {previewUrls.map((url, index) => {
        const isHovered = hoveredIndex === index;
        const height = getRandomHeight(index);
        
        return (
          <div 
            key={`file-${index}`} 
            className={`relative ${height} rounded-md overflow-hidden transition-all duration-500`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              transform: isHovered ? 'scale(1.02)' : 'scale(1)',
              boxShadow: isHovered ? '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' : 'none'
            }}
          >
            <img 
              src={url} 
              alt={`Preview ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-105' : ''}`}
            />
            
            <div 
              className={`absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white p-4 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
            >
              <p className="text-sm text-center line-clamp-2 mb-2">{selectedFiles[index]?.name}</p>
              
              {onRemoveImage && (
                <button 
                  onClick={() => onRemoveImage(index)}
                  className="absolute top-2 right-2 rounded-full bg-black/60 p-1 hover:bg-black/80 transition-colors"
                  aria-label="Remove image"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ImagePreviewGrid;
