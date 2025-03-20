
import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactInfo = () => {
  return (
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
  );
};

export default ContactInfo;
