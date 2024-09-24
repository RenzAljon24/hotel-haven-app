import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axiosConfig from "@/helpers/axiosConfig";
import { Room, RootStackParamList } from '@/types/type'; // Ensure this imports correctly
import { useAuth } from '@/context/AuthContext';

const Reservation = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'Reservation'>>();
  const { roomId } = route.params;

  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date());
  const [showCheckInPicker, setShowCheckInPicker] = useState(false);
  const [showCheckOutPicker, setShowCheckOutPicker] = useState(false);
  const [totalPrice, setTotalPrice] = useState<number | null>(null); // State to store total price
  const { makeReservation } = useAuth();

  // Fetch room details based on roomId
  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await axiosConfig.get<Room>(`/rooms/${roomId}`);
        setRoom(response.data);
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Unable to fetch room details');
      } finally {
        setLoading(false);
      }
    };

    fetchRoomDetails();
  }, [roomId]);

  // Function to calculate total price based on selected check-in and check-out dates
  const calculateTotalPrice = (checkIn: Date, checkOut: Date) => {
    if (room) {
      const numberOfNights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 3600 * 24));
      const total = numberOfNights * room.price;
      setTotalPrice(total);
    }
  };

  const onCheckInChange = (event: any, selectedDate: Date | undefined) => {
    setShowCheckInPicker(false);
    if (selectedDate) {
      setCheckIn(selectedDate);
      calculateTotalPrice(selectedDate, checkOut); // Calculate total when check-in date changes
    }
  };

  const onCheckOutChange = (event: any, selectedDate: Date | undefined) => {
    setShowCheckOutPicker(false);
    if (selectedDate) {
      setCheckOut(selectedDate);
      calculateTotalPrice(checkIn, selectedDate); // Calculate total when check-out date changes
    }
  };

  // Handle room booking
  const handleBooking = async () => {
    if (!room || totalPrice === null) {
      Alert.alert('Error', 'Room details or total price are not available');
      return;
    }

    try {
      await makeReservation(room.id, totalPrice, checkIn.toISOString().split('T')[0], checkOut.toISOString().split('T')[0]);
      Alert.alert('Success', 'Room booked successfully!');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Unable to make the reservation');
    }
  };

  if (loading) {
    return <ActivityIndicator className='mt-24 text-4xl' size="large" color="#0000ff" />;
  }

  if (!room) {
    return <Text>No room found</Text>;
  }

  return (
    <View className="flex-1">
      
      <Image 
      source={{uri:room.image}}
      className='w-full h-1/2'
      />
      <Text className="text-lg text-right font-pregular m-2">Price per Night: <Text className='font-pbold'>₱{room.price}</Text></Text>
      <Text className="text-xl font-bold">Room Reservation</Text>
      <Text className="text-lg">Room Number: {room.room_number}</Text>
      <Text className="text-lg">Type: {room.type}</Text>
     
      <View className='flex flex-row gap-5 text-center items-center justify-center mt-10'>
        {/* Check-In Date Picker */}
        <TouchableOpacity  onPress={() => setShowCheckInPicker(true)}  ><Text className='border w-44 p-2 font-pmedium'>Select Check-In Date</Text></TouchableOpacity>
        {showCheckInPicker && (
          <DateTimePicker
            value={checkIn}
            mode="date"
            display="default"
            onChange={onCheckInChange}
            minimumDate={new Date()} // Prevent past dates
          />
        )}
        

        {/* Check-Out Date Picker */}
        <TouchableOpacity  onPress={() => setShowCheckInPicker(true)}  ><Text className='border w-44 p-2 font-pmedium'>Select Check-Out Date</Text></TouchableOpacity>
        {showCheckOutPicker && (
          <DateTimePicker
            value={checkOut}
            mode="date"
            display="default"
            onChange={onCheckOutChange}
            minimumDate={checkIn} // Prevent check-out before check-in
          />
        )}
       
      </View>
      <Text className='font-pregular mx-10 mt-3'>Check-Out: {checkOut.toLocaleDateString()}</Text>
      <Text className='font-pregular mx-10'>Check-In: {checkIn.toLocaleDateString()}</Text>

      {/* Display the total price */}
      <Text className="text-lg mt-4 font-bold mx-10">Total Price: ₱{totalPrice}</Text>

      <TouchableOpacity  onPress={handleBooking} >
        <Text className='bg-[#15A86D] text-white text-center font-pbold mx-10 p-3 rounded-2xl mt-10'>Confirm Booking</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Reservation;
