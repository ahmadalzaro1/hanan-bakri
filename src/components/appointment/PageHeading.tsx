
import React from 'react';

interface PageHeadingProps {
  title: string;
  description?: string;
  className?: string;
  animate?: boolean;
}

const PageHeading: React.FC<PageHeadingProps> = ({ 
  title, 
  description,
  className = "",
  animate = false
}) => {
  return (
    <div className={`${animate ? 'opacity-0 translate-y-10 transition-all duration-1000 ease-soft' : ''} ${className}`}>
      <h1 className="section-title">{title}</h1>
      {description && (
        <p className="max-w-2xl mx-auto text-center text-muted-foreground mt-4">
          {description}
        </p>
      )}
    </div>
  );
};

export default PageHeading;
