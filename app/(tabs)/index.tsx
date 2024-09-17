import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import axiosConfig from '@/helpers/axiosConfig'
import { RootStackParamList } from '@/types/ParamList';
import { NavigationProp, useNavigation } from '@react-navigation/native';


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
    <TouchableOpacity onPress={() => handlePress(item.id)} className="mb-4 p-4 border-b border-gray-300">
      <Image 
        source={{ uri: item.image }} 
        className="w-full h-48 rounded-2xl"
      />
      <Text className="text-lg font-bold mt-2">{item.name}</Text>
    </TouchableOpacity>
  );

  return (
      <View className="flex-1 px-4 ">
        <FlatList
        className='mt-5'
          showsVerticalScrollIndicator={false}
          data={rooms}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}

        />
      </View>
  );
};

export default RoomList;
