
/**
 * This utility analyzes images and determines the best column placement
 * based on image content, color, and other visual characteristics.
 */

// Simple approach for column selection based on image aspect ratio and brightness
export const analyzeImages = async (files: File[]): Promise<(1 | 2 | 3)[]> => {
  const results: (1 | 2 | 3)[] = [];
  
  console.log('imageAnalysis - Starting analysis of', files.length, 'images');
  
  // First pass: analyze each image individually
  const imageAnalysisData = await Promise.all(
    files.map(async (file) => {
      // Create image element to analyze
      const imageData = await loadImageData(file);
      
      // Analyze aspect ratio and brightness
      const aspectRatio = imageData.width / imageData.height;
      const brightness = await calculateBrightness(imageData);
      
      return {
        file,
        aspectRatio,
        brightness,
        size: file.size,
      };
    })
  );
  
  console.log('imageAnalysis - Completed initial image analysis');
  
  // Perform initial column assignments
  for (const data of imageAnalysisData) {
    let column: 1 | 2 | 3;
    
    // Wide landscape images often work best in the middle column
    if (data.aspectRatio > 1.2) {
      column = 2;
    } 
    // Very bright images tend to work well in columns 1 and 3
    else if (data.brightness > 150) {
      column = results.filter(col => col === 1).length <= 
              results.filter(col => col === 3).length ? 1 : 3;
    } 
    // Dark, moody images often look good in the middle column
    else if (data.brightness < 80) {
      column = 2;
    } 
    // For other images, distribute them evenly
    else {
      // Count existing column assignments
      const col1Count = results.filter(col => col === 1).length;
      const col2Count = results.filter(col => col === 2).length;
      const col3Count = results.filter(col => col === 3).length;
      
      // Place in the column with fewest images
      if (col1Count <= col2Count && col1Count <= col3Count) {
        column = 1;
      } else if (col2Count <= col1Count && col2Count <= col3Count) {
        column = 2;
      } else {
        column = 3;
      }
    }
    
    results.push(column);
  }
  
  console.log('imageAnalysis - Initial column assignments:', {
    column1: results.filter(col => col === 1).length,
    column2: results.filter(col => col === 2).length, 
    column3: results.filter(col => col === 3).length
  });
  
  // Ensure even distribution between columns - improved logic
  const adjustColumnDistribution = () => {
    // Count images in each column
    const columnCounts = [
      results.filter(col => col === 1).length, 
      results.filter(col => col === 2).length, 
      results.filter(col => col === 3).length
    ];
    
    // Calculate target count for even distribution
    const totalImages = results.length;
    const targetPerColumn = Math.floor(totalImages / 3);
    const remainder = totalImages % 3;
    
    const targetCounts = [
      targetPerColumn + (remainder > 0 ? 1 : 0),
      targetPerColumn + (remainder > 1 ? 1 : 0),
      targetPerColumn
    ];
    
    console.log('imageAnalysis - Target distribution:', targetCounts);
    
    // Find columns that need adjustment
    const overloadedColumns: number[] = [];
    const underfilledColumns: number[] = [];
    
    columnCounts.forEach((count, index) => {
      const targetCount = targetCounts[index];
      if (count > targetCount) {
        overloadedColumns.push(index + 1);
      } else if (count < targetCount) {
        underfilledColumns.push(index + 1);
      }
    });
    
    console.log('imageAnalysis - Adjustment needed:', {
      overloaded: overloadedColumns,
      underfilled: underfilledColumns
    });
    
    // Move images from overloaded to underfilled columns
    if (overloadedColumns.length > 0 && underfilledColumns.length > 0) {
      for (let underCol of underfilledColumns) {
        const needed = targetCounts[underCol - 1] - columnCounts[underCol - 1];
        if (needed <= 0) continue;
        
        for (let overCol of overloadedColumns) {
          const excess = columnCounts[overCol - 1] - targetCounts[overCol - 1];
          if (excess <= 0) continue;
          
          let moved = 0;
          // Find images to move
          for (let i = 0; i < results.length && moved < Math.min(needed, excess); i++) {
            if (results[i] === overCol) {
              // Skip images that strongly prefer their current column
              const imageData = imageAnalysisData[i];
              
              // Skip very wide images in column 2 or bright images in outer columns
              if ((overCol === 2 && imageData.aspectRatio > 1.3) ||
                  ((overCol === 1 || overCol === 3) && imageData.brightness > 170)) {
                continue;
              }
              
              // Move this image to the underfilled column
              results[i] = underCol as 1 | 2 | 3;
              moved++;
              
              // Update our counts
              columnCounts[overCol - 1]--;
              columnCounts[underCol - 1]++;
            }
          }
        }
      }
    }
    
    // Final check - ensure no column is empty
    const finalCounts = [
      results.filter(col => col === 1).length, 
      results.filter(col => col === 2).length, 
      results.filter(col => col === 3).length
    ];
    
    for (let i = 0; i < 3; i++) {
      if (finalCounts[i] === 0 && totalImages >= 3) {
        // Find column with most images
        const maxColIndex = finalCounts.indexOf(Math.max(...finalCounts));
        
        // Move one image
        for (let j = 0; j < results.length; j++) {
          if (results[j] === maxColIndex + 1) {
            results[j] = (i + 1) as 1 | 2 | 3;
            break;
          }
        }
      }
    }
  };
  
  // Apply distribution adjustments
  if (files.length >= 3) {
    adjustColumnDistribution();
  }
  
  // Add a delay to simulate complex analysis and show the progress bar
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const finalDistribution = {
    column1: results.filter(col => col === 1).length,
    column2: results.filter(col => col === 2).length, 
    column3: results.filter(col => col === 3).length
  };
  
  console.log("imageAnalysis - Final column distribution:", finalDistribution);
  
  return results;
};

// Helper function to load image data
const loadImageData = (file: File): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
};

// Calculate the average brightness of an image
const calculateBrightness = (img: HTMLImageElement): Promise<number> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      resolve(128); // Default middle brightness if canvas isn't supported
      return;
    }
    
    // Set canvas dimensions to match image
    canvas.width = 50; // Scale down for performance
    canvas.height = 50;
    
    // Draw image to canvas
    ctx.drawImage(img, 0, 0, 50, 50);
    
    // Get image data
    const imageData = ctx.getImageData(0, 0, 50, 50);
    const data = imageData.data;
    let sum = 0;
    
    // Calculate brightness
    for (let i = 0; i < data.length; i += 4) {
      // brightness = 0.299*R + 0.587*G + 0.114*B
      const brightness = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      sum += brightness;
    }
    
    // Average brightness (0-255)
    const avgBrightness = sum / (data.length / 4);
    resolve(avgBrightness);
  });
};
