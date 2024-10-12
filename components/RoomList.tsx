import React from 'react';
import { View, Text, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Room } from '@/types/type';

interface Rooms {
room:Room
}

const RoomDetails = ({ room }:Rooms) => {
  return (
    <View className="flex flex-row items-center justify-center mt-10 gap-5">
      <Image source={{ uri: room.image }} className="mt-20 ml-4 w-44 h-44 rounded-2xl" />
      <View className="ml-6 mt-10">
        <Text className="text-2xl font-pblack"> {room.room_name}</Text>
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
  );
};

export default RoomDetails;
