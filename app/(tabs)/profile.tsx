import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import ProtectedRoute from '@/components/ProtectedRoute';
import { router } from 'expo-router';

const Profile = () => {
    const { signOut, user } = useAuth();

    const Logout = () => {
        signOut();
    }

    return (
        <ProtectedRoute>
        <View className="mt-5">
            <View className="flex items-center">
                {user && user.profile ? (
                    <>
                        <Image
                            source={{ uri: user.profile }}
                            className="w-32 h-32 rounded-full"
                        />
                        <Text className="font-bold text-2xl pt-2">
                            {user.firstName} {user.lastName}
                        </Text>
                    </>
                ) : (
                    <Text className="font-bold text-lg pt-2">
                        No user data available
                    </Text>
                )}
            </View>

            <View className="p-10 gap-y-4">
                
              <TouchableOpacity 
                    style={{ flexDirection: 'row', alignItems: 'center' }}
                >
                    <FontAwesome6 name="contact-book" size={20} color="black" />
                    <Text className="font-bold text-lg ml-2">
                        Booking History
                    </Text>
                </TouchableOpacity>      

                <TouchableOpacity 
                    onPress={Logout} 
                    style={{ flexDirection: 'row', alignItems: 'center' }}
                >
                    <MaterialCommunityIcons name="logout" size={24} color="black" />
                    <Text className="font-bold text-lg ml-2">
                        Log out
                    </Text>
                </TouchableOpacity>


            </View>
        </View>
        </ProtectedRoute>
    );
}

export default Profile;
