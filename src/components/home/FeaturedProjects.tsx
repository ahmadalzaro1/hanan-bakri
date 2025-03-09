
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

type Project = {
  id: string;
  title: string;
  category: string;
  image: string;
  slug: string;
};

const projects: Project[] = [
  {
    id: '1',
    title: 'Harmony Collection',
    category: 'Interior Design',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80',
    slug: 'harmony-collection',
  },
  {
    id: '2',
    title: 'Serene Spaces',
    category: 'Architecture',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    slug: 'serene-spaces',
  },
  {
    id: '3',
    title: 'Urban Renewal',
    category: 'Urban Design',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    slug: 'urban-renewal',
  },
];

const FeaturedProjects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  
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
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
    );
    
    if (sectionRef.current) observer.observe(sectionRef.current);
    projectRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      projectRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);
  
  return (
    <section className="py-24 overflow-hidden">
      <div className="page-container">
        <div 
          ref={sectionRef}
          className="opacity-0 translate-y-10 transition-all duration-1000 ease-soft"
        >
          <h2 className="section-title mb-16">Featured Projects</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => (projectRefs.current[index] = el)}
              className={cn(
                "opacity-0 translate-y-10 transition-all duration-1000 ease-soft project-card",
                index === 0 && "lg:col-span-2"
              )}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <Link to={`/projects/${project.slug}`}>
                <figure className="overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full object-cover project-image"
                    style={{ height: index === 0 ? '600px' : '450px' }}
                  />
                </figure>
                <div className="p-6">
                  <p className="text-sm uppercase tracking-wider text-foreground/60 mb-2">
                    {project.category}
                  </p>
                  <h3 className="text-xl md:text-2xl font-serif">{project.title}</h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Link 
            to="/projects"
            className="inline-block py-3 px-6 border border-primary/20 hover:border-primary hover:bg-primary/5 transition-all duration-300"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
