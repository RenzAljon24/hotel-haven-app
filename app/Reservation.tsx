import React, { useState, useEffect } from 'react';
import { View, Text, Alert, ActivityIndicator, ScrollView, StatusBar } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import axiosConfig from '@/helpers/axiosConfig';
import { Room, RootStackParamList } from '@/types/type';
import { useAuth } from '@/context/AuthContext';
import { useStripe } from '@stripe/stripe-react-native';
import { router } from 'expo-router';


//components
import AmenitiesList from '@/components/AmenitiesList';
import TotalPriceDisplay from '@/components/TotalPrice';
import RoomList from '@/components/RoomList'
import BookingButton from '@/components/BookingButton';
import DatePicker from '@/components/DatePicker';

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
  const [paymentLoading, setPaymentLoading] = useState(false);

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
    setPaymentLoading(true); // Start loading
    if(!checkInDate && !checkOutDate) {
      Alert.alert('Booking Message', 'Please Select a date!')
      setPaymentLoading(false);
      return;
    }

    try {
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
    } finally {
      setPaymentLoading(false); // Stop loading
    }
  };

  const openPaymentSheet = async () => {
    try {
      const { error } = await presentPaymentSheet();
  
      if (error) {
        Alert.alert('Booking Cancelled', error.message);
        return; // cancel if error
      }
  
      //check if defined
      if (!checkInDate || !checkOutDate || !totalPrice) {
        Alert.alert('Error', 'Reservation details are incomplete. Please check your dates and total price.');
        return; 
      }
  
      Alert.alert('Success', 'Your booking has been confirmed!');
      
      //makereservation logic made in other file
      makeReservation(roomId, checkInDate as any, checkOutDate as any, totalPrice as any);
      
      router.back();
    } catch (error) {
      // Handle errors
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
      console.error(error); // Log the error for debugging purposes
    }
  };
  

  useEffect(() => {
    fetchRoomDetails();
  }, []);

  return (
    <ScrollView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      {loading ? (
        <ActivityIndicator size="large" color="#15A86D" />
      ) : (
        room && (
          <View>
            <RoomList room={room} />
            <DatePicker 
              checkInDate={checkInDate} 
              checkOutDate={checkOutDate} 
              handleCheckInChange={handleCheckInChange} 
              handleCheckOutChange={handleCheckOutChange} 
              bookedDates={bookedDates} 
            />
            <AmenitiesList />
            <TotalPriceDisplay totalPrice={totalPrice} />
            <BookingButton onPress={initializePaymentSheet} loading={paymentLoading} />
          </View>
        )
      )}
    </ScrollView>
  );
};

export default Reservation;
