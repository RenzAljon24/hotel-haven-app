import React from 'react';
import { View, Text } from 'react-native';

const AmenitiesList = () => {
  return (
    <View className="mt-12 p-4">
      <Text className="text-lg font-pbold mb-4">Additional Amenities/Facilities</Text>
      <View>
        {['Cable TV', 'Hot and cold shower', 'Bedside table', 'Dressing table', 'Kitchen sink', 'Wi-Fi'].map((amenity, index) => (
          <Text key={index} className="text-lg font-pregular">{amenity}</Text>
        ))}
      </View>
    </View>
  );
};

export default AmenitiesList;
