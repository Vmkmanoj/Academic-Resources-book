import { useState } from 'react';
import { User } from '../types';
import { mockUsers } from '../data/mockUsers';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string) => {
    // Check for both student and admin credentials
    if (
      (email === 'User@kongu.edu' && password === 'kongu123') ||
      (email === 'admin@kongu.edu' && password === 'kongu123')
    ) {
      const user = mockUsers.find(u => u.email === email);
      if (user) {
        setIsAuthenticated(true);
        setUser(user);
        return true;
      }
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return {
    isAuthenticated,
    user,
    login,
    logout
  };
};