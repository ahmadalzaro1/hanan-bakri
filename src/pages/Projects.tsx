
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tag, Filter, ImageIcon } from 'lucide-react';

type Project = {
  id: string;
  title: string;
  category: string;
  image: string;
  slug: string;
  year: string;
};

const projects: Project[] = [
  {
    id: '1',
    title: 'Elegant Bridal Collection',
    category: 'Wedding',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80',
    slug: 'elegant-bridal-collection',
  },
  {
    id: '2',
    title: 'Evening Glamour',
    category: 'Soirée',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    slug: 'evening-glamour',
  },
  {
    id: '3',
    title: 'Celebration Attire',
    category: 'Engagement',
    year: '2022',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    slug: 'celebration-attire',
  },
  {
    id: '4',
    title: 'Modern Casual',
    category: 'Sport Chic',
    year: '2022',
    image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
    slug: 'modern-casual',
  },
  {
    id: '5',
    title: 'Designer Footwear',
    category: 'Shoes',
    year: '2022',
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    slug: 'designer-footwear',
  }
];

const Projects = () => {
  const headingRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const categories = ['All', ...Array.from(new Set(projects.map(project => project.category)))];
  
  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Update document title
    document.title = 'Projects | Hanan Bakri';
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
    );
    
    if (headingRef.current) observer.observe(headingRef.current);
    projectRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    
    return () => {
      if (headingRef.current) observer.unobserve(headingRef.current);
      projectRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);
  
  return (
    <>
      <Navigation />
      <main className="pt-32 pb-24 bg-gradient-to-b from-background to-background/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={headingRef}
            className="opacity-0 translate-y-10 transition-all duration-1000 ease-out mb-12 text-center"
          >
            <h1 className="text-4xl font-serif font-bold mb-6">Fashion Collections</h1>
            <p className="text-foreground/60 max-w-2xl mx-auto mb-12">
              Explore our exclusive fashion categories, featuring the latest designs in bridal wear, evening attire, and more.
            </p>
          </div>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            <Filter className="h-5 w-5 mr-2 text-primary" />
            {categories.map((category) => (
              <Button 
                key={category}
                variant={activeFilter === category ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(category)}
                className="transition-all duration-300"
              >
                {category === 'All' ? 'All Collections' : category}
              </Button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <Card
                key={project.id}
                ref={(el) => (projectRefs.current[index] = el)}
                className="opacity-0 translate-y-10 transition-all duration-1000 ease-out border-none overflow-hidden bg-card/50 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/20 group"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <Link to={`/projects/${project.slug}`} className="block h-full">
                  <div className="relative overflow-hidden aspect-[4/5]">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm text-xs px-3 py-1 rounded-full">
                      {project.year}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Tag className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium text-primary">{project.category}</span>
                    </div>
                    <h3 className="text-xl font-serif font-medium mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-sm text-foreground/60 group-hover:text-primary transition-colors">View collection</span>
                      <span className="h-8 w-8 rounded-full flex items-center justify-center bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                        <ImageIcon className="h-4 w-4" />
                      </span>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
          
          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-lg text-foreground/60">No collections found in this category.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => setActiveFilter('All')}
              >
                View all collections
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Projects;
