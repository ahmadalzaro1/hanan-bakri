
import React from 'react';
import { Instagram, Linkedin, Facebook } from 'lucide-react';

const SocialMedia = () => {
  return (
    <div>
      <h2 className="text-xl font-serif mb-4">Social Media</h2>
      <div className="flex space-x-6">
        <a href="#" className="text-foreground/70 hover:text-primary transition-colors flex items-center gap-2">
          <Instagram className="h-5 w-5" />
          Instagram
        </a>
        <a href="#" className="text-foreground/70 hover:text-primary transition-colors flex items-center gap-2">
          <Facebook className="h-5 w-5" />
          Facebook
        </a>
        <a href="#" className="text-foreground/70 hover:text-primary transition-colors flex items-center gap-2">
          <Linkedin className="h-5 w-5" />
          LinkedIn
        </a>
      </div>
    </div>
  );
};

export default SocialMedia;
