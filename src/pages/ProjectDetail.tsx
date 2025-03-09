
import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

type Project = {
  id: string;
  title: string;
  category: string;
  year: string;
  client: string;
  location: string;
  description: string;
  images: string[];
  slug: string;
};

const projectsData: Project[] = [
  {
    id: '1',
    title: 'Harmony Collection',
    category: 'Interior Design',
    year: '2023',
    client: 'Residential Client',
    location: 'New York, NY',
    description: 'The Harmony Collection embodies a balanced approach to modern living, where comfort meets aesthetics in a seamless integration. This interior design project reimagines residential spaces by incorporating natural materials, clean lines, and thoughtful details that enhance daily experiences while maintaining a sense of tranquility and elegant simplicity.',
    images: [
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80',
      'https://images.unsplash.com/photo-1618219944342-824e40a13285?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1615873968403-89e068629265?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80'
    ],
    slug: 'harmony-collection',
  },
  {
    id: '2',
    title: 'Serene Spaces',
    category: 'Architecture',
    year: '2022',
    client: 'Private Residence',
    location: 'Los Angeles, CA',
    description: 'Serene Spaces is an architectural project that explores the relationship between built environments and natural landscapes. With an emphasis on open floor plans, abundant natural light, and sustainable materials, this design creates a sense of calm and connection to nature while providing functional living spaces for modern lifestyles.',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c8a16c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1853&q=80'
    ],
    slug: 'serene-spaces',
  },
  {
    id: '3',
    title: 'Urban Renewal',
    category: 'Urban Design',
    year: '2022',
    client: 'City Municipality',
    location: 'Chicago, IL',
    description: 'Urban Renewal represents a transformative approach to city planning that revitalizes existing urban spaces while honoring their historical context. This project introduces innovative solutions for community spaces, pedestrian pathways, and mixed-use developments that foster social interaction, sustainability, and civic pride within dense urban environments.',
    images: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1642362732521-7b3b946ad757?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1605092675701-110ab9449a53?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
    ],
    slug: 'urban-renewal',
  },
  {
    id: '4',
    title: 'Minimalist Living',
    category: 'Interior Design',
    year: '2021',
    client: 'Urban Apartment',
    location: 'San Francisco, CA',
    description: 'Minimalist Living embodies the principle that less is more, focusing on essential elements that create a sense of space, light, and tranquility. This interior design project utilizes a restrained palette of materials and colors, precise detailing, and thoughtful storage solutions to transform compact urban apartments into serene sanctuaries that promote mindful living.',
    images: [
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
      'https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1616137148650-4aa14651e02a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80'
    ],
    slug: 'minimalist-living',
  },
  {
    id: '5',
    title: 'Coastal Retreat',
    category: 'Architecture',
    year: '2021',
    client: 'Vacation Home',
    location: 'Santa Barbara, CA',
    description: 'Coastal Retreat is an architectural project that celebrates the beauty of oceanfront living while respecting the sensitive coastal environment. This design features expansive glazing to capture stunning views, durable materials that withstand marine conditions, and indoor-outdoor spaces that embrace the temperate climate, creating a harmonious relationship between the built structure and its natural surroundings.',
    images: [
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1621275471769-e6aa344546d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1607&q=80'
    ],
    slug: 'coastal-retreat',
  },
  {
    id: '6',
    title: 'Urban Loft',
    category: 'Interior Design',
    year: '2020',
    client: 'Commercial Space',
    location: 'Seattle, WA',
    description: 'Urban Loft represents the adaptive reuse of industrial spaces for contemporary purposes, preserving architectural character while introducing modern functionality. This interior design project maintains original elements like exposed brick, structural steel, and concrete floors while incorporating sophisticated lighting, custom furnishings, and strategic space planning to create versatile environments for working, living, and entertaining.',
    images: [
      'https://images.unsplash.com/photo-1618220048045-10a6dbdf83e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1617103996702-96ff29b1c467?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80',
      'https://images.unsplash.com/photo-1593696140826-c58b021acf8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
    ],
    slug: 'urban-loft',
  }
];

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [currentImage, setCurrentImage] = useState<number>(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Find the project by slug
    const foundProject = projectsData.find(p => p.slug === slug);
    setProject(foundProject || null);
    
    // Update document title
    if (foundProject) {
      document.title = `${foundProject.title} | Hanan Bakri`;
    }
    
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
    
    if (headerRef.current) observer.observe(headerRef.current);
    if (imageRef.current) observer.observe(imageRef.current);
    if (contentRef.current) observer.observe(contentRef.current);
    
    return () => {
      if (headerRef.current) observer.unobserve(headerRef.current);
      if (imageRef.current) observer.unobserve(imageRef.current);
      if (contentRef.current) observer.unobserve(contentRef.current);
    };
  }, [slug]);
  
  if (!project) {
    return (
      <>
        <Navigation />
        <main className="pt-32 pb-24">
          <div className="page-container">
            <h1 className="section-title">Project Not Found</h1>
            <Link to="/projects" className="inline-block py-3 px-6 border border-primary/20 hover:border-primary hover:bg-primary/5 transition-all duration-300">
              View All Projects
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }
  
  return (
    <>
      <Navigation />
      <main className="pt-32 pb-24">
        <div className="page-container">
          <div 
            ref={headerRef}
            className="opacity-0 translate-y-10 transition-all duration-1000 ease-soft mb-16"
          >
            <h1 className="section-title mb-4">{project.title}</h1>
            <p className="text-lg text-foreground/70">{project.category}</p>
          </div>
          
          <div 
            ref={imageRef}
            className="opacity-0 translate-y-10 transition-all duration-1000 delay-300 ease-soft mb-16"
          >
            <figure className="mb-4">
              <img 
                src={project.images[currentImage]} 
                alt={`${project.title} - Image ${currentImage + 1}`}
                className="w-full h-[600px] object-cover"
              />
            </figure>
            
            <div className="flex space-x-4 overflow-x-auto pb-4">
              {project.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`w-24 h-24 overflow-hidden ${index === currentImage ? 'ring-2 ring-primary' : 'opacity-70 hover:opacity-100 transition-opacity'}`}
                >
                  <img 
                    src={image} 
                    alt={`${project.title} thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          
          <div 
            ref={contentRef}
            className="opacity-0 translate-y-10 transition-all duration-1000 delay-500 ease-soft"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="md:col-span-2">
                <h2 className="text-xl font-serif mb-6">Project Overview</h2>
                <div className="prose-content">
                  <p>{project.description}</p>
                </div>
              </div>
              
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-serif mb-6">Project Details</h2>
                  <ul className="space-y-4">
                    <li className="flex justify-between border-b border-border/20 pb-2">
                      <span className="text-foreground/70">Year</span>
                      <span>{project.year}</span>
                    </li>
                    <li className="flex justify-between border-b border-border/20 pb-2">
                      <span className="text-foreground/70">Client</span>
                      <span>{project.client}</span>
                    </li>
                    <li className="flex justify-between border-b border-border/20 pb-2">
                      <span className="text-foreground/70">Location</span>
                      <span>{project.location}</span>
                    </li>
                    <li className="flex justify-between border-b border-border/20 pb-2">
                      <span className="text-foreground/70">Category</span>
                      <span>{project.category}</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <Link 
                    to="/contact" 
                    className="block w-full text-center py-3 px-6 border border-primary/20 hover:border-primary hover:bg-primary/5 transition-all duration-300"
                  >
                    Inquire About This Project
                  </Link>
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

export default ProjectDetail;
