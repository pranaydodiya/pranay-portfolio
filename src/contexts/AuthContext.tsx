
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';

// Define the structure of our auth context
type AuthContextType = {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
};

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: async () => false,
  logout: () => {},
  loading: true,
});

// Custom hook for using the auth context
export const useAuth = () => useContext(AuthContext);

// The allowed admin email and password
const ADMIN_EMAIL = "pranaydodiya2005@gmail.com";
const ADMIN_PASSWORD = "Pran2005@";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check if user is already logged in on component mount
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('adminToken');
      if (token) {
        try {
          // Verify the token
          const payload = JSON.parse(atob(token.split('.')[1]));
          const isValid = payload.exp > Date.now() / 1000;
          const isAdmin = payload.email === ADMIN_EMAIL;
          
          setIsAuthenticated(isValid && isAdmin);
        } catch (error) {
          // If token is invalid, clear it
          localStorage.removeItem('adminToken');
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    // Simple validation
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Create a simple JWT-like token
      const payload = {
        email,
        exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60), // 7 days expiry
      };
      
      const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify(payload))}.signature`;
      localStorage.setItem('adminToken', token);
      
      setIsAuthenticated(true);
      toast({
        title: "Login successful",
        description: "Welcome back, Pranay!",
      });
      
      return true;
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
      
      return false;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate('/');
  };

  const value = {
    isAuthenticated,
    login,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
