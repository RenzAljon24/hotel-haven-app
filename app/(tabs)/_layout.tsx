import { View, Image } from 'react-native';
import { Tabs } from 'expo-router';
import { images } from '@/constants';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
// Custom header component
const CustomHeader = () => (
  <View className="flex-1 justify-center items-center">
    <Image 
      source={images.logo} 
      className="w-24 h-10 object-contain" // Adjust width and height as needed
    />
  </View>
);

const _layout = () => {
  return (

    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#15A86D",
        headerTitle: () => <CustomHeader />,
        headerStyle: {
          backgroundColor: 'transparent', 
        },
        headerTitleAlign: 'center', // Center align the title
        tabBarShowLabel: false,

      }}
    >
      <Tabs.Screen name='booking' options={{ tabBarIcon: ({color}) =><AntDesign name="book" size={32} color={color} />}} />
      <Tabs.Screen name='index' options={{ tabBarIcon: ({color}) => <MaterialCommunityIcons name="home" size={38} color={color} /> }} />
      <Tabs.Screen name='profile' options={{ tabBarIcon: ({color}) => <MaterialIcons name="manage-accounts" size={38} color={color} />}} />


    </Tabs>

  );
};

export default _layout;
