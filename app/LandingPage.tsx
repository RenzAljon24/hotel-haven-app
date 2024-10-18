import { View, Image, Text, TouchableOpacity } from 'react-native';
import { images } from '@/constants'; 
import { router } from 'expo-router';

const LandingPage = () => {
  return (
    <View className='flex flex-col mt-20 items-center'>
      <Image 
        source={images.landing} 
        className='absolute w-[400px] h-[420px]'     
      />
      <Text className='relative font-pbold mt-[383px]'>Easy way to book </Text>
      <Text className='text-2xl font-pbold mx-28 text-center'>your hotel room with us!</Text>
      <Image 
      source={images.slogo}
      className='mt-3'
      />
      <TouchableOpacity onPress={() => router.push('/(auth)/Login')}>
          <Text className='rounded-full text-center p-4 bg-[#15A86D] font-pbold text-white mt-8 w-80'>
            LOGIN
          </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/(auth)/Signup')}>
          <Text className='rounded-full text-center p-4 bg-white font-pbold mt-8 w-80'>
            SIGN UP
          </Text>
      </TouchableOpacity>
    </View>
  );
};


export default LandingPage;
