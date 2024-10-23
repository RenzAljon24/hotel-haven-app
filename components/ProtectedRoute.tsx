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

    if(!user || user === null) {
      router.replace('/LandingPage')
    }

    
  }, [user, router]);



  return <>{children}</>;
};

export default ProtectedRoute;
