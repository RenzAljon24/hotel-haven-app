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
import Feather from '@expo/vector-icons/Feather';
import { green } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';


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
            <ScrollView className="p-5 mt-6">
                <View className="mt-7">
                    <View className=' flex items-center justify-center text-center'>
                    <TouchableOpacity onPress={pickImage} className="w-10">
                        <Text className=''><Feather name="camera" size={24} color="black" /></Text>
                    </TouchableOpacity>
                    </View>
                    {profileImage ? (
                        <Image
                            source={{ uri: profileImage }}
                            className="w-24 h-24 rounded-full mt-4 self-center"
                        />
                    ) : (
                        user?.profile && (
                            <Image
                                source={{ uri: user.profile }}
                                className="w-36 h-36 rounded-full mt-4 self-center"
                            />
                        )
                    )}
                </View>
                {error && (
                    <Text className="text-red-500 mb-4 text-center">
                        {error}
                    </Text>
                )}
                <View className="mb-4 mt-5">
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
                <View className="mt-5 text mx-28 ">
                    {isLoading ? (
                        
                    <TouchableOpacity disabled={isLoading}>
                    <Text className='bg-[#15A86D] text-center text-stone-100 p-3  rounded-full'><ActivityIndicator /></Text>
                   </TouchableOpacity>
                
                    ) : (
                        <TouchableOpacity onPress={handleUpdateProfile}>
                        <Text className='bg-[#15A86D]  text-center text-stone-100 p-3 rounded-full'>Save Changes</Text>
                        </TouchableOpacity>
                        
                    )}
                </View>
            </ScrollView>
        </ProtectedRoute>
    );
};

export default UpdateProfile;
