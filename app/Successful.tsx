import { View, Text, Image, Touchable } from 'react-native'
import { images } from '@/constants'
import { TouchableOpacity } from 'react-native-gesture-handler'
const Successful = () => {
  return (
    <View className='mt-52 flex flex-col items-center justify-center'>
      <Image 
      source={images.success}
      className='w-40 h-40'
      />
      <Text className='text-2xl font-pblack m-10'>Room booked and payment processed successfully!</Text>
      <TouchableOpacity>
        <Text className='text-white bg-[#15A86D] rounded-md p-3 w-96 text-center font-pbold'>Go to Homepage</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Successful