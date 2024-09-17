import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'expo-router';

interface AuthContextType {
  user: any;
  signIn: (user: any) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Simulate a login check when the app loads
  useEffect(() => {
    const checkUser = async () => {
      // Add logic here to check if user is logged in (e.g., from local storage, API call)
      const loggedInUser = await getUserFromStorageOrAPI();
      if (loggedInUser) {
        setUser(loggedInUser);
      } else {
        router.push('/Login'); // Redirect to login if no user
      }
    };

    checkUser();
  }, []);

  const signIn = (user: any) => {
    setUser(user);
    router.push('/(tabs)/'); // Redirect to a protected route after login
  };

  const signOut = () => {
    setUser(null);
    router.push('/Login'); // Redirect to login after sign out
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock function to get user
const getUserFromStorageOrAPI = async () => {
  // Replace with real authentication logic
  return null; // null if no user is logged in, otherwise return user data
};
