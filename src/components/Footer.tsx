
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-16 px-4 sm:px-6 lg:px-8 border-t border-border/20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-4">
            <h3 className="font-serif text-lg">Hanan Bakri</h3>
            <p className="text-sm text-foreground/70 max-w-xs">
              Creating elegant and timeless designs that transcend fleeting trends.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium">Navigation</h4>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                Home
              </Link>
              <Link to="/projects" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                Projects
              </Link>
              <Link to="/about" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                About
              </Link>
              <Link to="/contact" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                Contact
              </Link>
            </nav>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium">Contact</h4>
            <address className="not-italic text-sm text-foreground/70 space-y-2">
              <p>Email: info@hananbakri.com</p>
              <p>Phone: +1 (123) 456-7890</p>
              <p>Studio: 123 Design Street, Creative City</p>
            </address>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-border/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-foreground/50">
            © {currentYear} Hanan Bakri. All rights reserved.
          </p>
          
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="#" className="text-foreground/50 hover:text-foreground transition-colors">
              Instagram
            </a>
            <a href="#" className="text-foreground/50 hover:text-foreground transition-colors">
              Pinterest
            </a>
            <a href="#" className="text-foreground/50 hover:text-foreground transition-colors">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
