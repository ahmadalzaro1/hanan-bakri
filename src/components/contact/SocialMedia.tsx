
import React from 'react';

const SocialMedia = () => {
  return (
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
  );
};

export default SocialMedia;
