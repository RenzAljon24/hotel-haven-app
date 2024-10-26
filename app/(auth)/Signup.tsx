import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons';
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignUp = () => {
    signUp(firstName, lastName, email, password, confirmPassword);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className='flex-1'
    >
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }} 
        keyboardShouldPersistTaps='handled' 
      >
        <View className='flex flex-col items-center text-center mt-20'>
          {/* Logo Image */}
          <Image 
            source={images.slogo}
            className='w-52 h-24'
          />
           <Text className='font-pregular opacity-50' style={{fontSize: 15}}>Please fill up the fields below{"\n"}  and create your password</Text>

          {/* Input Fields */}
          <View className='w-96 mt-12'>
            {/* First Name Field */}
            <View className='flex flex-row items-center p-3 rounded-full border border-gray-500 mb-4'>
              <MaterialIcons name='person' size={20} color='#888' />
              <TextInput
        
                placeholder='Enter your first name' 
                placeholderTextColor="#BBB"
                className='ml-2 flex-1'
                textContentType='givenName'
                value={firstName}
                onChangeText={(text) => setFirstName(text.replace(/[^a-zA-Z-\s]/g, ''))}
              />
            </View>

            {/* Last Name Field */}
            <View className='flex flex-row items-center p-3 rounded-full border border-gray-500 mb-4'>
              <MaterialIcons name='person' size={20} color='#888' />
              <TextInput 
               placeholderTextColor="#BBB"
                placeholder='Enter your last name' 
                className='ml-2 flex-1'
                value={lastName}
                onChangeText={(text) => setLastName(text.replace(/[^a-zA-Z-\s]/g, ''))}
              />
            </View>

            {/* Email Field */}
            <View className='flex flex-row items-center p-3 rounded-full border border-gray-500 mb-4'>
              <MaterialIcons name='email' size={20} color='#888' />
              <TextInput 
               placeholderTextColor="#BBB"
                placeholder='example@test.com' 
                className='ml-2 flex-1'
                keyboardType='email-address'
                value={email}
                onChangeText={setEmail}
              />
            </View>

            {/* Password Field */}
            <View className='flex flex-row items-center p-3 rounded-full border border-gray-500 mb-4'>
              <Feather name='lock' size={20} color='#888' />
              <TextInput 
                placeholderTextColor="#BBB"
                placeholder='Enter your password' 
                className='ml-2 flex-1'
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Feather name={showPassword ? 'eye-off' : 'eye'} size={20} color='#888' />
              </TouchableOpacity>
            </View>

            {/* Confirm Password Field */}
            <View className='flex flex-row items-center p-3 rounded-full border border-gray-500'>
              <Feather name='lock' size={20} color='#888' />
              <TextInput 
                placeholderTextColor="#BBB"
                placeholder='Confirm Password' 
                className='ml-2 flex-1'
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Feather name={showConfirmPassword ? 'eye-off' : 'eye'} size={20} color='#888' />
              </TouchableOpacity>
            </View>

            {error && <Text className='text-red-700 mt-4'>{error}</Text>}
          </View>

          {/* Sign Up Button and Links */}
          <View className='w-80 text-center mt-10'>
            <TouchableOpacity onPress={handleSignUp} disabled={isLoading}>
              <Text className='rounded-full text-center p-4 bg-[#15A86D] font-pbold shadow-md' style={{color: '#B5FFD3'}}>
                {isLoading ? 'Signing up...' : 'Sign up'}
              </Text>
            </TouchableOpacity>

            {/* Sign Up and Social Sign-In Links */}
            <View className='flex flex-col pt-5 gap-y-5'>
              <Text className='text-center font-pmedium'>
                Already have an account?
                <Link href='/(auth)/Login'>
                  <Text className='text-blue-600 font-psemibold'> Log in</Text>
                </Link>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;