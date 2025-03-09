
import React from 'react';

type ImagePreviewGridProps = {
  previewUrls: string[];
  selectedFiles: File[];
};

const ImagePreviewGrid = ({ previewUrls, selectedFiles }: ImagePreviewGridProps) => {
  if (previewUrls.length === 0) return null;
  
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-h-[250px] overflow-y-auto p-2">
      {previewUrls.map((url, index) => (
        <div key={`file-${index}`} className="relative aspect-[3/4] rounded-md overflow-hidden group">
          <img 
            src={url} 
            alt={`Preview ${index + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-sm p-2 text-center">
            {selectedFiles[index]?.name}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImagePreviewGrid;
