
/**
 * This utility analyzes images and determines the best column placement
 * based on image content, color, and other visual characteristics.
 */

// Simple approach for column selection based on image aspect ratio and brightness
export const analyzeImages = async (files: File[]): Promise<(1 | 2 | 3)[]> => {
  const results: (1 | 2 | 3)[] = [];
  
  for (const file of files) {
    // Create image element to analyze
    const imageData = await loadImageData(file);
    
    // Analyze aspect ratio and brightness
    const aspectRatio = imageData.width / imageData.height;
    const brightness = await calculateBrightness(imageData);
    
    // Simple algorithm to distribute images:
    // - Wide images (landscape orientation) tend to go in middle column (2)
    // - Bright images tend to go in columns 1 and 3
    // - Dark images tend to go in column 2
    // - Also add some variety by using the image size
    
    if (aspectRatio > 1.2) {
      // Wide image - put in middle column
      results.push(2);
    } else if (brightness > 150) {
      // Bright image - alternate between columns 1 and 3
      results.push(results.length % 2 === 0 ? 1 : 3);
    } else if (brightness < 80) {
      // Dark image - mostly in column 2
      results.push(2);
    } else {
      // Distribute remaining images evenly
      const column = (results.length % 3 + 1) as 1 | 2 | 3;
      results.push(column);
    }
  }
  
  // Balance columns by adjusting some assignments
  const columnCounts = [0, 0, 0]; // indices 0, 1, 2 for columns 1, 2, 3
  results.forEach(column => columnCounts[column - 1]++);
  
  // Normalize distribution if there's a significant imbalance
  const maxCount = Math.max(...columnCounts);
  const minCount = Math.min(...columnCounts);
  
  if (maxCount - minCount > 2 && files.length > 5) {
    // Find which column has too many and which has too few
    const overloadedColumn = columnCounts.indexOf(maxCount) + 1 as 1 | 2 | 3;
    const underfilledColumn = columnCounts.indexOf(minCount) + 1 as 1 | 2 | 3;
    
    // Redistribute some images
    for (let i = 0; i < results.length && (maxCount - minCount > 2); i++) {
      if (results[i] === overloadedColumn) {
        results[i] = underfilledColumn;
        columnCounts[overloadedColumn - 1]--;
        columnCounts[underfilledColumn - 1]++;
        // Recalculate max and min
        const newMaxCount = Math.max(...columnCounts);
        const newMinCount = Math.min(...columnCounts);
        
        // Update our tracking values
        if (newMaxCount !== maxCount || newMinCount !== minCount) {
          break; // We've made enough adjustments
        }
      }
    }
  }
  
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
