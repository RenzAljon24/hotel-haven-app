import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { images } from '@/constants';
import { router } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const About = () => {
  return (
    
    <ScrollView >
        <View className='pt-4 flex justify-items-start mb-10 mt-10 mx-5'>
          <TouchableOpacity onPress={() => router.push('/(tabs)/profile')} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <AntDesign name="left" size={24} color="black" />
            <Text className='font-psemibold text-center mx-28 text-xl'>About</Text>
          </TouchableOpacity>
          <View className='flex-1 mt-8 p-3' style={{backgroundColor: 'white', borderColor: 'black', borderRadius: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.50, shadowRadius: 3.84, elevation: 10}}>
            <Text className='font-psemibold' style={{textAlign: 'center', fontSize: 18}}>About <Text style={{color: '#15A86D'}}>HotelHaven</Text></Text>
            <Text className='font-psemibold' style={{textAlign: 'center', fontSize: 11}}>Welcome to <Text>HotelHaven</Text>, your go-to-app for seamless hotel booking! Whether you're planning a vacation, business trip, or a spontaneous getaway,<Text>HotelHaven</Text> makes finding and booking the perfect room simple, fast, and secure</Text>
          </View>
          <View className='flex-1 mt-2 p-3' style={{width: 140, backgroundColor: 'white', borderColor: 'black', borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.50, shadowRadius: 3.84, elevation: 10}}>
            <Text className='font-pbold' style={{textAlign: 'center', fontSize: 18}}>Our <Text style={{color: '#15A86D'}}>Mission</Text></Text>
          </View>
          <View className='flex-1 mt-2 p-3' style={{alignItems: 'center', width: 140, height: 120, backgroundColor: 'white', borderColor: 'black', borderRadius: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.50, shadowRadius: 3.84, elevation: 10}}>
          <Image source={images.icon} style={{width: 80, height: 100}}/></View>
          <View className='flex-1 mt-3 p-3' style={{width: 174, height: 179, marginTop: -179, marginLeft: 150, backgroundColor: 'white', borderColor: 'black', borderRadius: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.50, shadowRadius: 3.84, elevation: 10}}>
            <Text className='font-psemibold' style={{textAlign: 'center', fontSize: 11}}>At<Text> HotelHaven</Text>, we aim to make hotel bookings easier and more convenient. We believe that everyone deserves a stress-free travel experience, and finding a hotel should be the first step in that journey</Text>
          </View>
           <View className='flex-1 mt-3 p-3' style={{backgroundColor: 'white', borderColor: 'black', borderRadius: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.50, shadowRadius: 3.84, elevation: 10}}>
            <Text className='font-psemibold' style={{textAlign: 'left', fontSize: 18}}>What we offer</Text>
            <Text className='font-pbold' style={{textAlign: 'left', fontSize: 11}}>· Cross-Platform App: <Text className='font-psemibold'>HotelHaven can be download on both android, and ios.</Text></Text>
            <Text className='font-pbold' style={{textAlign: 'left', fontSize: 11}}>· User Authentication: <Text className='font-psemibold'>Enable registration and login of user.</Text></Text>
          </View>        
          <Text className='font-pregular opacity-50' style={{textAlign: 'center', marginTop: 150}}>© Team PuTech 2024</Text>                                 
        </View>
    </ScrollView>
  )
}

export default About