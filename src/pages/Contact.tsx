
import React, { useEffect, useRef, useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const headingRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Update document title
    document.title = 'Contact | Hanan Bakri';
    
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
    
    if (headingRef.current) observer.observe(headingRef.current);
    if (formRef.current) observer.observe(formRef.current);
    if (infoRef.current) observer.observe(infoRef.current);
    
    return () => {
      if (headingRef.current) observer.unobserve(headingRef.current);
      if (formRef.current) observer.unobserve(formRef.current);
      if (infoRef.current) observer.unobserve(infoRef.current);
    };
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    // Show success message
    toast({
      title: "Message Sent",
      description: "Thank you for your message. We'll get back to you soon.",
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };
  
  return (
    <>
      <Navigation />
      <main className="pt-32 pb-24">
        <div className="page-container">
          <div 
            ref={headingRef}
            className="opacity-0 translate-y-10 transition-all duration-1000 ease-soft mb-16"
          >
            <h1 className="section-title">Contact</h1>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div 
              ref={formRef}
              className="lg:col-span-2 opacity-0 translate-y-10 transition-all duration-1000 delay-300 ease-soft"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Name"
                      required
                      className="input-field"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      required
                      className="input-field"
                    />
                  </div>
                </div>
                
                <div>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    required
                    className="input-field"
                  />
                </div>
                
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Message"
                    required
                    rows={6}
                    className="input-field resize-none"
                  />
                </div>
                
                <div>
                  <button
                    type="submit"
                    className="inline-block py-3 px-8 border border-primary/20 hover:border-primary hover:bg-primary/5 transition-all duration-300"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
            
            <div 
              ref={infoRef}
              className="opacity-0 translate-y-10 transition-all duration-1000 delay-500 ease-soft"
            >
              <div className="space-y-10">
                <div>
                  <h2 className="text-xl font-serif mb-4">Contact Information</h2>
                  <address className="not-italic space-y-4">
                    <p className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <span className="flex flex-col">
                        <span className="text-foreground/70">Email</span>
                        <a href="mailto:info@hananbakri.com" className="hover:text-primary transition-colors">
                          info@hananbakri.com
                        </a>
                      </span>
                    </p>
                    
                    <p className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-primary" />
                      <span className="flex flex-col">
                        <span className="text-foreground/70">Phone</span>
                        <a href="tel:+962795544433" className="hover:text-primary transition-colors">
                          +962 7 9554 4433
                        </a>
                      </span>
                    </p>
                    
                    <p className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-primary" />
                      <span className="flex flex-col">
                        <span className="text-foreground/70">Studio</span>
                        <span>Abdoun</span>
                        <span>Amman, Jordan</span>
                      </span>
                    </p>
                  </address>
                </div>
                
                <div>
                  <h2 className="text-xl font-serif mb-4">Office Hours</h2>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span className="text-foreground/70">Monday - Friday</span>
                      <span>9:00 AM - 6:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-foreground/70">Saturday</span>
                      <span>By appointment only</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-foreground/70">Sunday</span>
                      <span>Closed</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h2 className="text-xl font-serif mb-4">Social Media</h2>
                  <div className="flex space-x-6">
                    <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                      Instagram
                    </a>
                    <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                      Pinterest
                    </a>
                    <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                      LinkedIn
                    </a>
                  </div>
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

export default Contact;
