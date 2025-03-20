import React, { useEffect, useRef } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  const headingRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const museRef = useRef<HTMLDivElement>(null);

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
    if (imageRef.current) observer.observe(imageRef.current);
    if (museRef.current) observer.observe(museRef.current);
    
    return () => {
      if (headingRef.current) observer.unobserve(headingRef.current);
      if (contentRef.current) observer.unobserve(contentRef.current);
      if (imageRef.current) observer.unobserve(imageRef.current);
      if (museRef.current) observer.unobserve(museRef.current);
    };
  }, []);

  return (
    <>
      <Navigation />
      <main className="pt-32 pb-24">
        <div className="page-container">
          <div ref={headingRef} className="opacity-0 translate-y-10 transition-all duration-1000 ease-soft mb-16 text-center">
            <h1 className="section-title mb-4">Be Your Own Muse</h1>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Transforming fashion into a vehicle for self-expression and confidence
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div ref={contentRef} className="opacity-0 translate-y-10 transition-all duration-1000 delay-300 ease-soft">
              <div className="prose-content space-y-6">
                <p>
                  Hanan Bakri is a visionary designer known for creating spaces and experiences that seamlessly blend aesthetic beauty with practical functionality. With a keen eye for detail and a passion for innovative design, Hanan approaches each project with a dedication to excellence and a commitment to pushing creative boundaries.
                </p>
                <p>
                  After graduating with honors from the prestigious Design Academy, Hanan honed their craft working with internationally renowned design firms before establishing an independent studio. This journey has been marked by a steadfast pursuit of design that not only captivates visually but also enhances the quality of life for those who experience it.
                </p>
                <p>
                  Drawing inspiration from diverse sources—from classical architecture to contemporary art—Hanan's work reflects a sophisticated understanding of design principles while embracing modern innovations. Each project in the portfolio represents a thoughtful response to client needs, site context, and cultural considerations.
                </p>
              </div>
            </div>
            
            <div ref={imageRef} className="opacity-0 translate-y-10 transition-all duration-1000 delay-500 ease-soft">
              <figure className="relative h-full">
                <div className="aspect-ratio-1/1 bg-muted/50 rounded-lg overflow-hidden border border-border relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-muted-foreground">Designer Portrait</p>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-primary/20 rounded-lg z-0"></div>
                <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-primary/20 rounded-lg z-0"></div>
              </figure>
            </div>
          </div>
          
          <div ref={museRef} className="opacity-0 translate-y-10 transition-all duration-1000 delay-700 ease-soft mt-24">
            <Card className="bg-secondary/30 border-primary/10 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-2 h-full bg-primary"></div>
              <CardContent className="p-8">
                <h2 className="text-2xl font-serif mb-6">Be Your Own Muse</h2>
                <div className="prose-content">
                  <p>
                    Hanan, a renowned fashion designer, guides you in embracing your true identity, helping you feel comfortable and confident in your own skin. She creates a contemporary vision of romance infused with sensual elegance, capturing the effortless grace of a queen, strength paired with sensitivity. Through collaboration with professionals and artists, Hanan enriches the highest quality fabrics to empower women, allowing them to feel happy, powerful, and truly confident in who they are.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default About;
