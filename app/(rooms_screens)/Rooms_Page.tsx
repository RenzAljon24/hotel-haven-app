import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import axiosConfig from '@/helpers/axiosConfig'
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
}

const RoomList = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null)

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const getAllRooms = async () => {
        try {
          const response = await axiosConfig.get('/rooms');
          setRooms(response.data);
        } catch (err: any) {
          setError(err)
        }finally{
          setIsLoading(false);
        }
    }
    getAllRooms();
  }, []);



  if (isLoading) {
    return <ActivityIndicator className='mt-96' size="large" color="#15A86D" />;
  }

  const handlePress = (id: number) => {
    navigation.navigate('RoomDetails', { id });
  };

  const renderItem = ({ item }: { item: Room }) => (
    <TouchableOpacity 
      onPress={() => handlePress(item.id)} 
      className="mb-4 p-2"
      style={{ flex: 1, margin: 5 }} 
    >
      <Image 
        source={{ uri: item.image }} 
        className="w-full h-72 rounded-2xl"
        style={{ flex: 1 }} 
      />
      <Text className="text-lg font-bold mt-2 text-center">{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <ProtectedRoute>
      {rooms.length > 0 ? (
        <View className="flex-1 px-4 pt-6">
          <CustomHeader/>
          <View className='flex flex-row justify-between px-3'>
          <TouchableOpacity onPress={()=> router.push('/(tabs)/')} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="arrow-back-outline" size={24} color="black" />
            <Text className='font-psemibold'>Go back</Text>
          </TouchableOpacity>

          <MaterialIcons name="filter-alt" size={28} color="#15A86D" />
          </View>
          <FlatList
            className='mt-10'
            showsVerticalScrollIndicator={false}
            data={rooms}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2} // Set number of columns to 2
            columnWrapperStyle={{ justifyContent: 'space-between' }} // Ensure proper spacing between columns
          />
        </View>
      ) : (
        <Text className='text-4xl text-center mt-20'>No room found</Text>
      )}
    </ProtectedRoute>
  );
};

export default RoomList;
