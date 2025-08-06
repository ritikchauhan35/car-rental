import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface SecurityContextType {
  isBlocked: boolean;
  loginAttempts: number;
  sessionTimeout: number;
  resetLoginAttempts: () => void;
  incrementLoginAttempts: () => void;
  extendSession: () => void;
}

const SecurityContext = createContext<SecurityContextType>({
  isBlocked: false,
  loginAttempts: 0,
  sessionTimeout: 30 * 60 * 1000, // 30 minutes
  resetLoginAttempts: () => {},
  incrementLoginAttempts: () => {},
  extendSession: () => {},
});

export const useSecurity = () => {
  const context = useContext(SecurityContext);
  if (!context) {
    throw new Error('useSecurity must be used within a SecurityProvider');
  }
  return context;
};

interface SecurityProviderProps {
  children: React.ReactNode;
}

export const SecurityProvider: React.FC<SecurityProviderProps> = ({ children }) => {
  const { currentUser, logout } = useAuth();
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const sessionTimeout = 30 * 60 * 1000; // 30 minutes
  const maxLoginAttempts = 5;
  const blockDuration = 15 * 60 * 1000; // 15 minutes

  // Session timeout monitoring
  useEffect(() => {
    if (!currentUser) return;

    const checkSessionTimeout = () => {
      const now = Date.now();
      if (now - lastActivity > sessionTimeout) {
        logout();
        alert('Session expired due to inactivity. Please log in again.');
      }
    };

    const interval = setInterval(checkSessionTimeout, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [currentUser, lastActivity, sessionTimeout, logout]);

  // Activity tracking
  useEffect(() => {
    const updateActivity = () => {
      setLastActivity(Date.now());
    };

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, updateActivity, true);
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, updateActivity, true);
      });
    };
  }, []);

  // Login attempt blocking
  useEffect(() => {
    if (loginAttempts >= maxLoginAttempts) {
      setIsBlocked(true);
      setTimeout(() => {
        setIsBlocked(false);
        setLoginAttempts(0);
      }, blockDuration);
    }
  }, [loginAttempts, maxLoginAttempts, blockDuration]);

  const resetLoginAttempts = () => {
    setLoginAttempts(0);
    setIsBlocked(false);
  };

  const incrementLoginAttempts = () => {
    setLoginAttempts(prev => prev + 1);
  };

  const extendSession = () => {
    setLastActivity(Date.now());
  };

  const value = {
    isBlocked,
    loginAttempts,
    sessionTimeout,
    resetLoginAttempts,
    incrementLoginAttempts,
    extendSession,
  };

  return (
    <SecurityContext.Provider value={value}>
      {children}
    </SecurityContext.Provider>
  );
};