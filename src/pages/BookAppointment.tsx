
import React, { useEffect, useRef } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AppointmentForm from '@/components/appointment/AppointmentForm';
import AppointmentInformation from '@/components/appointment/AppointmentInformation';
import PageHeading from '@/components/appointment/PageHeading';
import { setupIntersectionObserver } from '@/utils/animationUtils';

const BookAppointment = () => {
  const headingRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Update document title
    document.title = 'Book an Appointment | Hanan Bakri';
    
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
            <PageHeading 
              title="Book an Appointment"
              description="Schedule a private consultation or viewing of Hanan Bakri's portfolio. 
                Please provide your details below and we'll get back to you to confirm your appointment."
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div 
              ref={formRef}
              className="lg:col-span-2 opacity-0 translate-y-10 transition-all duration-1000 delay-300 ease-soft"
            >
              <AppointmentForm />
            </div>
            
            <div 
              ref={infoRef}
              className="opacity-0 translate-y-10 transition-all duration-1000 delay-500 ease-soft"
            >
              <AppointmentInformation />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default BookAppointment;
