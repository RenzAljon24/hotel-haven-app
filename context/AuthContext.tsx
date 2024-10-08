import React, {createContext, useContext, useState, ReactNode, useEffect} from 'react';
import {useRouter} from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import axiosConfig from '@/helpers/axiosConfig';
import {Alert} from 'react-native';

interface User {
    token: string;
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    profile: string;
}

interface AuthContextType {
    user: User | null;
    signIn: (email: string, password: string) => void;
    signUp: (firstName: string, lastName: string, email: string, password: string, confirmPassword: string, profile?: string) => void;
    signOut: () => void;
    makeReservation: (totalPrice: number, roomId: number, checkIn: string, checkOut: string) => void;
    isLoading: boolean;
    error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
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

    const parseUser = (storedUser: string): User => {
        return JSON.parse(storedUser);
    };

    const storeUser = async (userData: User) => {
        await SecureStore.setItemAsync('user', JSON.stringify(userData));
        setUser(userData);
    };

    const signUp = async(firstName: string, lastName: string, email: string, password: string, confirmPassword: string, profile: string = '') => {
        setIsLoading(true);
       await axiosConfig.post('/register', {
            first_name: firstName,
            last_name: lastName,
            email,
            password,
            password_confirmation: confirmPassword,
            profile
        })
            .then(response => {
                Alert.alert('User Created!');
                router.push('/(auth)/Login');
                setError(null)
            })
            .catch(error => {
                handleRequestError(error?.response.data.message);
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
                device_name: 'mobile'
            });
            const userResponse: User = {
                token: response.data.token,
                id: response.data.user.id,
                firstName: response.data.user.first_name,
                lastName: response.data.user.last_name,
                email: response.data.user.email,
                profile: response.data.user.profile
            };
            await storeUser(userResponse);
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
                const response = await axiosConfig.post(
                    '/reservations',
                    {room_id: roomId, check_in: checkIn, check_out: checkOut, total_price: totalPrice},
                    {
                        headers: {
                            Authorization: `Bearer ${parsedUser.token}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );
                console.log('reservation successful!')
            }
        } catch (error: any) {
            handleRequestError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{user, signIn, signOut, signUp, makeReservation, isLoading, error}}>
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