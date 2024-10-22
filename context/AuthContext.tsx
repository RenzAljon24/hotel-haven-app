import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import axiosConfig from '@/helpers/axiosConfig';
import CustomModal from '@/components/CustomModal'; // Import CustomModal component
import { AuthContextType, User } from '@/types/type';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');
  const [modalType, setModalType] = useState<'success' | 'error'>('success');
  const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await SecureStore.getItemAsync('user');
        if (storedUser) {
          setUser(parseUser(storedUser));
        }
      } catch (err) {
        console.error('Error loading user:', err);
      }
    };
    loadUser();
  }, []);

  const handleRequestError = (error: any) => {
    if (error.response) {
      console.log('Error response:', error?.response.data.message);
      setError(error?.response.data.message || 'An error occurred. Please try again.');
    } else if (error.request) {
      console.log('Error request:', error.request);
      setError('No response received from the server. Please try again.');
    } else {
      console.log('Error message:', error.message);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const parseUser = (storedUser: string): User => {
    return JSON.parse(storedUser);
  };

  const storeUser = async (userData: User) => {
    await SecureStore.setItemAsync('user', JSON.stringify(userData));
    setUser(userData);
  };

  const signUp = async (
      firstName: string,
      lastName: string,
      email: string,
      password: string,
      confirmPassword: string,
      profile: string = ''
  ) => {
    setIsLoading(true);
    await axiosConfig
        .post('/register', {
          first_name: firstName,
          last_name: lastName,
          email,
          password,
          password_confirmation: confirmPassword,
          profile,
        })
        .then((response) => {
          setModalMessage('User Created!');
          setModalType('success');
          setIsModalVisible(true);
          router.push('/(auth)/Login');
          setError(null);
        })
        .catch((error) => {
          handleRequestError(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
  };

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosConfig.post('/login', {
        email,
        password,
        device_name: 'mobile',
      });
      const userResponse: User = {
        token: response.data.token,
        id: response.data.user.id,
        firstName: response.data.user.first_name,
        lastName: response.data.user.last_name,
        email: response.data.user.email,
        profile: response.data.user.profile,
      };
      await storeUser(userResponse);
      setModalMessage('Login Successful!');
      setModalType('success');
      setIsModalVisible(true);
      router.push('/(tabs)/');
    } catch (error: any) {
      handleRequestError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await SecureStore.deleteItemAsync('user');
      setUser(null);
      router.push('/Login');
    } catch (error: any) {
      handleRequestError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const makeReservation = async (roomId: number, totalPrice: number, checkIn: string, checkOut: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const storedUser = await SecureStore.getItemAsync('user');
      if (storedUser) {
        const parsedUser = parseUser(storedUser);
        await axiosConfig.post(
            '/reservations',
            { room_id: roomId, check_in: checkIn, check_out: checkOut, total_price: totalPrice },
            {
              headers: {
                Authorization: `Bearer ${parsedUser.token}`,
                'Content-Type': 'application/json',
              },
            }
        );
      }
    } catch (error: any) {
      handleRequestError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getUserTransactions = async (): Promise<any[]> => {
    try {
      const storedUser = await SecureStore.getItemAsync('user');
      if (storedUser) {
        const parsedUser = parseUser(storedUser);
        const response = await axiosConfig.get('/user/transactions', {
          headers: {
            Authorization: `Bearer ${parsedUser.token}`,
          },
        });
        return response.data;
      }
      return [];
    } catch (error: any) {
      handleRequestError(error);
      return [];
    }
  };

  const updateProfile = async (firstName: string, lastName: string, profileImage?: string) => {
    setIsLoading(true);
    setError(null);

    // Create the data object
    let data: { first_name: string; last_name: string; profile?: string } = {
        first_name: firstName,
        last_name: lastName,
    };

    // If profileImage is provided, convert it to base64
    if (profileImage) {
        try {
            // Convert the image to base64
            const profileBase64 = await FileSystem.readAsStringAsync(profileImage, {
                encoding: FileSystem.EncodingType.Base64,
            });
            data = {
                ...data,
                profile: `data:image/jpeg;base64,${profileBase64}`, // Prefix with data type for easy recognition
            };
        } catch (error) {
            setError('Failed to process the profile image.');
            setIsLoading(false);
            return;
        }
    }

    try {
        // Retrieve stored user
        const storedUser = await SecureStore.getItemAsync('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);

            // Make an Axios PUT request to update profile using JSON
            const response = await axios.put('http://152.42.167.15/api/user/profile', data, {
                headers: {
                    Authorization: `Bearer ${parsedUser.token}`,
                    'Content-Type': 'application/json',
                },
            });

            // Log response for debugging
            console.log('Update profile response:', response.data);

            // Update the user data based on the response
            const updatedUser = {
                ...parsedUser,
                firstName: response.data.user.first_name,
                lastName: response.data.user.last_name,
                profile: response.data.user.profile,
            };

            // Store updated user information
            await storeUser(updatedUser);

            // Set modal message to inform the user of success
            setModalMessage('Profile updated successfully!');
            setModalType('success');
            setIsModalVisible(true);

            // Update local user state
            setUser(updatedUser);
        }
    } catch (error: any) {
        // Log the error for better debugging
        if (error.response) {
            console.error('Server responded with an error:', error.response.data);
            handleRequestError(error.response.data.message || 'Server error. Please try again.');
        } else {
            console.error('Update profile error:', error);
            handleRequestError('An error occurred while updating the profile. Please try again.');
        }
    } finally {
        setIsLoading(false);
    }
};

  


  return (
      <AuthContext.Provider value={{ user, signIn, signOut, signUp, makeReservation, getUserTransactions, updateProfile, isLoading, error }}>
        {children}
        <CustomModal visible={isModalVisible} message={modalMessage} type={modalType} onClose={handleModalClose} />
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