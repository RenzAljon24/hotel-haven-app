import React from 'react';
import { View, Text } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'expo-router';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();

  // If user is not authenticated, show a message or redirect
  if (!user) {
    router.push('/Login');
    return (
      <View>
        <Text>Redirecting to login...</Text>
      </View>
    );
  }

  return <>{children}</>;
}
