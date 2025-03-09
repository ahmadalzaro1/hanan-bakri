
import React, { useState, useRef } from 'react';
import { useGallery } from '@/contexts/GalleryContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Trash2, Upload, Move } from 'lucide-react';

const GalleryManager = () => {
  const { images, addImage, updateImage, deleteImage, reorderImages } = useGallery();
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [newImageAlt, setNewImageAlt] = useState('');
  const [newImageColumn, setNewImageColumn] = useState<'1' | '2' | '3'>('1');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sortedColumnImages = (column: 1 | 2 | 3) => {
    return [...images.filter(img => img.column === column)]
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  };

  const column1Images = sortedColumnImages(1);
  const column2Images = sortedColumnImages(2);
  const column3Images = sortedColumnImages(3);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewImageFile(e.target.files[0]);
    }
  };

  const handleImageUpload = async () => {
    if (!newImageFile) {
      toast.error('Please select an image file');
      return;
    }

    setIsUploading(true);

    try {
      // In a real app, you'd upload to a server and get a URL back
      // For now, we'll create a local object URL
      const imageUrl = URL.createObjectURL(newImageFile);
      
      addImage({
        src: imageUrl,
        alt: newImageAlt || newImageFile.name,
        column: parseInt(newImageColumn) as 1 | 2 | 3
      });

      // Reset form
      setNewImageFile(null);
      setNewImageAlt('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Failed to upload image:', error);
      toast.error('Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Add New Image</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="image-file">Image File</Label>
            <Input 
              id="image-file"
              type="file" 
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="image-alt">Alt Text</Label>
            <Input 
              id="image-alt"
              placeholder="Describe the image"
              value={newImageAlt}
              onChange={(e) => setNewImageAlt(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="image-column">Column</Label>
            <Select 
              value={newImageColumn} 
              onValueChange={(value: '1' | '2' | '3') => setNewImageColumn(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select column" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Column 1 (Left)</SelectItem>
                <SelectItem value="2">Column 2 (Middle)</SelectItem>
                <SelectItem value="3">Column 3 (Right)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleImageUpload}
            disabled={isUploading || !newImageFile}
            className="w-full"
          >
            {isUploading ? 'Uploading...' : 'Upload Image'}
            <Upload size={16} className="ml-2" />
          </Button>
        </CardFooter>
      </Card>

      <Tabs defaultValue="column1">
        <TabsList className="mb-4">
          <TabsTrigger value="column1">Column 1</TabsTrigger>
          <TabsTrigger value="column2">Column 2</TabsTrigger>
          <TabsTrigger value="column3">Column 3</TabsTrigger>
        </TabsList>

        {[
          { key: 'column1', title: 'Column 1 (Left)', images: column1Images, column: 1 },
          { key: 'column2', title: 'Column 2 (Middle)', images: column2Images, column: 2 },
          { key: 'column3', title: 'Column 3 (Right)', images: column3Images, column: 3 }
        ].map(({ key, title, images: columnImages, column }) => (
          <TabsContent key={key} value={key} className="space-y-4">
            <h3 className="text-lg font-medium">{title}</h3>
            
            {columnImages.length === 0 ? (
              <p className="text-muted-foreground">No images in this column</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {columnImages.map((image) => (
                  <Card key={image.id} className="overflow-hidden">
                    <div className="aspect-[3/4] relative">
                      <img 
                        src={image.src} 
                        alt={image.alt}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm truncate">{image.alt}</p>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => deleteImage(image.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                      <div className="flex gap-2">
                        <Select 
                          value={image.column.toString() as '1' | '2' | '3'}
                          onValueChange={(value) => {
                            updateImage(image.id, { 
                              column: parseInt(value) as 1 | 2 | 3 
                            });
                          }}
                        >
                          <SelectTrigger className="w-full text-xs">
                            <SelectValue placeholder="Column" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">Column 1</SelectItem>
                            <SelectItem value="2">Column 2</SelectItem>
                            <SelectItem value="3">Column 3</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default GalleryManager;
