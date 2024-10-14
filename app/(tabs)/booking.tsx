import { View, Text, Image, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { images } from '@/constants';
import { router } from 'expo-router';

const Booking = () => {
  const { getUserTransactions } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [transactionHistory, setTransactionHistory] = useState<any[]>([]);

  useEffect(() => {
    const getTransaction = async () => {
      setIsLoading(true);
      try {
        const transactions = await getUserTransactions('2024-10-10', '2024-10-12', 500, 'confirmed', 'room_image');
        setTransactionHistory(transactions);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setIsLoading(false);
      }
    };
    getTransaction(); 
  }, []);

  return (
    <View className='flex-1 bg-gray-200 p-4'>
      {isLoading ? (
        <ActivityIndicator size='large' color='#0000ff' />
      ) : transactionHistory.length === 0 ? (
        <View className='flex-1 justify-center items-center'>
          <Image
          source={images.roomdoor}
          className='h-48'
          />
          <Text className='text-lg font-semibold text-gray-800 mt-5 font-pblack'>No booked rooms found.</Text>
          <Text className='font-pregular text-gray-800 mt-2 mx-14'>
            For easy bookings, save rooms you’ve enjoyed staying in.
          </Text>
          <Text className='font-pregular text-gray-800 mt-1 mx-14'>
            For quick access, choose rooms that met your preferences.
          </Text>
          <TouchableOpacity onPress={()=> router.push('/(tabs)/')}>
            <Text className='mt-4 text-white text-center font-semibold bg-green-600 p-3 rounded-lg font-pblack'>Go Back</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView>
          {transactionHistory.map((transaction, index) => (
            <View
              key={index}
              className='flex flex-row bg-white p-4 mb-4 rounded-xl shadow-md'
              style={{ elevation: 3 }}
            >
              <View className='flex-1 justify-between'>
                <Text className='text-lg font-semibold text-gray-800'>Check-in: {transaction.check_in}</Text>
                <Text className='text-lg font-semibold text-gray-800'>Check-out: {transaction.check_out}</Text>
                <Text className='text-base text-gray-600 mt-2'>Total Price: ₱{transaction.total_price}</Text>
                <Text className='text-base text-green-600 mt-1'>Status: {transaction.status}</Text>
                <TouchableOpacity className='mt-4 bg-blue-500 p-3 rounded-full'>
                  <Text className='text-white text-center font-semibold'>View Details</Text>
                </TouchableOpacity>
              </View>
              <Image
                source={{ uri: transaction.room_image }}
                className='w-28 h-28 ml-4 rounded-xl'
                style={{ resizeMode: 'cover' }}
              />
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default Booking;
