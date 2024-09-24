import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import axiosConfig from '@/helpers/axiosConfig'
import { RootStackParamList } from '@/types/ParamList';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import ProtectedRoute from '@/components/ProtectedRoute';

interface Room {
  id: number;
  name: string;
  image: string;
}

const RoomList = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    getAllRooms();
  }, []);

  const getAllRooms = () => {
    setIsLoading(true);
    axiosConfig
      .get<Room[]>('/rooms')
      .then((response) => {
        setRooms(response.data);
      })
      .catch((error) => {
        console.log(error);
      }).finally(() => {
        setIsLoading(false);
      })
  };

  if (isLoading) {
    return <ActivityIndicator className='mt-20' size="large" color="gray" />;
  }

  const handlePress = (id: number) => {
    navigation.navigate('RoomDetails', { id });
  };

  const renderItem = ({ item }: { item: Room }) => (
    <TouchableOpacity 
      onPress={() => handlePress(item.id)} 
      className="mb-4 p-2"
      style={{ flex: 1, margin: 5 }} // Ensure even spacing and flexible layout
    >
      <Image 
        source={{ uri: item.image }} 
        className="w-full h-72 rounded-2xl"
        style={{ flex: 1 }} // Ensure the image takes full width within its container
      />
      <Text className="text-lg font-bold mt-2 text-center">{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <ProtectedRoute>
      {rooms.length > 0 ? (
        <View className="flex-1 px-4">
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
