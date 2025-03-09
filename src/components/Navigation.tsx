
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-soft py-6 px-4 sm:px-6 lg:px-8",
        isScrolled ? "bg-background/90 backdrop-blur-sm py-4 shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="font-serif text-xl tracking-wide">
          Hanan Bakri
        </Link>
        
        <nav className="hidden md:flex items-center space-x-10">
          <Link 
            to="/" 
            className={cn("nav-link", location.pathname === "/" && "active")}
          >
            Home
          </Link>
          <Link 
            to="/projects" 
            className={cn("nav-link", location.pathname.includes("/projects") && "active")}
          >
            Projects
          </Link>
          <Link 
            to="/about" 
            className={cn("nav-link", location.pathname === "/about" && "active")}
          >
            About
          </Link>
          <Link 
            to="/contact" 
            className={cn("nav-link", location.pathname === "/contact" && "active")}
          >
            Contact
          </Link>
        </nav>
        
        <div className="md:hidden">
          <MobileMenu location={location} />
        </div>
      </div>
    </header>
  );
};

const MobileMenu = ({ location }: { location: ReturnType<typeof useLocation> }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10"
        aria-label="Toggle menu"
      >
        <span className={cn(
          "block w-5 relative transition-all duration-300 ease-soft",
          isOpen ? "h-0" : "h-px bg-foreground"
        )}>
          <span className={cn(
            "block absolute w-5 h-px bg-foreground transition-all duration-300 ease-soft",
            isOpen ? "rotate-45 top-0" : "-translate-y-1.5"
          )} />
          <span className={cn(
            "block absolute w-5 h-px bg-foreground transition-all duration-300 ease-soft",
            isOpen ? "-rotate-45 top-0" : "translate-y-1.5"
          )} />
        </span>
      </button>
      
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-background flex flex-col justify-center items-center">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-4 w-10 h-10 flex items-center justify-center"
            aria-label="Close menu"
          >
            <span className="block w-5 h-0 relative">
              <span className="block absolute w-5 h-px bg-foreground rotate-45" />
              <span className="block absolute w-5 h-px bg-foreground -rotate-45" />
            </span>
          </button>
          
          <nav className="flex flex-col items-center space-y-8">
            <Link 
              to="/" 
              className={cn("nav-link text-2xl", location.pathname === "/" && "active")}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/projects" 
              className={cn("nav-link text-2xl", location.pathname.includes("/projects") && "active")}
              onClick={() => setIsOpen(false)}
            >
              Projects
            </Link>
            <Link 
              to="/about" 
              className={cn("nav-link text-2xl", location.pathname === "/about" && "active")}
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={cn("nav-link text-2xl", location.pathname === "/contact" && "active")}
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Navigation;
