import { Text, View, Image } from 'react-native';
import { Tabs } from 'expo-router';
import { images } from '@/constants';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
// Custom header component
const CustomHeader = () => {
  return (
    <View className='w-screen shadow'>
      <View className='flex flex-row justify-between p-5 '>
        <Image 
        source={images.logo}
        className='w-24 h-10'
        />
        <Text className='pt-1'>
            <Ionicons name="notifications" size={28} color="black" />        </Text>
      </View>
    </View>
  )
}

const _layout = () => {
  return (

    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#15A86D",
        headerTitle: () => <CustomHeader />,
        headerStyle: {
          backgroundColor: 'white', 
        },
        headerTitleAlign: 'center', // Center align the title
        tabBarShowLabel: false,

      }}
    >
      <Tabs.Screen name='booking' options={{ tabBarIcon: ({color}) =><AntDesign name="book" size={32} color={color} />}} />
      <Tabs.Screen name='index' options={{ tabBarIcon: ({color}) => <AntDesign name="home" size={35} color={color} /> }} />
      <Tabs.Screen name='profile' options={{ tabBarIcon: ({color}) => <Feather name="user" size={33} color={color} />}} />


    </Tabs>

  );
};

export default _layout;
