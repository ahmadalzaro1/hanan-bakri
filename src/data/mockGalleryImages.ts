
import { GalleryImage } from "@/types/gallery";

// Initial images with many more mock images for better animation testing
export const initialImages: GalleryImage[] = [
  // Column 1 images
  {
    id: '1',
    src: 'https://images.unsplash.com/photo-1529154691717-3306083d869e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    alt: 'Fashion design piece with flowing red fabric',
    column: 1,
    order: 0
  },
  {
    id: '4',
    src: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    alt: 'Dramatic dress with flowing fabric',
    column: 1,
    order: 1
  },
  {
    id: '7',
    src: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    alt: 'Contrasting textures in design',
    column: 1,
    order: 2
  },
  {
    id: '10',
    src: 'https://images.unsplash.com/photo-1558684231-d9e73965d20d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    alt: 'Elegant haute couture gown',
    column: 1,
    order: 3
  },
  {
    id: '13',
    src: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    alt: 'Structural evening gown',
    column: 1,
    order: 4
  },
  {
    id: '16',
    src: 'https://images.unsplash.com/photo-1605763240000-7e93b172d754?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    alt: 'Avant-garde fashion piece',
    column: 1,
    order: 5
  },
  
  // Column 2 images
  {
    id: '2',
    src: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    alt: 'Elegant white gown with detailed stitching',
    column: 2,
    order: 0
  },
  {
    id: '5',
    src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    alt: 'Minimalist white design with intricate details',
    column: 2,
    order: 1
  },
  {
    id: '8',
    src: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80',
    alt: 'Elegant silhouette with detailed embroidery',
    column: 2,
    order: 2
  },
  {
    id: '11',
    src: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    alt: 'Structured silhouette with flowing elements',
    column: 2,
    order: 3
  },
  {
    id: '14',
    src: 'https://images.unsplash.com/photo-1544816155-12df9643f363?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    alt: 'Contemporary fashion design',
    column: 2,
    order: 4
  },
  {
    id: '17',
    src: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    alt: 'Sculptural evening wear',
    column: 2,
    order: 5
  },
  
  // Column 3 images
  {
    id: '3',
    src: 'https://images.unsplash.com/photo-1495385794356-15371f348c31?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    alt: 'Deep red dress with structural design',
    column: 3,
    order: 0
  },
  {
    id: '6',
    src: 'https://images.unsplash.com/photo-1456885284447-7dd4bb8720bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    alt: 'Structural piece with bold silhouette',
    column: 3,
    order: 1
  },
  {
    id: '9',
    src: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    alt: 'Krigor Jabotian design collection',
    column: 3,
    order: 2
  },
  {
    id: '12',
    src: 'https://images.unsplash.com/photo-1534126511673-b6899657816a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    alt: 'Flowing bridal couture',
    column: 3,
    order: 3
  },
  {
    id: '15',
    src: 'https://images.unsplash.com/photo-1554412933-514a83d2f3c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    alt: 'Modern wedding attire',
    column: 3,
    order: 4
  },
  {
    id: '18',
    src: 'https://images.unsplash.com/photo-1550639525-c97d455acf70?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    alt: 'Dramatic runway piece',
    column: 3,
    order: 5
  },
  // Adding even more images for enhanced parallax testing
  {
    id: '19',
    src: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    alt: 'Ethereal bridal gown',
    column: 1,
    order: 6
  },
  {
    id: '20',
    src: 'https://images.unsplash.com/photo-1577769084235-c6d08fab9ff6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    alt: 'Fashion week runway look',
    column: 2,
    order: 6
  },
  {
    id: '21',
    src: 'https://images.unsplash.com/photo-1515372654940-637efa33d807?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    alt: 'Jeweled evening dress',
    column: 3,
    order: 6
  }
];
