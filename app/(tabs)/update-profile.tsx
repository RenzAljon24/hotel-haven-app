import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, ScrollView, StyleSheet, Image, ActivityIndicator } from 'react-native';
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
            setProfileImage(result.assets[0].uri); // Fixed to correctly access the URI
        }
    };

    const handleUpdateProfile = async () => {
        setError(null);
        try {
            await updateProfile(firstName, lastName, profileImage);
        } catch (error: any) {
            setError('Failed to update profile. Please try again.');
        }
    };

    return (
        <ProtectedRoute>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.inputContainer}>
                    <Text>First Name</Text>
                    <TextInput
                        value={firstName}
                        onChangeText={setFirstName}
                        style={styles.input}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text>Last Name</Text>
                    <TextInput
                        value={lastName}
                        onChangeText={setLastName}
                        style={styles.input}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TouchableOpacity onPress={pickImage}>
                        <Text>Pick an image</Text>
                    </TouchableOpacity>
                    {profileImage ? (
                        <Image
                            source={{ uri: profileImage }}
                            style={styles.previewImage}
                        />
                    ) : (
                        user?.profile && (
                            <Image
                                source={{ uri: user.profile }}
                                style={styles.previewImage}
                            />
                        )
                    )}
                </View>
                {error && <Text style={styles.errorText}>{error}</Text>}
                <View style={styles.buttonContainer}>
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

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    inputContainer: {
        marginBottom: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
    },
    previewImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginTop: 10,
    },
    errorText: {
        color: 'red',
        marginBottom: 15,
    },
    buttonContainer: {
        marginTop: 20,
    },
});

export default UpdateProfile;
