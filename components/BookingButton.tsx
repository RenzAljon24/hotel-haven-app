import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const BookingButton = ({ onPress, loading }: any) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={loading}>
      <Text className='text-lg text-center text-white mx-6 my-4 bg-green-600 py-3 rounded-lg'>
        {loading ? "Loading..." : "Book Now"}
      </Text>
    </TouchableOpacity>
  );
};

export default BookingButton;
