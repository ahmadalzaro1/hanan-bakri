import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAdmin } from '@/contexts/AdminContext';
import { LogOut, Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from '@/components/ModeToggle';
import { Button } from './ui/button';

const Navigation = () => {
  const location = useLocation();
  const { isAuthenticated, logout } = useAdmin();
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/projects', label: 'Projects' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
    { path: '/book-appointment', label: 'Book Appointment' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-background/90 backdrop-blur-md z-50 border-b border-border">
      <div className="page-container py-4 flex items-center justify-between">
        <Link to="/" className="font-serif text-2xl font-bold">
          Hanan Bakri
        </Link>

        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" onClick={toggleMenu}>
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:w-64 p-6">
              <SheetHeader className="text-left mb-6">
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>
                  Navigate through the website.
                </SheetDescription>
              </SheetHeader>
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`block py-2 text-lg transition-colors hover:text-primary ${location.pathname === item.path ? 'text-primary font-medium' : 'text-foreground'}`}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                ))}
                {isAuthenticated && (
                  <Button variant="ghost" className="justify-start" onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                )}
                <ModeToggle />
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          <nav className="flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === item.path ? 'text-primary' : 'text-foreground/80'}`}
              >
                {item.label}
              </Link>
            ))}
            {isAuthenticated ? (
              <Button variant="ghost" size="sm" onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            ) : (
              <Link to="/admin">
                <Button variant="outline" size="sm">
                  Admin Login
                </Button>
              </Link>
            )}
            <ModeToggle />
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navigation;
