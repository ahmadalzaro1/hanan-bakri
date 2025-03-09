
import React, { useState, useRef } from 'react';
import { useGallery } from '@/contexts/GalleryContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { Upload, Loader2, Sparkles, EyeIcon } from 'lucide-react';
import { analyzeImages } from '@/lib/imageAnalysis';

const BatchUploader = () => {
  const { addImage, images } = useGallery();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [previewColumns, setPreviewColumns] = useState<(1 | 2 | 3)[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles(prev => [...prev, ...filesArray]);
      
      // Create preview URLs
      const newPreviewUrls = filesArray.map(file => URL.createObjectURL(file));
      setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
    }
  };

  const clearSelection = () => {
    // Clean up URLs to prevent memory leaks
    previewUrls.forEach(url => URL.revokeObjectURL(url));
    setSelectedFiles([]);
    setPreviewUrls([]);
    setShowPreview(false);
    setPreviewColumns([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const analyzeAndPreview = async () => {
    if (selectedFiles.length === 0) {
      toast.error('Please select files to upload');
      return;
    }

    setIsProcessing(true);
    setProgress(10);

    try {
      // Analyze images and get column assignments
      const analysisResult = await analyzeImages(selectedFiles);
      console.log('BatchUploader - Analysis result:', analysisResult);
      setPreviewColumns(analysisResult);
      setProgress(100);
      
      // Show preview
      setShowPreview(true);
      toast.success('Analysis complete! Review the preview below.');
    } catch (error) {
      console.error('Error analyzing images:', error);
      toast.error('Failed to analyze images');
    } finally {
      setIsProcessing(false);
    }
  };

  const processUpload = async () => {
    if (selectedFiles.length === 0 || previewColumns.length === 0) {
      toast.error('Please analyze images before uploading');
      return;
    }

    setIsProcessing(true);
    setProgress(0);

    try {
      // Get current column counts for ordering
      const columnCounts = {
        1: images.filter(img => img.column === 1).length,
        2: images.filter(img => img.column === 2).length,
        3: images.filter(img => img.column === 3).length
      };
      
      console.log('BatchUploader - Existing column counts:', columnCounts);
      
      // Upload each image with its analyzed column
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const column = previewColumns[i];
        
        // Calculate the next order number for this column
        const nextOrder = columnCounts[column];
        columnCounts[column]++; // Increment for next image in same column
        
        console.log(`BatchUploader - Adding image ${i+1}/${selectedFiles.length} to column ${column} with order ${nextOrder}`);
        
        // Add to gallery with specific column and order
        addImage({
          src: previewUrls[i], // Use the already created preview URL
          alt: file.name.replace(/\.[^/.]+$/, ""), // Use filename without extension as alt text
          column: column,
          order: nextOrder
        });
        
        // Update progress
        setProgress(Math.round(((i + 1) / selectedFiles.length) * 100));
      }
      
      toast.success(`Successfully uploaded ${selectedFiles.length} images`);
      toast.info('Images added to homepage - click "Home" to view');
      clearSelection();
    } catch (error) {
      console.error('Error in batch upload:', error);
      toast.error('Failed to process images');
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  // Preview gallery component
  const GalleryPreview = () => {
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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles size={18} />
            Intelligent Batch Upload
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Upload multiple images at once and our system will automatically analyze them and 
            determine the best column placement based on image content and aesthetics.
          </p>
          
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
            <input
              type="file"
              ref={fileInputRef}
              multiple
              accept="image/*"
              onChange={handleFileChange}
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
          
          {selectedFiles.length > 0 && (
            <div className="mt-6 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Selected Images ({selectedFiles.length})</h3>
                <Button variant="outline" size="sm" onClick={clearSelection}>
                  Clear All
                </Button>
              </div>
              
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
            </div>
          )}
          
          {isProcessing && (
            <div className="mt-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">{showPreview ? 'Uploading images...' : 'Analyzing images...'}</span>
                <span className="text-sm font-medium">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-3">
          {!showPreview ? (
            <Button 
              onClick={analyzeAndPreview}
              disabled={isProcessing || selectedFiles.length === 0}
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
              onClick={processUpload}
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
        </CardFooter>
      </Card>

      {/* Render the preview component */}
      {showPreview && <GalleryPreview />}
    </div>
  );
};

export default BatchUploader;
