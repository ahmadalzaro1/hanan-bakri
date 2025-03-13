
import React, { useEffect, useRef } from 'react';

const Philosophy = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
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
    
    if (sectionRef.current) observer.observe(sectionRef.current);
    if (contentRef.current) observer.observe(contentRef.current);
    
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      if (contentRef.current) observer.unobserve(contentRef.current);
    };
  }, []);
  
  return (
    <section className="py-24 bg-muted">
      <div className="page-container">
        <div 
          ref={sectionRef}
          className="opacity-0 translate-y-10 transition-all duration-1000 ease-soft"
        >
          <h2 className="section-title mb-16 text-center">Design Philosophy</h2>
        </div>
        
        <div
          ref={contentRef}
          className="opacity-0 translate-y-10 transition-all duration-1000 delay-300 ease-soft"
        >
          <div className="max-w-3xl mx-auto text-center">
            <p className="prose-content mb-8">
              "I believe that great design speaks to both the heart and mind. It should feel intuitive and natural, 
              while resolving complex problems through thoughtful consideration. My work aims to create spaces and 
              experiences that elevate everyday life through attention to detail and a deep understanding of human needs."
            </p>
            <p className="text-lg font-serif italic">— Hanan Bakri</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
