import React, { useState } from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    Button, 
    TouchableOpacity, 
    ScrollView, 
    Image, 
    ActivityIndicator 
} from 'react-native';
import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import * as ImagePicker from 'expo-image-picker';


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
            <ScrollView className="p-5">
                <View className="mb-4">
                    <Text className="text-lg font-semibold">First Name</Text>
                    <TextInput
                        value={firstName}
                        onChangeText={setFirstName}
                        className="border border-gray-300 p-3 rounded mt-1"
                    />
                </View>
                <View className="mb-4">
                    <Text className="text-lg font-semibold">Last Name</Text>
                    <TextInput
                        value={lastName}
                        onChangeText={setLastName}
                        className="border border-gray-300 p-3 rounded mt-1"
                    />
                </View>
                <View className="mb-4">
                    <TouchableOpacity onPress={pickImage} className="">
                        <Text className="text-white text-center font-semibold bg-blue-500 p-3 rounded">Pick an Image</Text>
                    </TouchableOpacity>
                    {profileImage ? (
                        <Image
                            source={{ uri: profileImage }}
                            className="w-24 h-24 rounded-full mt-4 self-center"
                        />
                    ) : (
                        user?.profile && (
                            <Image
                                source={{ uri: user.profile }}
                                className="w-24 h-24 rounded-full mt-4 self-center"
                            />
                        )
                    )}
                </View>
                {error && (
                    <Text className="text-red-500 mb-4 text-center">
                        {error}
                    </Text>
                )}
                <View className="mt-5">
                    {isLoading ? (
                        <ActivityIndicator size="large" color="#0000ff" />
                    ) : (
                        <Button title="Update Profile" onPress={handleUpdateProfile} />
                    )}
                </View>
            </ScrollView>
        </ProtectedRoute>
    );
};

export default UpdateProfile;
