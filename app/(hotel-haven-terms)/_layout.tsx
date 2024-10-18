import { Stack } from 'expo-router'


const _layout = () => {
  return (
    <Stack>
        <Stack.Screen name='About' options={{headerShown: false}}/>
        <Stack.Screen name='terms' options={{headerShown: false}}/>
        <Stack.Screen name='privacy' options={{headerShown: false}}/>
        <Stack.Screen name='faq' options={{headerShown: false}}/>
    </Stack>
  )
}

export default _layout