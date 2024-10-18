import { View, Text, ScrollView,TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome';

const privacy = () => {
  return (

    <ScrollView>
    <View>
    <View className='pt-4 bg-slate-100 flex justify-items-start'>
    <TouchableOpacity onPress={()=> router.push('/(tabs)/profile')} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="arrow-back-outline" size={24} color="black" />
            <Text className='font-psemibold text-center'>Privacy Policies</Text>
    </TouchableOpacity>
    </View>
    <View className='flex-1'>
      <View className='flex-1 justify-center align-middle'>
      <Text className='text-center'>Privacy Policies for <Text className='color-green-600'>HotelHaven</Text></Text>
      </View>
      <Text>In HotelHaven, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and share information when you use our app for hotel room booking services.</Text>
      <Text className='font-pbold'>1. Information We Collect</Text>
      <Text className='font-pbold'><FontAwesome name="circle" size={5} color="black" />Personal Information: When you use <Text className='color-green-600'>HotelHaven</Text>, we may collect personal information such as your name, email address, phone number, and payment information.</Text>
      <Text><Text className='font-pbold'>Usage Information:</Text> We collect information about how you interact with the App, including which rooms you view and book, as well as other preferences.</Text>
      <Text className='font-pbold'>Location Data: We may collect your location information if you allow us to do so, for the purpose of showing nearby hotels.</Text>
      <Text className='font-pbold'>2. How We Use Your Information</Text>
      <Text >Providing Services: To facilitate room bookings, process payments, and provide customer support.</Text>
      <Text><Text className='font-pbold'>Improvement of Services:</Text> To analyze app usage trends and improve features and performance.</Text>
      <Text><Text className='font-pbold'>Marketing:</Text> To send you promotional offers or updates, which you can opt out of at any time.</Text>
      <Text className='font-pbold'>3. How We Share Your Information</Text>
      <Text><Text className='font-pbold'>With Hotel Partners:</Text> We share booking details with the hotels you choose to stay at.</Text>
      <Text><Text className='font-pbold'>Third-Party Service Providers:</Text> We may share your data with third parties to process payments, send emails, or store data securely.</Text>
      <Text className='font-pbold'>Legal Requirements: We may disclose your information if required by law or in response to a legal request.</Text>

      <Text className='font-pbold'>4. Data Security</Text>
      <Text className='font-pbold'>We use appropriate security measures to protect your personal data from unauthorized access, disclosure, or destruction.</Text>
      <Text className='font-pbold'>5. Your Choices</Text>
      <Text className='font-pbold'>You may update or delete your personal information at any time by accessing your account settings in the App. You can also request to have your account deleted by contacting our support team.</Text>
      <Text className='font-pbold'>6. Changes to This Policy</Text>
      <Text className='font-pbold'>We may update this Privacy Policy from time to time. You will be notified of any changes by an update in the App.</Text>
      
    </View>
    </View>

    </ScrollView>
    
  )
}

export default privacy