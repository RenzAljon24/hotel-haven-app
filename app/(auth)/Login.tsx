import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { images } from '@/constants';
import { Link } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

const Login = () => {
  const { signIn, error, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    signIn(email, password);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adjust behavior based on platform
      style={{ flex: 1 }} // Fill the available space
    >
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }} // Center content
        keyboardShouldPersistTaps='handled' // Dismiss keyboard on tapping outside
      >
        <View className='flex flex-col items-center text-center mt-20'>
          {/* Logo Image */}
          <Image 
            source={images.logo}
            className='' 
          />

          {/* Input Fields */}
          <View className='w-96 mt-20'>
            <TextInput 
              placeholder='Enter your email' 
              className='border p-3 rounded-lg border-gray-500' 
              keyboardType='email-address'
              value={email}
              onChangeText={setEmail} 
            />
            <TextInput 
              placeholder='Enter your password' 
              className='border p-3 rounded-lg border-gray-500 mt-8' 
              secureTextEntry
              value={password}
              onChangeText={setPassword} 
            />
            {error && <Text className='text-red-700'>{error}</Text>}
          </View>

          {/* Forgot Password Link */}
          <Text className='text-blue-600 pt-1 pl-48 font-pregular'>
            Forgot your password?
          </Text>

          {/* Login Button and Other Links */}
          <View className='w-80 text-center mt-10'>
            <TouchableOpacity onPress={handleLogin}>
              <Text className='rounded-xl text-center p-4 bg-[#15A86D] font-pbold text-white'>
                LOGIN
              </Text>
            </TouchableOpacity>

            {/* Sign Up and Social Sign-In Links */}
            <View className='flex flex-col pt-5 gap-y-5'>
              <Text className='text-center font-pmedium'>
                Don’t have an account?
                <Link href='/(auth)/Signup'>
                  <Text className='text-blue-600'> Sign up</Text>
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

export default Login;
