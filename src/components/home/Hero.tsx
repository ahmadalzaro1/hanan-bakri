
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

// Define type for hero content
type HeroContent = {
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  buttonLink: string;
};

// Default content
const defaultHeroContent: HeroContent = {
  title: 'Design',
  subtitle: 'Through Art',
  description: 'Hanan Bakri creates timeless designs that embody elegance and artistry, each piece crafted with meticulous attention to detail.',
  buttonText: 'Explore Collection',
  buttonLink: '/projects'
};

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [heroContent, setHeroContent] = useState<HeroContent>(defaultHeroContent);
  
  useEffect(() => {
    // Load custom hero content if available
    const savedContent = localStorage.getItem('hero_content');
    if (savedContent) {
      try {
        setHeroContent(JSON.parse(savedContent));
      } catch (e) {
        console.error('Failed to parse saved hero content', e);
      }
    }
  }, []);
  
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
    
    if (heroRef.current) observer.observe(heroRef.current);
    if (textRef.current) observer.observe(textRef.current);
    
    return () => {
      if (heroRef.current) observer.unobserve(heroRef.current);
      if (textRef.current) observer.unobserve(textRef.current);
    };
  }, []);
  
  return (
    <section className="min-h-[60vh] pt-32 pb-10 flex flex-col justify-center">
      <div className="page-container">
        <div 
          ref={heroRef} 
          className="opacity-0 translate-y-10 transition-all duration-1000 ease-soft"
        >
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight mb-8">
            {heroContent.title} <br className="hidden md:block" />
            <span className="font-light">{heroContent.subtitle}</span>
          </h1>
        </div>
        
        <div 
          ref={textRef}
          className="opacity-0 translate-y-10 transition-all duration-1000 delay-300 ease-soft max-w-2xl"
        >
          <p className="prose-content mb-8">
            {heroContent.description}
          </p>
          
          <Link 
            to={heroContent.buttonLink} 
            className="inline-block py-3 px-6 border border-primary/20 hover:border-primary hover:bg-primary/5 transition-all duration-300"
          >
            {heroContent.buttonText}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
