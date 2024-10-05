import { Text, View } from 'react-native'
import { images } from '@/constants'
import { Image } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';



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

export default CustomHeader