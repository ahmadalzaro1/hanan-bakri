import React, { useEffect, useRef } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

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
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.1 }
    );
    
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
          <div 
            ref={headingRef}
            className="opacity-0 translate-y-10 transition-all duration-1000 ease-soft mb-16"
          >
            <h1 className="section-title">About</h1>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div 
              ref={contentRef}
              className="opacity-0 translate-y-10 transition-all duration-1000 delay-300 ease-soft"
            >
              <div className="prose-content space-y-6">
                <p>
                  Hanan Bakri is a visionary designer known for creating spaces and experiences that 
                  seamlessly blend aesthetic beauty with practical functionality. With a keen eye for 
                  detail and a passion for innovative design, Hanan approaches each project with a 
                  dedication to excellence and a commitment to pushing creative boundaries.
                </p>
                
                <p>
                  After graduating with honors from the prestigious Design Academy, Hanan honed their 
                  craft working with internationally renowned design firms before establishing an 
                  independent studio. This journey has been marked by a steadfast pursuit of design 
                  that not only captivates visually but also enhances the quality of life for those 
                  who experience it.
                </p>
                
                <p>
                  Drawing inspiration from diverse sources—from classical architecture to contemporary 
                  art—Hanan's work reflects a sophisticated understanding of design principles while 
                  embracing modern innovations. Each project in the portfolio represents a thoughtful 
                  response to client needs, site context, and cultural considerations.
                </p>
              </div>
            </div>
            
            <div 
              ref={imageRef}
              className="opacity-0 translate-y-10 transition-all duration-1000 delay-500 ease-soft"
            >
              <figure className="relative h-full">
                <img 
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
                  alt="Hanan Bakri" 
                  className="w-full h-full object-cover"
                />
              </figure>
            </div>
          </div>
          
          <div 
            ref={museRef}
            className="opacity-0 translate-y-10 transition-all duration-1000 delay-700 ease-soft mt-24"
          >
            <div className="max-w-4xl mx-auto">
              <h2 className="font-serif text-3xl mb-8 text-primary">Be Your Own Muse</h2>
              <div className="prose-content space-y-6">
                <p>
                  Hanan, a renowned fashion designer, guides you in embracing your true identity, helping you feel comfortable and confident in your own skin. She creates a contemporary vision of romance infused with sensual elegance, capturing the effortless grace of a queen, strength paired with sensitivity.
                </p>
                <p>
                  Through collaboration with professionals and artists, Hanan enriches the highest quality fabrics to empower women, allowing them to feel happy, powerful, and truly confident in who they are.
                </p>
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
