import React from 'react';
import { View, Text } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'expo-router';

interface ProtectedRouteProps {
  children: React.ReactNode; 
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (user === null) {
      // Redirect to login page if not authenticated
      router.push('/LandingPage');
    }
    if(!user) {
      router.push('/LandingPage')
    }
  }, [user, router]);


  return <>{children}</>; // Render children if user is authenticated
};

export default ProtectedRoute;
