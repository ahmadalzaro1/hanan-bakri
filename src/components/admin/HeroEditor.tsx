
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

// Define types for hero content
type HeroContent = {
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  buttonLink: string;
};

// Default content from Hero component
const defaultHeroContent: HeroContent = {
  title: 'Design',
  subtitle: 'Through Art',
  description: 'Hanan Bakri creates timeless designs that embody elegance and artistry, each piece crafted with meticulous attention to detail.',
  buttonText: 'Explore Collection',
  buttonLink: '/projects'
};

const HeroEditor = () => {
  const [heroContent, setHeroContent] = useState<HeroContent>(defaultHeroContent);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Load saved content from localStorage if available
    const savedContent = localStorage.getItem('hero_content');
    if (savedContent) {
      try {
        setHeroContent(JSON.parse(savedContent));
      } catch (e) {
        console.error('Failed to parse saved hero content', e);
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setHeroContent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setIsSaving(true);
    try {
      localStorage.setItem('hero_content', JSON.stringify(heroContent));
      toast.success('Hero content saved successfully');
    } catch (e) {
      console.error('Failed to save hero content', e);
      toast.error('Failed to save hero content');
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setHeroContent(defaultHeroContent);
    localStorage.removeItem('hero_content');
    toast.info('Hero content reset to default');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Hero Section</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            value={heroContent.title}
            onChange={handleChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="subtitle">Subtitle</Label>
          <Input
            id="subtitle"
            name="subtitle"
            value={heroContent.subtitle}
            onChange={handleChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={heroContent.description}
            onChange={handleChange}
            rows={3}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="buttonText">Button Text</Label>
          <Input
            id="buttonText"
            name="buttonText"
            value={heroContent.buttonText}
            onChange={handleChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="buttonLink">Button Link</Label>
          <Input
            id="buttonLink"
            name="buttonLink"
            value={heroContent.buttonLink}
            onChange={handleChange}
          />
        </div>
        
        <div className="flex gap-3 pt-4">
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="flex-1"
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
          <Button
            variant="outline"
            onClick={handleReset}
            className="flex-1"
          >
            Reset to Default
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default HeroEditor;
