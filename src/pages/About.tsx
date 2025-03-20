
import React, { useEffect, useRef } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  const headingRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    // Update document title
    document.title = 'About | Hanan Bakri';

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      });
    }, {
      threshold: 0.1
    });

    if (headingRef.current) observer.observe(headingRef.current);
    if (contentRef.current) observer.observe(contentRef.current);
    
    return () => {
      if (headingRef.current) observer.unobserve(headingRef.current);
      if (contentRef.current) observer.unobserve(contentRef.current);
    };
  }, []);

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-32 pb-24 bg-background">
        <div className="page-container max-w-5xl">
          <div ref={headingRef} className="opacity-0 translate-y-10 transition-all duration-1000 ease-soft mb-16 text-center">
            <h1 className="section-title mb-4">Be Your Own Muse</h1>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          </div>
          
          <div className="grid grid-cols-1 gap-12">
            <div className="mx-auto max-w-4xl">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-16 h-16 border-2 border-primary/20 rounded-lg z-0"></div>
                <div className="absolute -bottom-4 -right-4 w-16 h-16 border-2 border-primary/20 rounded-lg z-0"></div>
                
                <Card ref={contentRef} className="opacity-0 translate-y-10 transition-all duration-1000 delay-300 ease-soft bg-secondary/30 border-primary/10 overflow-hidden relative z-10">
                  <div className="absolute top-0 left-0 w-2 h-full bg-primary"></div>
                  <CardContent className="p-8 sm:p-10">
                    <div className="prose-content text-center sm:text-left">
                      <p className="text-lg sm:text-xl font-light leading-relaxed">
                        Hanan, a renowned fashion designer, guides you in embracing your true identity, helping you feel comfortable and confident in your own skin. She creates a contemporary vision of romance infused with sensual elegance, capturing the effortless grace of a queen, strength paired with sensitivity. Through collaboration with professionals and artists, Hanan enriches the highest quality fabrics to empower women, allowing them to feel happy, powerful, and truly confident in who they are.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="mx-auto w-full max-w-lg">
              <div className="aspect-ratio-1/1 bg-muted/50 rounded-lg overflow-hidden border border-border relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-muted-foreground">Designer Portrait</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default About;
