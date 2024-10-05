import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { images } from '@/constants';
import { Link } from 'expo-router';
import { useAuth } from '@/context/AuthContext'; 

const SignUp = () => {
  const { signUp, error, isLoading } = useAuth(); 
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    signUp(firstName, lastName, email, password, confirmPassword);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }} 
        keyboardShouldPersistTaps='handled' // Dismiss keyboard on tap outside
      >
        <View className='flex flex-col items-center text-center mt-20'>
          {/* Logo Image */}
          <Image 
            source={images.logo}
            className=''
          />

          {/* Input Fields */}
          <View className='w-96 mt-12'>
            <TextInput 
              placeholder='Enter your first name' 
              className='border p-3 rounded-lg border-gray-500' 
              textContentType='givenName'
              value={firstName}
              onChangeText={(text) => setFirstName(text.replace(/[^a-zA-Z]/g, ''))}
            />
            <TextInput 
              placeholder='Enter your last name' 
              className='border p-3 rounded-lg border-gray-500 mt-6' 
              value={lastName}
              onChangeText={(text) => setLastName(text.replace(/[^a-zA-Z]/g, ''))}
            />
            <TextInput 
              placeholder='example@test.com' 
              className='border p-3 rounded-lg border-gray-500 mt-6' 
              keyboardType='email-address'
              value={email}
              onChangeText={setEmail}
            />
            <TextInput 
              placeholder='Enter your password' 
              className='border p-3 rounded-lg border-gray-500 mt-6' 
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <TextInput 
              placeholder='Confirm Password' 
              className='border p-3 rounded-lg border-gray-500 mt-6' 
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            {error && <Text className='text-red-700'>{error}</Text>}
          </View>

          {/* Sign Up Button and Links */}
          <View className='w-80 text-center mt-10'>
            <TouchableOpacity onPress={handleSignUp}>
              <Text className='rounded-xl text-center p-4 bg-[#15A86D] font-pbold text-white'>
                Sign up
              </Text>
            </TouchableOpacity>

            {/* Sign Up and Social Sign-In Links */}
            <View className='flex flex-col pt-5 gap-y-5'>
              <Text className='text-center font-pmedium'>
                Already have an account?
                <Link href='/(auth)/Login'>
                  <Text className='text-blue-600'> Log in</Text>
                </Link>
              </Text>
              <Text className='text-center font-pmedium'>Or</Text>
              <Text className='text-center font-pmedium'>
                You can sign in with any of these
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
