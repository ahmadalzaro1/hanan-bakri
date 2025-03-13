
/**
 * Enhanced height variation for a more natural layout
 */
export const getRandomHeight = (id: string): string => {
  // Use the image ID as a seed for pseudo-randomness
  const seed = id.length;
  const heights = ['h-[380px]', 'h-[440px]', 'h-[500px]', 'h-[560px]', 'h-[620px]', 'h-[680px]'];
  return heights[seed % heights.length];
};

/**
 * More varied animation delay for staggered reveal effect
 */
export const getAnimationDelay = (index: number): string => {
  const delays = ['0s', '0.1s', '0.2s', '0.25s', '0.3s', '0.35s', '0.4s', '0.45s', '0.5s'];
  return delays[index % delays.length];
};

/**
 * Enhanced parallax speed calculation for more natural movement
 */
export const getParallaxSpeed = (index: number, column: number): number => {
  // Base speed varies by column to create layered effect
  const baseSpeed = column === 1 ? 0.08 : column === 2 ? 0.05 : 0.12;
  
  // Add variation based on position in column
  const positionFactor = ((index % 4) * 0.01) + 0.01;
  
  // Direction varies by column
  const direction = column === 2 ? -1 : 1;
  
  return baseSpeed * direction * (1 + positionFactor);
};

/**
 * Calculate mouse parallax intensity
 */
export const getMouseParallax = (column: number): number => {
  // Intensity varies by column to create layered effect
  return column === 1 ? 15 : column === 2 ? -25 : 20;
};
