
import React from 'react';
import { EyeIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';

type GalleryPreviewProps = {
  showPreview: boolean;
  previewColumns: (1 | 2 | 3)[];
  previewUrls: string[];
};

const GalleryPreview = ({ showPreview, previewColumns, previewUrls }: GalleryPreviewProps) => {
  if (!showPreview || previewColumns.length === 0) return null;

  // Organize images by column
  const columnImages = {
    1: [] as { url: string, index: number }[],
    2: [] as { url: string, index: number }[],
    3: [] as { url: string, index: number }[]
  };

  previewUrls.forEach((url, index) => {
    const column = previewColumns[index];
    if (column) {
      columnImages[column].push({ url, index });
    }
  });

  return (
    <div className="mt-8 border rounded-lg p-4">
      <h3 className="text-lg font-medium mb-4 flex items-center">
        <EyeIcon className="mr-2 h-5 w-5 text-primary" />
        Preview: How Images Will Look on Homepage
      </h3>
      
      <div className="grid grid-cols-3 gap-2">
        {/* Column 1 */}
        <div className="space-y-2">
          <p className="text-sm text-center text-muted-foreground mb-2">Column 1 (Left)</p>
          {columnImages[1].map(({ url, index }) => (
            <div key={`preview-1-${index}`} className="rounded overflow-hidden">
              <img 
                src={url} 
                alt={`Preview ${index}`} 
                className="w-full h-[200px] object-cover"
              />
            </div>
          ))}
          {columnImages[1].length === 0 && (
            <p className="text-sm text-center text-muted-foreground p-4 border border-dashed rounded">No images</p>
          )}
        </div>
        
        {/* Column 2 */}
        <div className="space-y-2">
          <p className="text-sm text-center text-muted-foreground mb-2">Column 2 (Middle)</p>
          {columnImages[2].map(({ url, index }) => (
            <div key={`preview-2-${index}`} className="rounded overflow-hidden">
              <img 
                src={url} 
                alt={`Preview ${index}`} 
                className="w-full h-[200px] object-cover"
              />
            </div>
          ))}
          {columnImages[2].length === 0 && (
            <p className="text-sm text-center text-muted-foreground p-4 border border-dashed rounded">No images</p>
          )}
        </div>
        
        {/* Column 3 */}
        <div className="space-y-2">
          <p className="text-sm text-center text-muted-foreground mb-2">Column 3 (Right)</p>
          {columnImages[3].map(({ url, index }) => (
            <div key={`preview-3-${index}`} className="rounded overflow-hidden">
              <img 
                src={url} 
                alt={`Preview ${index}`} 
                className="w-full h-[200px] object-cover"
              />
            </div>
          ))}
          {columnImages[3].length === 0 && (
            <p className="text-sm text-center text-muted-foreground p-4 border border-dashed rounded">No images</p>
          )}
        </div>
      </div>
      
      <div className="mt-4 flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Column distribution: Left ({columnImages[1].length}), Middle ({columnImages[2].length}), Right ({columnImages[3].length})
        </p>
      </div>
    </div>
  );
};

export default GalleryPreview;
