import React, { useEffect, useState, createContext, useContext } from 'react';
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}
interface AuthContextType {
  isLoaded: boolean;
  isSignedIn: boolean;
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  signOut: () => void;
}
const mockUser: User = {
  id: '1',
  firstName: 'Demo',
  lastName: 'User',
  email: 'demo@example.com',
  role: 'Admin'
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('auth_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsSignedIn(true);
    }
    setIsLoaded(true);
  }, []);
  const signIn = async (email: string, password: string) => {
    // Mock authentication - in a real app, this would call an API
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          setUser(mockUser);
          setIsSignedIn(true);
          localStorage.setItem('auth_user', JSON.stringify(mockUser));
          resolve();
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 500);
    });
  };
  const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
    // Mock registration
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (email && password && firstName && lastName) {
          const newUser = {
            ...mockUser,
            firstName,
            lastName,
            email
          };
          setUser(newUser);
          setIsSignedIn(true);
          localStorage.setItem('auth_user', JSON.stringify(newUser));
          resolve();
        } else {
          reject(new Error('Please fill all required fields'));
        }
      }, 500);
    });
  };
  const signOut = () => {
    setUser(null);
    setIsSignedIn(false);
    localStorage.removeItem('auth_user');
  };
  return <AuthContext.Provider value={{
    isLoaded,
    isSignedIn,
    user,
    signIn,
    signUp,
    signOut
  }}>
      {children}
    </AuthContext.Provider>;
};
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};