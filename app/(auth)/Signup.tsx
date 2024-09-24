import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { images } from '@/constants';
import { Link } from 'expo-router';
import { useAuth } from '@/context/AuthContext'; // Import the useAuth hook

const SignUp = () => {
  const { signUp, error, isLoading } = useAuth(); 
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword ,setConfirmPassword] = useState('');

  const handleSignUp = () => {
    // Call the signIn function with email and password
    signUp(firstName, lastName, email, password, confirmPassword);
  };

  return (
    <View className='flex flex-col items-center text-center mt-20'>
      {/* Logo Image */}
      <Image 
        source={images.logo}
        className='' // Margin for spacing below the image
      />

      {/* Input Fields */}
    <View className='w-96 mt-12'>
      <TextInput 
          placeholder='Enter your first name' 
          className='border p-3 rounded-lg border-gray-500' 
          value={firstName}
          onChangeText={setFirstName} // Update email state
        />
        <TextInput 
          placeholder='Enter your last name' 
          className='border p-3 rounded-lg border-gray-500 mt-6' 
          keyboardType='email-address'
          value={lastName}
          onChangeText={setLastName} // Update email state
        />
        <TextInput 
          placeholder='Enter your email' 
          className='border p-3 rounded-lg border-gray-500 mt-6' 
          keyboardType='email-address'
          value={email}
          onChangeText={setEmail} // Update email state
        />
        <TextInput 
          placeholder='Enter your password' 
          className='border p-3 rounded-lg border-gray-500 mt-6' 
          secureTextEntry
          value={password}
          onChangeText={setPassword} // Update password state
        />
        <TextInput 
          placeholder='Confirm Password' 
          className='border p-3 rounded-lg border-gray-500 mt-6' 
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword} // Update password state
        />
         {error && <Text className='text-red-700'>{error}</Text>}
       
      </View>

      {/* Login Button and Other Links */}
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
              <Text className='text-blue-600'>  Log in</Text>
            </Link>
          </Text>
          <Text className='text-center font-pmedium'>Or</Text>
          <Text className='text-center font-pmedium'>
            You can sign in with any of these
          </Text>
        </View>
      </View>
    </View>
  );
};

export default SignUp;
