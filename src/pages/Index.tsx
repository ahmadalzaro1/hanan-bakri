
import React, { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Hero from '@/components/home/Hero';
import Philosophy from '@/components/home/Philosophy';
import ParallaxGallery from '@/components/home/ParallaxGallery';

const Index = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Update document title
    document.title = 'Hanan Bakri | Portfolio';
    
    // Force a refresh on the images in case they were just uploaded
    const refreshGallery = async () => {
      // Small delay to ensure localStorage has been updated
      await new Promise(resolve => setTimeout(resolve, 100));
      console.log('Index - Forcing refresh of gallery');
    };
    
    refreshGallery();
  }, []);
  
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <ParallaxGallery />
        <Philosophy />
      </main>
      <Footer />
    </>
  );
};

export default Index;
