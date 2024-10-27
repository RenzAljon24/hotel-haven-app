import React from 'react';
import { View, Text } from 'react-native';

const TotalPriceDisplay = ({ totalPrice }: any) => {
  return (
    <View className='flex flex-row justify-between mx-6 mt-24'>
      <Text className='text-lg font-pregular mb-5 mt-8 text-gray-500 text-center' style={{fontSize: 13, position: 'absolute', transform: [{translateY:55}]}} >Total Payable Amount {'\n'}<Text className='text-lg font-pbold' style={{color: '#15A86D', fontSize: 18}}>{totalPrice ? `₱ ${totalPrice}` : '₱ 0.00'}</Text></Text>
    </View>
  );
};

export default TotalPriceDisplay;
