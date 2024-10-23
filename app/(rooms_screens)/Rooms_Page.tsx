import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, Modal, TouchableWithoutFeedback } from 'react-native';
import axiosConfig from '@/helpers/axiosConfig';
import { RootStackParamList } from '@/types/ParamList';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import ProtectedRoute from '@/components/ProtectedRoute';
import CustomHeader from '@/components/CustomHeader';
import { router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface Room {
  id: number;
  name: string;
  image: string;
  type: string;
}

const RoomList = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [filterButtonCoords, setFilterButtonCoords] = useState({ x: 0, y: 0 });
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const fetchRoomsByType = async (type: string) => {
    setIsLoading(true);
    try {
      const response = await axiosConfig.get(`type/${type}`);
      setRooms(response.data);
      console.log(response.data); // Debugging line to see fetched data
    } catch (err: any) {
      setError(err.message);
      console.error(err); // Log the error to see what went wrong
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const getAllRooms = async () => {
      try {
        const response = await axiosConfig.get('/rooms');
        setRooms(response.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    getAllRooms();
  }, []);

  const handlePress = (id: number) => {
    navigation.navigate('RoomDetails', { id });
  };

  const renderItem = ({ item }: { item: Room }) => (
    <TouchableOpacity onPress={() => handlePress(item.id)} className="mb-4 p-2" style={{ flex: 1, margin: 5 }}>
      <Image source={{ uri: item.image }} className="w-full h-72 rounded-2xl" style={{ flex: 1 }} />
      <Text className="text-lg font-bold mt-2 text-center">{item.name}</Text>
    </TouchableOpacity>
  );

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleFilterPress = (type: string) => {
    setSelectedFilter(type);
    console.log(`Filtering rooms by type: ${type}`); 
    fetchRoomsByType(type);
    closeModal();
  };

  const onFilterButtonLayout = (event: any) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    setFilterButtonCoords({ x, y: y + height });
  };

  return (
    <ProtectedRoute>
      {isLoading ? (
        <ActivityIndicator className="mt-96" size="large" color="#15A86D" />
      ) : (
        <View className="flex-1 px-4 pt-8">
          <CustomHeader />
          <View className="flex flex-row justify-between px-3">
            <TouchableOpacity onPress={() => router.push('/(tabs)/')} className="flex-row items-center">
              <Ionicons name="arrow-back-outline" size={24} color="black" />
              <Text className="font-semibold">Go back</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={openModal} onLayout={onFilterButtonLayout} className="relative">
              <MaterialIcons name="filter-alt" size={28} color="#15A86D" />
            </TouchableOpacity>
          </View>
          {rooms.length > 0 ? (
            <FlatList
              className="mt-10"
              showsVerticalScrollIndicator={false}
              data={rooms}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2}
              columnWrapperStyle={{ justifyContent: 'space-between' }}
            />
          ) : (
            <Text className="text-4xl text-center mt-20">No room found</Text>
          )}
        </View>
      )}
      <Modal animationType="fade" transparent={true} visible={isModalVisible} onRequestClose={closeModal}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }} />
        </TouchableWithoutFeedback>
        <View className="absolute bg-white rounded-lg p-5 shadow-lg" style={{ top: filterButtonCoords.y, right: 15, width: 200 }}>
          <Text className="font-bold text-lg mb-2">Filter by Room Type</Text>
          {['single', 'double', 'suite'].map((type) => (
            <TouchableOpacity key={type} onPress={() => handleFilterPress(type)} className="py-2 border-b border-gray-300 flex-row items-center">
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <View style={{
                  height: 12,
                  width: 12,
                  borderRadius: 12,
                  borderWidth: 2,
                  borderColor: '#15A86D',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {selectedFilter === type && (
                    <View style={{
                      height: 12,
                      width: 12,
                      borderRadius: 6,
                      backgroundColor: '#15A86D',
                    }} />
                  )}
                </View>
                <Text className="text-lg ml-2">{type.charAt(0).toUpperCase() + type.slice(1)}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </ProtectedRoute>
  );
};

export default RoomList;
