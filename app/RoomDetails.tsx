import { View, Text, Image, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import axiosConfig from "@/helpers/axiosConfig";
import { RouteProp, useRoute } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Room, RootStackParamList } from '@/types/type';
import { StatusBar } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

type RoomDetailsRouteProp = RouteProp<RootStackParamList, 'RoomDetails'>;

const RoomDetails = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RoomDetailsRouteProp>();
  const { id } = route.params; // Assuming 'id' is the correct parameter

  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await axiosConfig.get<Room>(`/rooms/${id}`);
        setRoom(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoomDetails();
  }, [id]);

  if (loading) {
    return <ActivityIndicator className='mt-24 text-4xl' size="large" color="#0000ff" />;
  }

  if (!room) {
    return <Text>No room found</Text>;
  }

  const handlePress = () => {
    navigation.navigate('Reservation', { roomId: room.id }); // Ensure room.id is passed
  };

  return (
    <ProtectedRoute>
      <View className="flex-1">
        <StatusBar barStyle={'light-content'} />
        <Image
          source={{ uri: room.image }}
          className="w-full h-1/2 rounded-2xl"
          style={{ position: 'absolute', top: 0 }}
        />
        <TouchableOpacity onPress={() => navigation.goBack()} className="absolute p-2 z-10">
          <Ionicons className='top-14 left-6' name="arrow-back-outline" size={28} color="black" />
        </TouchableOpacity>
        <ScrollView className='-z-10' contentContainerStyle={{ paddingTop: 400 }}>
          <View className="flex-1">
            <Text className="text-right text-xl pt-4 mx-2 font-pbold">₱ {room.price}</Text>
            <Text className='text-right text-xl text-gray-500 mx-2 font-pregular'>Tax included</Text>

            <Text className="text-lg p-2 font-pregular">Room Availability: 
              <Text className='font-pbold'> {room.availability}</Text>
            </Text>

            <Text className="text-lg px-2 font-pregular">Room Category: 
              <Text className='font-pbold'> {room.type}</Text>
            </Text>

            <TouchableOpacity onPress={handlePress}>
              <Text className='text-center text-white font-pbold mt-10 p-4 bg-[#15A86D] mx-20 rounded-3xl'>BOOK NOW</Text>
            </TouchableOpacity>

            <Text className='p-4 mt-10 text-xl font-pbold'>
              Description:  
              <Text className='text-gray-500 font-pregular text-base'>
                {room.description}
              </Text>
            </Text>
          </View>
        </ScrollView>
      </View>
    </ProtectedRoute>
  );
};

export default RoomDetails;
