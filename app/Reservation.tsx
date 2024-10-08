import React, { useState, useEffect } from 'react';
import { View, Text, Alert, ActivityIndicator, Image, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import axiosConfig from '@/helpers/axiosConfig';
import { Room, RootStackParamList } from '@/types/type';
import { useAuth } from '@/context/AuthContext';
import Ionicons from '@expo/vector-icons/Ionicons';
import CustomCalendarPicker from '@/components/CustomDatePicker'; 
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { useStripe, initPaymentSheet, presentPaymentSheet } from '@stripe/stripe-react-native';
import { router } from 'expo-router';



const Reservation = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'Reservation'>>();
  const { roomId } = route.params;
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [totalPrice, setTotalPrice] = useState<number | null>(null);
  const [bookedDates, setBookedDates] = useState<{ start: Date, end: Date }[]>([]);
  const { makeReservation } = useAuth();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();  

  const fetchRoomDetails = async () => {
    setLoading(true);
    try {
      const roomResponse = await axiosConfig.get<Room>(`/rooms/${roomId}`);
      setRoom(roomResponse.data);

      const bookedDatesResponse = await axiosConfig.get<{ check_in: string, check_out: string }[]>(`/rooms/${roomId}/booked-dates`);
      setBookedDates(bookedDatesResponse.data.map(booking => ({
        start: new Date(booking.check_in),
        end: new Date(booking.check_out),
      })));
    } catch (error) {
      Alert.alert('Error', 'Unable to fetch room details or booked dates');
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalPrice = (checkIn: Date, checkOut: Date) => {
    if (room) {
      const numberOfNights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 3600 * 24));
      setTotalPrice(numberOfNights * parseFloat(room.price));
    }
  };

  const handleCheckInChange = (date: Date) => {
    if (checkOutDate && date >= checkOutDate) {
      Alert.alert('Error', 'Check-in date must be before the check-out date.');
      return;
    }
    setCheckInDate(date);
    if (date && checkOutDate) {
      calculateTotalPrice(date, checkOutDate);
    }
  };

  const handleCheckOutChange = (date: Date) => {
    if (checkInDate && date <= checkInDate) {
      Alert.alert('Error', 'The check-out date must be after the check-in date.');
      return;
    }
    setCheckOutDate(date);
    if (checkInDate) {
      calculateTotalPrice(checkInDate, date);
    }
  };

  const fetchPaymentSheetParams = async () => {
    const response = await axiosConfig.post('/create-charge', {
      amount: totalPrice, // in peso
    });

    const { client_secret } = response.data;
    return { clientSecret: client_secret };
  };

  const initializePaymentSheet = async () => {
    const { clientSecret } = await fetchPaymentSheetParams();
    const { error } = await initPaymentSheet({
      paymentIntentClientSecret: clientSecret,
      merchantDisplayName: 'myapp',
    });

    if (!error) {
      openPaymentSheet();
    } else {
      Alert.alert('Error', error.message);
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error`, error.message);
    } else {
      handleBooking();
    }
  };

  const handleBooking = async () => {
    if (!room || !checkInDate || !checkOutDate || totalPrice === null) {
      Alert.alert('Error', 'Please fill all the required fields.');
      return;
    }

    try {
      await makeReservation(
        room.id,
        totalPrice,
        checkInDate.toISOString().split('T')[0],
        checkOutDate.toISOString().split('T')[0]
      );

      router.push('/Successful')
      setCheckInDate(null);
      setCheckOutDate(null);
      setTotalPrice(null);
    } catch (error: any) {
      Alert.alert('Error', 'Unable to complete the reservation.');
    }
  };
  useEffect(() => {
    fetchRoomDetails();
  }, [roomId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" className='mt-52' />;
  }

  if (!room) {
    return <Text>No room found</Text>;
  }

  return (
    <ScrollView className="flex-1">
      <StatusBar barStyle={'dark-content'} />
      <View className="flex flex-row items-center justify-center mt-10 gap-5">
        <Image source={{ uri: room.image }} className="mt-20 ml-4 w-44 h-44 rounded-2xl" />
        <View className="ml-6 mt-10">
          <Text className="text-lg font-bold"> {room.room_name}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }} className='mt-2'>
            <Text className="text-lg font-pregular">
              <Ionicons name="bed" size={28} color="#15A86D" />
            </Text>
            <Text className='font-pbold text-xl'> {room.type}</Text>
          </View>
          <View className='flex flex-row gap-4 mt-10'>
            <FontAwesome5 name="wifi" size={24} color="black" />
            <MaterialCommunityIcons name="air-conditioner" size={24} color="black" />
            <MaterialCommunityIcons name="shield-lock" size={24} color="black" />
          </View>
        </View>
      </View>

      <View className='mt-10 mx-4'>
        <Text className='text-xl font-pblack'>Please enter your desired date</Text>
      </View>

      <View className="flex flex-row mx-7 mt-2 gap-2">
        <CustomCalendarPicker
          label={checkInDate ? checkInDate.toLocaleDateString() : "Check in"}
          selectedDate={checkInDate}
          bookedDates={bookedDates}
          onDateChange={handleCheckInChange}
          minimumDate={new Date()}
        />
        <CustomCalendarPicker
          label={checkOutDate ? checkOutDate.toLocaleDateString() : "Check out"}
          selectedDate={checkOutDate}
          bookedDates={bookedDates}
          onDateChange={handleCheckOutChange}
          minimumDate={checkInDate || new Date()}
        />
      </View>

      <View className="mt-10 p-4">
        <Text className="text-lg font-pbold mb-4">Additional Amenities/Facilities</Text>
        <View>
          {['Cable TV', 'Hot and cold shower', 'Bedside table', 'Dressing table', 'Kitchen sink', 'Wi-Fi'].map((amenity, index) => (
            <Text key={index} className="text-lg font-pregular">{amenity}</Text>
          ))}
        </View>
      </View>

      <View className='flex flex-row justify-between mx-6'>
        <Text className='text-lg font-pblack'>Total Price</Text>
        <Text className='text-lg font-pblack'>{totalPrice ? `₱ ${totalPrice}` : '₱ 0.00'}</Text>
      </View>


      <TouchableOpacity onPress={initializePaymentSheet}>
        <Text className='text-lg text-center text-white mx-6 my-4 bg-green-600 py-3 rounded-lg'>Book Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Reservation;
