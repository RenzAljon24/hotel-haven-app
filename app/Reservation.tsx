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
    if (checkOutDate && date > checkOutDate) {
      Alert.alert('Error', 'Check-in date must be before the check-out date.');
      return;
    }

    if (checkOutDate && date.toDateString() === checkOutDate.toDateString()) {
      Alert.alert('Error', 'Check-in and check-out dates cannot be the same. Please select different dates.');
      return;
    }

    setCheckInDate(date);
    if (checkOutDate && date > checkOutDate) {
      setCheckOutDate(null); 

    }
    if (date && checkOutDate) {
      calculateTotalPrice(date, checkOutDate);
    }
  };

  const handleCheckOutChange = (date: Date) => {
    if (checkInDate && date.toDateString() === checkInDate.toDateString()) {
      Alert.alert('Please try again', 'The check-out date must be after the check-in date.');
      return;
    }
    setCheckOutDate(date);
    if (checkInDate) {
      calculateTotalPrice(checkInDate, date);
    }
  };

  const handleBooking = async () => {
    if (!room || !checkInDate || !checkOutDate || totalPrice === null) {
      Alert.alert('Error', 'Please fill all the required fields.');
      return;
    }
    try {
      await makeReservation(room.id, totalPrice, checkInDate.toISOString().split('T')[0], checkOutDate.toISOString().split('T')[0]);
      Alert.alert('Success', 'Room booked successfully!');
      setBookedDates([...bookedDates, { start: checkInDate!, end: checkOutDate! }]);
      setCheckInDate(null);
      setCheckOutDate(null);
      setTotalPrice(null);
    } catch (error) {
      Alert.alert('Error', 'Unable to make the reservation');
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

      {/* Amenities Section */}
      <View className="mt-10 p-4">
        <Text className="text-lg font-pbold mb-4">Additional Amenities/Facilities</Text>
        <View>
          {[
            'Cable TV',
            'Hot and cold shower',
            'Bedside Table',
            'Refrigerator',
            'Wardrobe',
            'Comfortable beds',
            'Vanity Kits',
            '24 hours front desk',
            'Luggage Storage',
          ].map((amenity, index) => (
            <Text key={index} className="text-base text-gray-600 mb-3 font-pmedium">- {amenity}</Text>
          ))}
        </View>
      </View>

      <View className="relative bottom-0 w-full p-4">
        <Text className="text-base text-gray-500">Total Payable amount</Text>
        <View className="flex flex-row justify-between items-center mx-10 mt-2">
          <Text className="text-lg text-[#15A86D] font-bold">₱{totalPrice?.toFixed(2) ?? ''}</Text>
          <TouchableOpacity onPress={handleBooking}>
            <View className="bg-[#15A86D] p-3 rounded-3xl w-48">
              <Text className="text-white text-center font-bold">Pay Now</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Reservation;
