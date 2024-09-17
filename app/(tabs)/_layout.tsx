import { View, Image } from 'react-native';
import { Tabs } from 'expo-router';
import { images } from '@/constants';

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
        headerTitle: () => <CustomHeader />,
        headerStyle: {
          backgroundColor: 'transparent', // Optional: Make header background transparent
        },
        headerTitleAlign: 'center', // Center align the title
      }}
    >
      <Tabs.Screen name='index' options={{ title: 'Home' }} />
    </Tabs>
  );
};

export default _layout;
