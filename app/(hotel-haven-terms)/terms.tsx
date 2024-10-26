import { View, Text,TouchableOpacity, ScrollView, } from 'react-native'
import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router'


const terms = () => {
  return (
    <ScrollView>
    <View>
        <View className='pt-4 flex justify-items-start mt-10 mx-5'>
          <TouchableOpacity onPress={() => router.push('/(tabs)/profile')} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="arrow-back-outline" size={24} color="black" />
            <Text className='font-psemibold text-center mx-auto text-xl'>Terms & Conditions</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text className='text-center text-2xl mt-10 font-psemibold'><Text className='color-green-600'>HotelHaven’s</Text > Terms & Conditions</Text>
        </View>
      <Text className='mt-4 mx-auto text-lg'>Welcome to HotelHaven! By using our app, you agree to the following Terms and Conditions. Please read them carefully.</Text>
       
      <Text className='font-pbold mt-6 mx-2 text-lg'>1. Acceptance of Terms</Text>
      <Text className='text-lg  mx-3.5 '>By accessing or using HotelHaven, you agree to be bound by these Terms and Conditions. If you do not agree, you may not use the App.</Text>

      <Text className='font-pbold mt-6 mx-2 text-lg'>2. Account Registration</Text>
      <Text className='mx-3 text-lg'>To use certain features of the App, you must create an account. You are responsible for maintaining the confidentiality of your login information and all activities that occur under your account.</Text>
      
      <Text className='font-pbold mt-6 mx-2 text-lg'>3. Booking and Payment</Text>
      <Text className='mx-7 text-lg'><View className="mr-3 p-1"><FontAwesome name="circle" size={8} color="black" /></View><Text className='font-pbold '>Room Availabilty:</Text>The availability of rooms is determined by the hotels themselves. HotelHaven is not responsible for any inaccuracies in room availability.</Text>
      <Text className='mx-7 text-lg'><View className="mr-3 p-1"><FontAwesome name="circle" size={8} color="black" /></View><Text className='font-pbold '>Payments:</Text>Payments are processed through secure third-party payment providers. HotelHaven does not store your payment details.</Text>
      <Text className='mx-7 text-lg'><View className="mr-3 p-1"><FontAwesome name="circle" size={8} color="black" /></View><Text className='font-pbold '>No Refuncd Policy:</Text>All bookings made through HotelHaven are final and non-refundable. Please review your booking details carefully before completing your reservation.</Text>
      
      <Text className='font-pbold mt-6 mx-2 text-lg'>4. User Conduct</Text>
      <Text className='font-pbold text-lg mx-7'>You agree not to:</Text>
      <Text className='text-lg mx-8'><View className="mr-3 p-1"><FontAwesome name="circle" size={8} color="black"/></View>Violate any laws or regulations while using the App.</Text>
      <Text className='text-lg mx-8'><View className="mr-3 p-1"><FontAwesome name="circle" size={8} color="black" /></View>Use the App for any fraudulent or illegal activities.</Text>
      <Text className='text-lg mx-8'><View className="mr-3 p-1"><FontAwesome name="circle" size={8} color="black" /></View>Provide false or misleading information.</Text>
      
      <Text className='font-pbold text-lg mt-6 mx-2'>5. Intellectual Property</Text>
      <Text className='mx-3 text-lg'>All content provided in the App, including logos, text, and images, are the intellectual property of HotelHaven or our partners. You may not use this content without our permission.</Text>
      
      <Text className='font-pbold text-lg mt-6 mx-2'>6. Limitation of Liability</Text>
      <Text className='mx-3 text-lg'>HotelHaven is not responsible for any direct, indirect, or incidental damages that result from your use of the App, including issues related to hotel bookings.</Text>
      
      <Text className='font-pbold text-lg mt-6 mx-2'>7. Termination</Text>
      <Text className='mx-3 text-lg'>We may suspend or terminate your account if you violate these Terms and Conditions, without prior notice or liability.</Text>
      
      <Text className='font-pbold text-lg mt-6 mx-2'>8. Changes to Terms</Text>
      <Text className="mx-3 text-lg">We may update these Terms and Conditions from time to time. You will be notified of any changes by an update in the App.</Text>
      
      <Text className='font-pbold text-lg mt-6 mx-2'>9. Contact Us</Text>
      <Text className='mx-3 text-lg'>If you have any questions about these Terms and Conditions, please contact us at <Text className='color-blue-500'>support@hotelhaven.com</Text></Text>
    </View>
    </ScrollView>
  )
}

export default terms