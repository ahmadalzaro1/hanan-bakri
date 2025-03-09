
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    // Update document title
    document.title = '404 Not Found | Hanan Bakri';
  }, [location.pathname]);

  return (
    <>
      <Navigation />
      <main className="min-h-screen flex items-center justify-center py-32">
        <div className="text-center px-4">
          <h1 className="text-7xl md:text-9xl font-serif mb-6">404</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link 
            to="/" 
            className="inline-block py-3 px-8 border border-primary/20 hover:border-primary hover:bg-primary/5 transition-all duration-300"
          >
            Return Home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default NotFound;
