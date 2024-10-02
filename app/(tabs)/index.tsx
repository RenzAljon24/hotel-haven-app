import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, } from 'react-native';
import { useState, useEffect } from 'react';
import axiosConfig from '@/helpers/axiosConfig';
import { RootStackParamList } from '@/types/ParamList';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'expo-router';
import LinearGradient from 'react-native-linear-gradient';

interface Room {
  id: number;
  name: string;
  image: string;
}

const HomePage = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const {user} = useAuth();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    getAllRooms();
  }, []);

  const getAllRooms = () => {
    setIsLoading(true);
    axiosConfig
      .get<Room[]>('/rooms/latest')
      .then((response) => {
        setRooms(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return <ActivityIndicator className="mt-20" size="large" color="gray" />;
  }

  const handlePress = (id: number) => {
    navigation.navigate('RoomDetails', { id });
  };

  const renderItem = ({ item }: { item: Room }) => (
    <TouchableOpacity onPress={() => handlePress(item.id)} className="mr-4 p-4 ">
      <Image
        source={{ uri: item.image }}
        className="w-48 h-72 rounded-2xl" // Adjusted for horizontal layout
      />
      <Text className="text-lg font-bold mt-2">{item.name}</Text>
    </TouchableOpacity>
  );


  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {year: 'numeric', day: 'numeric', month: 'long'};
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <ProtectedRoute>
      {rooms.length > 0 ? (
        <View className="flex-1 px-4">
          <View className=' bg-[#15A86D] rounded-2xl my-10'>
            <View className='flex items-end pt-3 pr-3'><Text className='text-gray-700 font-pregular'>{formatDate(new Date())}</Text></View>
          {user && user.profile ? (
                    <View className='flex flex-row p-7 pt-1'>
                        <Image
                            source={{ uri: user.profile }}
                            className="w-20 h-20 rounded-full"
                        />
                        <View className='flex flex-col ml-3'>
                          <Text className='font-bold text-xl pt-3'>Welcome Back,</Text>
                          <Text className="font-bold text-xl pt-1">
                              {user.firstName} {user.lastName}!
                          </Text>
                        </View>
                    </View>
                ) : (
                    <Text className="font-bold text-lg pt-2">
                        No user data available
                    </Text>
                )}
          </View>
          <View className='flex flex-row justify-between mr-4'>
            <Text className='text-xl font-pbold '>Latest rooms</Text>
            <Link href={'/(rooms_screens)/Rooms_Page'}><Text className='font-pmedium text-gray-500 text-lg'>View all</Text></Link>
          </View>
          <View className='h-[290px]'>
          <FlatList
            className="mt-5"
            horizontal={true} // Set to true for horizontal scrolling
            showsHorizontalScrollIndicator={false} // Hide the scrollbar
            data={rooms}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => <View className='w-5' />}
          />
          </View>
        </View>
      ) : (
        <Text className="text-4xl text-center mt-20">No rooms found</Text>
      )}
    </ProtectedRoute>
  );
};

export default HomePage;
