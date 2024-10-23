
import { Link } from 'expo-router';
import { View, Text, Image } from 'react-native';

const NotFound = () => {
  return (
    <View className="flex-1 justify-center items-center bg-white p-4">
      <Text className="text-3xl font-bold text-gray-800">Oops!</Text>
      <Text className="text-lg text-gray-600 mt-2 text-center">
        We can't seem to find the page you're looking for.
      </Text>
      <Text className="text-2xl text-gray-500 my-4">Under Development - Renz Pogi</Text>
      <Link href={'/LandingPage'}><Text className="font-pblack text-2xl mt-5 underline">Redirect</Text></Link>
    </View>
  );
};

export default NotFound;
