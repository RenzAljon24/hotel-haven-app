import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome';

const privacy = () => {
  return (
    <ScrollView>
      <View>
        <View className='pt-4 flex justify-items-start mt-10 mx-5'>
          <TouchableOpacity onPress={() => router.push('/(tabs)/profile')} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="arrow-back-outline" size={24} color="black" />
            <Text className='font-psemibold text-center mx-28 text-xl'>Privacy Policies</Text>
          </TouchableOpacity>
        </View>

        <View className='flex-1'>
          <View className='flex-1 justify-center align-middle'>
            <Text className="text-2xl mt-10 font-pbold">
              <Text className='text-center'>Privacy Policies for <Text className='color-green-600'>HotelHaven</Text></Text>
            </Text>
          </View>
          <View className="mx-7 mt-4">
          <Text className="flex text-justify text-lg">In HotelHaven, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and share information when you use our app for hotel room booking services.</Text>
          </View>


          <View className="mx-7 mt-4">
          <Text className='font-pbold text-xl'>1. Information We Collect</Text>
          <Text className="text-lg mb-2">
          <Text className="flex text-justify text-lg"><View className="mr-3 p-1"><FontAwesome name="circle" size={8} color="black"/></View>Personal Information:</Text> When you use <Text className='color-green-600 font-pbold'>HotelHaven</Text>, we may collect personal information such as your name, email address, phone number, and payment information.
          </Text>
         
          <Text className="text-lg mb-2">
          <Text className="flex text-justify text-lg"><View className="mr-3 p-1"><FontAwesome name="circle" size={8} color="black"/></View>Usage Information:</Text> We collect information about how you interact with the App, including which rooms you view and book, as well as other preferences.</Text>
          <Text className="text-lg mb-2">
            <Text className="flex text-justify text-lg"><View className="mr-3 p-1"><FontAwesome name="circle" size={8} color="black"/></View>Location Data:</Text> We may collect your location information if you allow us to do so, for the purpose of showing nearby hotels.</Text>
          </View>
          

          <View className="mx-7 mt-4">
          <Text className='font-pbold text-lg'>2. How We Use Your Information</Text>
          <Text className="text-lg mb-2">
          <Text className="flex text-justify text-lg"><View className="mr-3 p-1"><FontAwesome name="circle" size={8} color="black"/></View>Providing Services:</Text> To facilitate room bookings, process payments, and provide customer support.
          </Text>
          <Text className="text-lg mb-2">
          <Text className="flex text-justify text-lg"><View className="mr-3 p-1"><FontAwesome name="circle" size={8} color="black"/></View>Improvement of Services:</Text> To analyze app usage trends and improve features and performance.</Text>
          <Text className="text-lg mb-2">
            <Text className="flex text-justify text-lg"><View className="mr-3 p-1"><FontAwesome name="circle" size={8} color="black"/></View>Marketing:</Text> To send you promotional offers or updates, which you can opt out of at any time.</Text>
          </View>
          

          <View className="mx-7 mt-4">
          <Text className='font-pbold text-lg'>3. How We Share Your Information</Text>
          <Text className="text-lg mb-2">
          <Text className="flex text-justify text-lg"><View className="mr-3 p-1"><FontAwesome name="circle" size={8} color="black"/></View>With Hotel Partners:</Text> We share booking details with the hotels you choose to stay at.
          </Text>
          <Text className="text-lg mb-2">
          <Text className="flex text-justify text-lg"><View className="mr-3 p-1"><FontAwesome name="circle" size={8} color="black"/></View>Third-Party Service Providers:</Text> We may share your data with third parties to process payments, send emails, or store data securely.
          </Text>
          
          <Text className="text-lg mb-2">
          <Text className="flex text-justify text-lg"><View className="mr-3 p-1"><FontAwesome name="circle" size={8} color="black"/></View>Legal Requirements:</Text> We may disclose your information if required by law or in response to a legal request.
          </Text>
          
          </View>
          
          <View className="mx-7 mt-4">
          <Text className='font-pbold text-lg'>4. Data Security</Text>
          <Text className="flex text-justify text-lg">We use appropriate security measures to protect your personal data from unauthorized access, disclosure, or destruction.</Text>
          </View>
          
          <View className="mx-7 mt-4">
          <Text className='font-pbold text-lg'>5. Your Choices</Text>
          <Text className="flex text-justify text-lg">
          You can modify or remove your personal information at any time via your account settings, or request account deletion by reaching out to our support team.</Text>
          </View>
          
          <View className="mx-7 mt-4 mb-10">
          <Text className='font-pbold text-lg'>6. Changes to This Policy</Text>
          <Text className="flex text-justify text-lg \">We may update this Privacy Policy from time to time. You will be notified of any changes by an update in the App.</Text>
          </View>
          

        </View>
      </View>

    </ScrollView>

  )
}

export default privacy