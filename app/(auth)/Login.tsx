import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { images } from '@/constants';
import { Link } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { MaterialIcons, Feather } from '@expo/vector-icons';

const Login = () => {
  const { signIn, error, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    signIn(email, password);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={{ flex: 1 }} 
    >
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }} 
        keyboardShouldPersistTaps='handled' 
      >
        <View className='flex flex-col items-center text-center mt-5'>
          {/* Logo Image */}
          <Image 
            source={images.slogo}
            style={{width: 225, height: 100}}
          />
          <Text className='font-pregular opacity-50' style={{fontSize: 13}}>Please enter your e-mail address{"\n"}             and enter password</Text>

          {/* Input Fields */}
          <View className='w-96 mt-20'>
            <View className='flex flex-row items-center p-3 rounded-full border border-gray-500 mb-4'>
            <MaterialIcons name='email' size={20} color='#888' />
              <TextInput
                placeholder='Enter your email' 
                placeholderTextColor="#BBB"
                className='ml-2 flex-1 rounded-full' 
                keyboardType='email-address'
                value={email}
                onChangeText={setEmail} 
                maxLength={30}
              />
            </View>
            <View className='flex flex-row items-center p-3 rounded-full mb-4 border border-gray-500'>
              <Feather name='lock' size={20} color='#888' />
              <TextInput 
                placeholder='Enter your password'
                placeholderTextColor="#BBB" 
                className='ml-2 flex-1' 
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword} 
                maxLength={30}
                autoCapitalize='none'
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Feather name={showPassword ? 'eye-off' : 'eye'} size={20} color='#888' />
              </TouchableOpacity>
            </View>
            {error && <Text className='text-red-700'>{error}</Text>}
          </View>

          {/* Forgot Password Link */}
          <Text className='text-blue-600 pt-1 pl-48 font-psemibold'style={{fontSize: 12, marginLeft: 15}}>
            Forgot your password?
          </Text>

          {/* Login Button and Other Links */}
          <View className='w-80 text-center mt-10'>
            <TouchableOpacity onPress={handleLogin} disabled={isLoading}>
              <Text className='rounded-full text-center p-4 bg-[#15A86D] font-pbold text-white'>
                {isLoading ? "Logging in..." : "Log in"}
              </Text>
            </TouchableOpacity>

            {/* Sign Up and Social Sign-In Links */}
            <View className='flex flex-col pt-5 gap-y-5'>
              <Text className='text-center font-pmedium'>
                Don’t have an account?
                <Link href='/(auth)/Signup'>
                  <Text className='text-blue-600 font-psemibold'> Sign up</Text>
                </Link>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;
