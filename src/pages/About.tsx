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
  return <>
      <Navigation />
      <main className="pt-32 pb-24">
        <div className="page-container">
          <div ref={headingRef} className="opacity-0 translate-y-10 transition-all duration-1000 ease-soft mb-16">
            <h1 className="section-title">Be Your Own Muse 

          </h1>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div ref={contentRef} className="opacity-0 translate-y-10 transition-all duration-1000 delay-300 ease-soft">
              <div className="prose-content space-y-6">
                
                
                
                
                
              </div>
            </div>
            
            <div ref={imageRef} className="opacity-0 translate-y-10 transition-all duration-1000 delay-500 ease-soft">
              <figure className="relative h-full">
                
              </figure>
            </div>
          </div>
          
          <div ref={museRef} className="opacity-0 translate-y-10 transition-all duration-1000 delay-700 ease-soft mt-24">
            <div className="max-w-4xl mx-auto">
              
              
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>;
};
export default About;