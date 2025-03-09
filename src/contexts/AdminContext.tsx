
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

type AdminContextType = {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check for existing session on mount
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Simple authentication - in a real app, you'd want to use proper auth
  const login = async (username: string, password: string): Promise<boolean> => {
    // This is a placeholder - in a real app, you'd validate against a server
    if (username === 'admin' && password === 'password') {
      localStorage.setItem('admin_token', 'temp-token-value');
      setIsAuthenticated(true);
      toast.success('Login successful');
      return true;
    } else {
      toast.error('Invalid credentials');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    setIsAuthenticated(false);
    toast.info('Logged out successfully');
  };

  return (
    <AdminContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};
