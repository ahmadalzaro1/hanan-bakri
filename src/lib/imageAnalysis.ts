
/**
 * This utility analyzes images and determines the best column placement
 * based on image content, color, and other visual characteristics.
 */

// Simple approach for column selection based on image aspect ratio and brightness
export const analyzeImages = async (files: File[]): Promise<(1 | 2 | 3)[]> => {
  const results: (1 | 2 | 3)[] = [];
  
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
  
  // Ensure even distribution between columns - improve this logic
  const columnCounts = [0, 0, 0]; // indices 0, 1, 2 for columns 1, 2, 3
  results.forEach(column => columnCounts[column - 1]++);
  
  // If any column has significantly fewer images, move some over
  if (files.length >= 3) {
    // Look for severe imbalances (one column having 0 images when others have multiple)
    const emptyColumns = columnCounts.map((count, index) => count === 0 ? index + 1 : null).filter(Boolean) as (1 | 2 | 3)[];
    
    if (emptyColumns.length > 0) {
      // Find the column with most images
      const maxCountIndex = columnCounts.indexOf(Math.max(...columnCounts));
      const overloadedColumn = (maxCountIndex + 1) as 1 | 2 | 3;
      
      // Move at least one image to each empty column
      for (const emptyColumn of emptyColumns) {
        for (let i = 0; i < results.length; i++) {
          if (results[i] === overloadedColumn) {
            // Move this image
            results[i] = emptyColumn;
            
            // Update our counts
            columnCounts[overloadedColumn - 1]--;
            columnCounts[emptyColumn - 1]++;
            break;
          }
        }
      }
    }
    
    // Check for general imbalance
    const maxCount = Math.max(...columnCounts);
    const minCount = Math.min(...columnCounts);
    
    if (maxCount - minCount > 1) {
      // Find which column has too many and which has too few
      const overloadedColumnIndex = columnCounts.indexOf(maxCount);
      const underfilledColumnIndex = columnCounts.indexOf(minCount);
      
      // Convert to 1-based column numbers
      const overloadedColumn = (overloadedColumnIndex + 1) as 1 | 2 | 3;
      const underfilledColumn = (underfilledColumnIndex + 1) as 1 | 2 | 3;
      
      // Calculate how many images to move
      const imagesToMove = Math.floor((maxCount - minCount) / 2);
      
      // Look through results and find candidates to move
      let moved = 0;
      for (let i = 0; i < results.length && moved < imagesToMove; i++) {
        if (results[i] === overloadedColumn) {
          // Don't move images that strongly prefer their current column
          const imageData = imageAnalysisData[i];
          
          // Skip very wide images in column 2 or bright images in outer columns
          if ((overloadedColumn === 2 && imageData.aspectRatio > 1.3) ||
              ((overloadedColumn === 1 || overloadedColumn === 3) && imageData.brightness > 170)) {
            continue;
          }
          
          // Move this image to the underfilled column
          results[i] = underfilledColumn;
          moved++;
          
          // Update our counts
          columnCounts[overloadedColumnIndex]--;
          columnCounts[underfilledColumnIndex]++;
        }
      }
    }
  }
  
  // Add a delay to simulate complex analysis and show the progress bar
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  console.log("Final column distribution:", {
    column1: results.filter(col => col === 1).length,
    column2: results.filter(col => col === 2).length, 
    column3: results.filter(col => col === 3).length
  });
  
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
