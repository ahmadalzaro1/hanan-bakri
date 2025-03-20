
import React, { useEffect, useRef } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageHeading from '@/components/appointment/PageHeading';
import ContactForm from '@/components/contact/ContactForm';
import ContactSidebar from '@/components/contact/ContactSidebar';
import { setupIntersectionObserver } from '@/utils/animationUtils';

const Contact = () => {
  const headingRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Update document title
    document.title = 'Contact | Hanan Bakri';
    
    // Setup animation observers
    const cleanup = setupIntersectionObserver([headingRef, formRef, infoRef], true);
    
    return cleanup;
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
            <PageHeading title="Contact" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div 
              ref={formRef}
              className="lg:col-span-2 opacity-0 translate-y-10 transition-all duration-1000 delay-300 ease-soft"
            >
              <ContactForm />
            </div>
            
            <div 
              ref={infoRef}
              className="opacity-0 translate-y-10 transition-all duration-1000 delay-500 ease-soft"
            >
              <ContactSidebar />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
