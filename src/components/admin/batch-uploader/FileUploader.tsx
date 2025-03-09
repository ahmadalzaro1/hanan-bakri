
import React, { useRef } from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

type FileUploaderProps = {
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedFilesCount: number;
  onClearSelection: () => void;
};

const FileUploader = ({ onFileChange, selectedFilesCount, onClearSelection }: FileUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
        <input
          type="file"
          ref={fileInputRef}
          multiple
          accept="image/*"
          onChange={onFileChange}
          className="hidden"
          id="batch-file-upload"
        />
        <label 
          htmlFor="batch-file-upload"
          className="flex flex-col items-center justify-center cursor-pointer"
        >
          <Upload size={40} className="text-muted-foreground mb-3" />
          <span className="text-lg font-medium">Drag files here or click to browse</span>
          <span className="text-sm text-muted-foreground mt-1">
            Support for JPG, PNG and WebP up to 5MB
          </span>
        </label>
      </div>
      
      {selectedFilesCount > 0 && (
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Selected Images ({selectedFilesCount})</h3>
          <Button variant="outline" size="sm" onClick={onClearSelection}>
            Clear All
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
