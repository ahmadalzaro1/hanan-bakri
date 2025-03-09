
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '@/contexts/AdminContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import GalleryManager from '@/components/admin/GalleryManager';
import HeroEditor from '@/components/admin/HeroEditor';

const AdminDashboard = () => {
  const { isAuthenticated, logout } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  if (!isAuthenticated) {
    return null; // Will redirect due to the useEffect
  }

  return (
    <div className="min-h-screen bg-secondary/20">
      <header className="bg-white shadow-sm py-4">
        <div className="page-container flex justify-between items-center">
          <h1 className="text-2xl font-serif">Admin Dashboard</h1>
          <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut size={16} />
            Logout
          </Button>
        </div>
      </header>

      <main className="page-container py-8">
        <Tabs defaultValue="gallery" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="gallery">Gallery Manager</TabsTrigger>
            <TabsTrigger value="hero">Hero Section</TabsTrigger>
          </TabsList>
          
          <TabsContent value="gallery" className="bg-white p-6 rounded-md shadow-sm">
            <GalleryManager />
          </TabsContent>
          
          <TabsContent value="hero" className="bg-white p-6 rounded-md shadow-sm">
            <HeroEditor />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
