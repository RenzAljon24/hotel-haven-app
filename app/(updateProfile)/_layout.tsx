import { Stack } from 'expo-router'


const _layout = () => {
  return (
    <Stack>
        <Stack.Screen name='update-profile' options={{headerShown: false}}/>
    </Stack>
  )
}

export default _layout