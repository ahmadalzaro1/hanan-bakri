
import React, { useEffect, useRef, useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Filter, Diamond, Gem, Watch, Glasses, Crown } from 'lucide-react';

type Accessory = {
  id: string;
  title: string;
  category: string;
  image: string;
  slug: string;
  year: string;
  icon: React.ReactNode;
};

const accessories: Accessory[] = [
  {
    id: '1',
    title: 'Jewelry',
    category: 'Jewelry',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
    slug: 'jewelry',
    icon: <Gem className="h-4 w-4" />,
  },
  {
    id: '2',
    title: 'Watches',
    category: 'Watches',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    slug: 'watches',
    icon: <Watch className="h-4 w-4" />,
  },
  {
    id: '3',
    title: 'Eyewear',
    category: 'Eyewear',
    year: '2022',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80',
    slug: 'eyewear',
    icon: <Glasses className="h-4 w-4" />,
  },
  {
    id: '4',
    title: 'Luxury Items',
    category: 'Luxury',
    year: '2022',
    image: 'https://images.unsplash.com/photo-1569388330292-79cc1ec67270?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    slug: 'luxury-items',
    icon: <Crown className="h-4 w-4" />,
  },
  {
    id: '5',
    title: 'Fashion Diamonds',
    category: 'Diamonds',
    year: '2022',
    image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1019&q=80',
    slug: 'diamonds',
    icon: <Diamond className="h-4 w-4" />,
  }
];

const Accessories = () => {
  const headingRef = useRef<HTMLDivElement>(null);
  const accessoryRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const categories = ['All', ...Array.from(new Set(accessories.map(accessory => accessory.category)))];
  
  const filteredAccessories = activeFilter === 'All' 
    ? accessories 
    : accessories.filter(accessory => accessory.category === activeFilter);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Update document title
    document.title = 'Accessories | Hanan Bakri';
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
    );
    
    if (headingRef.current) observer.observe(headingRef.current);
    accessoryRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    
    return () => {
      if (headingRef.current) observer.unobserve(headingRef.current);
      accessoryRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);
  
  return (
    <>
      <Navigation />
      <main className="pt-32 pb-24 bg-gradient-to-b from-background to-background/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={headingRef}
            className="opacity-0 translate-y-10 transition-all duration-1000 ease-out mb-12 text-center"
          >
            <h1 className="text-4xl font-serif font-bold mb-6">Fashion Accessories</h1>
            <p className="text-foreground/60 max-w-2xl mx-auto mb-12">
              Discover our curated collection of luxury accessories, from fine jewelry to designer eyewear and watches.
            </p>
          </div>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            <Filter className="h-5 w-5 mr-2 text-primary" />
            {categories.map((category) => (
              <Button 
                key={category}
                variant={activeFilter === category ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(category)}
                className="transition-all duration-300"
              >
                {category === 'All' ? 'All Accessories' : category}
              </Button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAccessories.map((accessory, index) => (
              <Card
                key={accessory.id}
                ref={(el) => (accessoryRefs.current[index] = el)}
                className="opacity-0 translate-y-10 transition-all duration-1000 ease-out border-none overflow-hidden bg-card/50 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/20 group"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden aspect-[4/5]">
                  <img 
                    src={accessory.image} 
                    alt={accessory.title}
                    className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm text-xs px-3 py-1 rounded-full">
                    {accessory.year}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    {accessory.icon}
                    <span className="text-sm font-medium text-primary">{accessory.category}</span>
                  </div>
                  <h3 className="text-xl font-serif font-medium mb-3 group-hover:text-primary transition-colors">{accessory.title}</h3>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-sm text-foreground/60 group-hover:text-primary transition-colors">View collection</span>
                    <span className="h-8 w-8 rounded-full flex items-center justify-center bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                      {accessory.icon}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredAccessories.length === 0 && (
            <div className="text-center py-16">
              <p className="text-lg text-foreground/60">No accessories found in this category.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => setActiveFilter('All')}
              >
                View all accessories
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Accessories;
