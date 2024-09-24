import { Stack } from 'expo-router'
import { View, Text } from 'react-native'


const _layout = () => {
  return (
    <Stack>
        <Stack.Screen name='Login' options={{headerShown: false}}/>
        <Stack.Screen name='Signup' options={{headerShown: false}}/>
    </Stack>
  )
}

export default _layout