
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
