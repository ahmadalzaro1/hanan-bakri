
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

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
  },
  {
    id: '6',
    title: 'Luxe Wedding Collection',
    category: 'Wedding',
    year: '2021',
    image: 'https://images.unsplash.com/photo-1618220048045-10a6dbdf83e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    slug: 'luxe-wedding-collection',
  },
];

const Projects = () => {
  const headingRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  
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
      <main className="pt-32 pb-24">
        <div className="page-container">
          <div 
            ref={headingRef}
            className="opacity-0 translate-y-10 transition-all duration-1000 ease-soft mb-16"
          >
            <h1 className="section-title">Projects</h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.id}
                ref={(el) => (projectRefs.current[index] = el)}
                className="opacity-0 translate-y-10 transition-all duration-1000 ease-soft project-card"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <Link to={`/projects/${project.slug}`}>
                  <figure className="overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-80 object-cover project-image"
                    />
                  </figure>
                  <div className="p-6">
                    <p className="text-sm uppercase tracking-wider text-foreground/60 mb-2">
                      {project.category} • {project.year}
                    </p>
                    <h3 className="text-xl font-serif">{project.title}</h3>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Projects;
