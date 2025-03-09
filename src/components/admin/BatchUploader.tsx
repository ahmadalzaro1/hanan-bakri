
import React, { useState, useRef } from 'react';
import { useGallery } from '@/contexts/GalleryContext';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Sparkles } from 'lucide-react';
import { analyzeImages } from '@/lib/imageAnalysis';

import FileUploader from './batch-uploader/FileUploader';
import ImagePreviewGrid from './batch-uploader/ImagePreviewGrid';
import ProgressIndicator from './batch-uploader/ProgressIndicator';
import GalleryPreview from './batch-uploader/GalleryPreview';

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
          
          <FileUploader 
            onFileChange={handleFileChange}
            selectedFilesCount={selectedFiles.length}
            onClearSelection={clearSelection}
          />
          
          <ImagePreviewGrid 
            previewUrls={previewUrls}
            selectedFiles={selectedFiles}
          />
          
          {isProcessing && (
            <div className="mt-4">
              <ProgressIndicator 
                isProcessing={isProcessing}
                progress={progress}
                showPreview={showPreview}
                selectedFilesLength={selectedFiles.length}
                onAnalyzeAndPreview={analyzeAndPreview}
                onProcessUpload={processUpload}
              />
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-3">
          <ProgressIndicator 
            isProcessing={isProcessing}
            progress={progress}
            showPreview={showPreview}
            selectedFilesLength={selectedFiles.length}
            onAnalyzeAndPreview={analyzeAndPreview}
            onProcessUpload={processUpload}
          />
        </CardFooter>
      </Card>

      {/* Render the preview component */}
      <GalleryPreview 
        showPreview={showPreview}
        previewColumns={previewColumns}
        previewUrls={previewUrls}
      />
    </div>
  );
};

export default BatchUploader;
