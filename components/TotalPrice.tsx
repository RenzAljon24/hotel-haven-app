import React from 'react';
import { View, Text } from 'react-native';

const TotalPriceDisplay = ({ totalPrice }: any) => {
  return (
    <View className='flex flex-row justify-between mx-6'>
      <Text className='text-lg font-pblack'>Total Price</Text>
      <Text className='text-lg font-pblack'>{totalPrice ? `₱ ${totalPrice}` : '₱ 0.00'}</Text>
    </View>
  );
};

export default TotalPriceDisplay;
