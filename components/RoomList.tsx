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
      <View style={{position: 'absolute', backgroundColor: 'white', width: 340, transform: [{translateY: 30}], height: 150, borderColor: 'black', borderRadius: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.50, shadowRadius: 3.84, elevation: 10}}></View>
      <Image source={{ uri: room.image }} className="mt-20 ml-8 w-32 h-32 rounded-lg" />
      <View className="ml-1 mt-20 flex-1 ">
        <Text className="text-lg  font-pbold"> {room.room_name}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }} className='mt-2'>
          <Text className="text-lg font-pregular">
            <Ionicons name="bed" size={25} color="#15A86D" />
          </Text>
          <Text className='font-psemibold text-md'> {room.type}</Text>
        </View>
        <View className='flex flex-row gap-4 mt-2'>
          <FontAwesome5 name="wifi" size={20} color="black" />
          <MaterialCommunityIcons name="air-conditioner" size={20} color="black" />
          <MaterialCommunityIcons name="shield-lock" size={20} color="black" />
        </View>
      </View>
    </View>
  );
};

export default RoomDetails;
