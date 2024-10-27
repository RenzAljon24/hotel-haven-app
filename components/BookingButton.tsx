import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

const BookingButton = ({ onPress, loading }: any) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={loading}>
      <View className='flex-1 justify-space-between'>
      <Text className=' text-lg text-center text-white mx-6 my-4 font-pbold bg-green-600 py-3 rounded-full ml-52 w-52 mt-24 flex-1'>
        {loading ? "Loading..." : "Pay now"}
      </Text>
      </View>
    </TouchableOpacity>
  );
};

export default BookingButton;
