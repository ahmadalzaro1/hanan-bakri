
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { CalendarIcon, Clock } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    message: '',
    sizeDetails: '',
    includeSizeDetails: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, includeSizeDetails: checked }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Appointment form submitted:', formData);
    
    // Show success message
    toast.success("Appointment Request Sent", {
      description: "We'll contact you shortly to confirm your appointment.",
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      message: '',
      sizeDetails: '',
      includeSizeDetails: false,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your email"
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Your phone number"
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="date">Preferred Date</Label>
          <div className="relative">
            <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              className="pl-10"
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="time">Preferred Time</Label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              id="time"
              name="time"
              type="time"
              value={formData.time}
              onChange={handleChange}
              className="pl-10"
              required
            />
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center space-x-2 mb-2">
          <Checkbox 
            id="includeSizeDetails" 
            checked={formData.includeSizeDetails}
            onCheckedChange={handleCheckboxChange}
          />
          <Label 
            htmlFor="includeSizeDetails" 
            className="text-sm cursor-pointer"
          >
            Include Size Details (Optional)
          </Label>
        </div>
        
        {formData.includeSizeDetails && (
          <Textarea
            id="sizeDetails"
            name="sizeDetails"
            value={formData.sizeDetails}
            onChange={handleChange}
            placeholder="Please provide your size details here (measurements, preferred fit, etc.)"
            rows={3}
          />
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="message">Message (Optional)</Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Please let us know if you have any specific requirements or questions."
          rows={4}
        />
      </div>
      
      <div>
        <Button
          type="submit"
          className="w-full md:w-auto"
        >
          Request Appointment
        </Button>
      </div>
    </form>
  );
};

export default AppointmentForm;
