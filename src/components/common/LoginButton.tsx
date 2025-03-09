
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';

const LoginButton = () => {
  return (
    <Link to="/admin" className="fixed top-4 right-4 z-50">
      <Button variant="outline" className="bg-background/60 backdrop-blur-sm border-primary/20 hover:border-primary">
        <LogIn className="mr-2 h-4 w-4" />
        Admin Login
      </Button>
    </Link>
  );
};

export default LoginButton;
