import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, StyleSheet, ScrollView} from 'react-native';
import { useState, useEffect } from 'react';
import axiosConfig from '@/helpers/axiosConfig';
import { RootStackParamList } from '@/types/ParamList';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'expo-router';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { images } from '@/constants';

interface Room {
  id: number;
  name: string;
  image: string;
}

const HomePage = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const {user} = useAuth();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const getAllRooms = async () => {
      try {
        const response = await axiosConfig.get('/rooms/latest')
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
    return <ActivityIndicator className="mt-96" size="large" color="#15A86D" />;
  }

  const handlePress = (id: number) => {
    navigation.navigate('RoomDetails', { id });
  };

  const renderItem = ({ item }: { item: Room }) => (
    <TouchableOpacity onPress={() => handlePress(item.id)} className="mr-4 p-4 ">
      <Image
        source={{ uri: item.image }}
        className="w-48 h-72 rounded-2xl" 
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
        <ScrollView className="" showsVerticalScrollIndicator={false}>
          <View className='flex-1 mx-4'>
            <View className="bg-white rounded-3xl mt-5" style={styles.shadow}>
              <View className="p-3">
                <View className="flex-row items-center justify-center pt-2">
                  <EvilIcons name="calendar" size={27} color="#15A86D" />
                  <Text className="text-gray-700 font-pblack ">
                    {formatDate(new Date())}
                  </Text>
                </View>
              </View>
            </View>

            <View className=' bg-[#15A86D] rounded-3xl my-10'>
            {user && user.profile ? (
                      <View className='flex flex-row p-7 pt-5'>
                          <Image
                              source={{ uri: user.profile }}
                              className="w-20 h-20 rounded-full"
                          />
                          <View className='flex flex-col ml-3 '>
                            <Text className='font-pextrabold text-xl pt-3 text-gray-50'>Greetings to you,</Text>
                            <Text className="font-pextrabold text-xl pt-1 text-gray-50">
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
              {/* Hotel amnesties*/}
            <View className='flex flex-row justify-between mr-4 mt-20'>
              <Text className='text-xl font-pbold '>Hotel Amnenities</Text>
            </View>
            <View className='py-5'>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} className='flex'>
                  <Image 
                  source={images.gymOne}
                  className='w-[200px] h-[100px] rounded-lg mx-4'
                  />
                                    <Image 
                  source={images.gymTwo}
                  className='w-[200px] h-[100px] rounded-lg mx-4'
                  />
                </ScrollView>
            </View>

          </View>
        </ScrollView>
      ) : (
        <Text className="text-4xl text-center mt-20">No rooms found</Text>
      )}
    </ProtectedRoute>
  );
};



const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10, // Android shadow
  },
});

export default HomePage;
