
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Loader2, Sparkles, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

type ProgressIndicatorProps = {
  isProcessing: boolean;
  progress: number;
  showPreview: boolean;
  selectedFilesLength: number;
  onAnalyzeAndPreview: () => Promise<void>;
  onProcessUpload: () => Promise<void>;
};

const ProgressIndicator = ({ 
  isProcessing, 
  progress, 
  showPreview, 
  selectedFilesLength,
  onAnalyzeAndPreview,
  onProcessUpload
}: ProgressIndicatorProps) => {
  return (
    <div className="space-y-3">
      {isProcessing && (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm">{showPreview ? 'Uploading images...' : 'Analyzing images...'}</span>
            <span className="text-sm font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}
      
      {!showPreview ? (
        <Button 
          onClick={onAnalyzeAndPreview}
          disabled={isProcessing || selectedFilesLength === 0}
          className="w-full"
        >
          {isProcessing ? (
            <>
              <Loader2 size={16} className="mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles size={16} className="mr-2" />
              Analyze Images
            </>
          )}
        </Button>
      ) : (
        <Button 
          onClick={onProcessUpload}
          disabled={isProcessing}
          className="w-full"
        >
          {isProcessing ? (
            <>
              <Loader2 size={16} className="mr-2 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload size={16} className="mr-2" />
              Confirm & Upload Images
            </>
          )}
        </Button>
      )}
    </div>
  );
};

export default ProgressIndicator;
