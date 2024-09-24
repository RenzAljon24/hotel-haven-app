import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import axiosConfig from '@/helpers/axiosConfig';
import { Alert } from 'react-native';

interface AuthContextType {
  user: any;
  signIn: (email: string, password: string) => void;
  signUp: (first_name: string, last_name: string, email: string, password: string, confirmPassword: string, profile?: string) => void; // Updated type
  signOut: () => void;
  makeReservation: (total_price: number, room_id: number, check_in: string, check_out: string, ) => void;
  isLoading: boolean;
  error: string | null;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any | null>(null); // Use a more specific type if available
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const router = useRouter();

  useEffect(() => {
    // Load user from SecureStore on app start
    const loadUser = async () => {
      try {
        const storedUser = await SecureStore.getItemAsync('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (err) {
        console.log('Error loading user:', err);
        // Handle loading errors
      }
    };

    loadUser();
  }, []);


  const signUp =  (first_name: string, last_name: string, email: string, password: string, confirmPassword: string, profile: string = '') => {
    setIsLoading(true);

      axiosConfig.post('/register', {
        first_name,
        last_name,
        email,
        password,
        password_confirmation: confirmPassword,
        profile
      })
      .then(response => {
        console.log('User Created!')
        console.log(response.data);
        Alert.alert('User Created!');
        router.push('/(auth)/Login');

        setIsLoading(false);
        setError(null)
      })
      .catch(error => {
        console.log(error?.response.data.message);
        Alert.alert(error?.response.data.message)


      })

  };
  

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosConfig.post('/login', {
        email,
        password,
        device_name: 'mobile'
      });

      const userResponse = {
        token: response.data.token,
        id: response.data.user.id,
        first_name: response.data.user.first_name,
        last_name: response.data.user.last_name,
        email: response.data.user.email,
        profile: response.data.user.profile
      };

      await SecureStore.setItemAsync('user', JSON.stringify(userResponse)); // Store user 
      setUser(userResponse);
      router.push('/(tabs)/'); // Redirect to home 
    } catch (error: any) {
      // Handle errors 
      if (error.response) {
        //status code

        console.log('Sign in error response:', error.response.data);
        setError(error.response.data.message || 'Failed to sign in. Please check your credentials and try again.');
      } else if (error.request) {

        console.log('Sign in error request:', error.request);
        setError('No response received from the server. Please try again.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Sign in error message:', error.message);
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await SecureStore.deleteItemAsync('user'); // Remove user 
      setUser(null);
      router.push('/Login'); // Redirect to login 
    } catch (error: any) {
      // Handle errors 
      if (error.response) {
        //status code
        console.log('Sign out error response:', error.response.data);
        setError(error.response.data.message || 'Failed to sign out. Please try again.');
      } else if (error.request) {
        console.log('Sign out error request:', error.request);
        setError('No response received from the server. Please try again.');
      } else {
        console.log('Sign out error message:', error.message);
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };


  const makeReservation = async (room_id: number, total_price: number, check_in: string, check_out: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const storedUser = await SecureStore.getItemAsync('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        const token = parsedUser.token;

        const response = await axiosConfig.post(
          '/reservations', // Your API endpoint for reservations
          { room_id, check_in, check_out, total_price },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the Bearer token
              'Content-Type': 'application/json',
            },
          }
        );

        Alert.alert('Reservation successful!');
        console.log('Reservation response:', response.data);
      }
    } catch (error: any) {
      console.log('Reservation error:', error.message);
      setError(error.response?.data?.message || 'Failed to make reservation.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, signUp, makeReservation, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
