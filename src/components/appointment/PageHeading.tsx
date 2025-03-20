
import React from 'react';

interface PageHeadingProps {
  title: string;
  description?: string;
  className?: string;
}

const PageHeading: React.FC<PageHeadingProps> = ({ 
  title, 
  description,
  className = "" 
}) => {
  return (
    <div className={`${className}`}>
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
