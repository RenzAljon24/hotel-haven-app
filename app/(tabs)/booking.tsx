import { View, Text, Image, ActivityIndicator, TouchableOpacity, ScrollView, Alert, BackHandler, Modal } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { images } from '@/constants';
import ProtectedRoute from '@/components/ProtectedRoute';
import { router } from 'expo-router';
import { useNavigation } from '@react-navigation/native';

const Booking = () => {
  const { getUserTransactions } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [transactionHistory, setTransactionHistory] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const navigation = useNavigation();

  const backAction = () => {
    if (navigation.isFocused()) {
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    }
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

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

  const openModal = (transaction: any) => {
    setSelectedTransaction(transaction);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedTransaction(null);
  };

  return (
    <ProtectedRoute>
      <View className='flex-1 bg-zinc-50 p-4'>
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
            <TouchableOpacity onPress={() => router.push('/(tabs)/')}>
              <Text className='mt-4 text-white text-center font-semibold bg-green-600 p-3 rounded-lg font-pblack'>Go Back</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <ScrollView>
            {transactionHistory.map((transaction, index) => (
              <TouchableOpacity key={index} onPress={() => openModal(transaction)}>
                <View
                  className='flex flex-row bg-white p-4 mb-4 rounded-xl shadow-md'
                  style={{ elevation: 3 }}
                >
                  <View className='flex-1 justify-between'>
                    <Text className='text-lg font-semibold text-gray-800'>Check-in: {transaction.check_in}</Text>
                    <Text className='text-lg font-semibold text-gray-800'>Check-out: {transaction.check_out}</Text>
                    <Text className='text-base text-gray-600 mt-2'>Total Price: ₱{transaction.total_price}</Text>
                    <Text className='text-base text-green-600 mt-1'>Status: {transaction.status}</Text>
                  </View>
                  <Image
                    source={{ uri: transaction.room_image }}
                    className='w-28 h-28 ml-4 rounded-xl'
                    style={{ resizeMode: 'cover' }}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        {/* Modal for Transaction Details */}
        {selectedTransaction && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={closeModal}
          >
            <View className='flex-1 justify-center items-center bg-transparent bg-opacity-50'>
              <View className='w-11/12 bg-white rounded-lg p-5'>
                <Text className='text-lg font-bold mb-2'>Transaction Details</Text>
                <Text className='text-gray-800'>Check-in: {selectedTransaction.check_in}</Text>
                <Text className='text-gray-800'>Check-out: {selectedTransaction.check_out}</Text>
                <Text className='text-gray-800'>Total Price: ₱{selectedTransaction.total_price}</Text>
                <Text className='text-gray-800'>Status: {selectedTransaction.status}</Text>
                <Image
                  source={{ uri: selectedTransaction.room_image }}
                  className='w-full h-40 mt-3 rounded-lg'
                  style={{ resizeMode: 'cover' }}
                />
                <TouchableOpacity onPress={closeModal} className='mt-4 bg-green-600 p-3 rounded-lg'>
                  <Text className='text-white text-center font-semibold'>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
      </View>
    </ProtectedRoute>
  );
};

export default Booking;
