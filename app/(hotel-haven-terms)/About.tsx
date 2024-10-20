import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { images } from '@/constants';
import { router } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

const About = () => {
  return (
    
    <ScrollView >
      <View className='' style={{flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center', width: 80}}>
      <View className='flex-1 justify-center' style={{shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, backgroundColor: 'white', marginTop: 100, height: 50, borderRadius: 5, alignItems: 'center'}}>
        <Text className='font-pbold'>About</Text>
      </View>
      <TouchableOpacity 
              onPress={() => router.push('/(tabs)/profile')} 
              style={{ flexDirection: 'row', alignItems: 'center' }}
            >
              <AntDesign name="arrowleft" size={24} color="gray" className='' style={{marginLeft: 10}}/>
              <Text className="font-pbold text-slate-900" style={{fontSize: 15, alignSelf: 'center', marginLeft: 10}}>About</Text>
            </TouchableOpacity>
      </View>
      <View className='' style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: 250, marginLeft: 150, marginTop: -150 }}>
      <View className='flex-1 justify-center' style={{alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, backgroundColor: 'white', marginTop: 100, height: 150, borderRadius: 5,}}>
      <Image 
            source={images.logo}
            className='' 
            style={{width: 150, height: 60}}
          />
      </View>
      </View>
    </ScrollView>
  )
}

export default About