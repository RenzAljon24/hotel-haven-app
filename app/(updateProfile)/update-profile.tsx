import React, { useState } from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    ScrollView, 
    Image, 
    ActivityIndicator 
} from 'react-native';
import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import * as ImagePicker from 'expo-image-picker';
import Feather from '@expo/vector-icons/Feather';
import { Ionicons } from '@expo/vector-icons';

const UpdateProfile = () => {
    const { user, updateProfile, isLoading } = useAuth();
    const [firstName, setFirstName] = useState(user ? user.firstName : '');
    const [lastName, setLastName] = useState(user ? user.lastName : '');
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setProfileImage(result.assets[0].uri);
        }
    };

    const handleUpdateProfile = async () => {
        setError(null);
        try {
            await updateProfile(firstName, lastName, profileImage || "");
        } catch (error: any) {
            setError('Failed to update profile. Please try again.');
        }
    };

    return (
        <ProtectedRoute>
            <ScrollView className="p-5 bg-white">
                <View className="mt-6">
                <Ionicons className='m-4' name="arrow-back-outline" size={28} color="black" />
                    <View className='flex items-center justify-center text-center '>
                        {profileImage ? (
                            <Image
                                source={{ uri: profileImage }}
                                className="w-32 h-32 rounded-full border-4 border-gray-300 shadow-lg mt-4 relative"
                            />
                        ) : (
                            user?.profile && (
                                <Image
                                    source={{ uri: user.profile }}
                                    className="w-32 h-32 rounded-full border-4 border-gray-300 shadow-lg mt-4 relative"
                                />
                            )
                        )}
                        {/* Camera Icon Overlay */}
                        <TouchableOpacity 
                            onPress={pickImage} 
                            className="absolute bottom-0 right-36  bg-white p-1 rounded-full shadow"
                        >
                            <Feather name="camera" size={38} color="#15A86D" />
                        </TouchableOpacity>
                    </View>
                    {error && (
                        <Text className="text-red-500 mb-4 text-center">
                            {error}
                        </Text>
                    )}
                    <View className="mb-4 mt-5">
                        <Text className="text-lg font-psemibold">First Name</Text>
                        <TextInput
                            value={firstName}
                            onChangeText={setFirstName}
                            className="border border-gray-300 p-2 mt-1 rounded-lg"
                            placeholder="Enter your first name"
                        />
                    </View>
                    <View className="mb-4">
                        <Text className="text-lg font-psemibold">Last Name</Text>
                        <TextInput
                            value={lastName}
                            onChangeText={setLastName}
                            className="border border-gray-300 p-2 rounded-lg mt-1 "
                            placeholder="Enter your last name"
                        />
                    </View>
                    <View className="mt-5 mx-4">
                        {isLoading ? (
                            <TouchableOpacity disabled={isLoading}>
                                <View className='bg-[#15A86D] p-3 rounded-full flex-row justify-center items-center'>
                                    <ActivityIndicator color="#fff" />
                                </View>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={handleUpdateProfile}>
                                <Text className='bg-[#15A86D] text-center font-pmedium text-white p-3 rounded-full'>
                                    Save Changes
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </ScrollView>
        </ProtectedRoute>
    );
};

export default UpdateProfile;
