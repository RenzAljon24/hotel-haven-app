import React from 'react'
import { Text,View,TouchableOpacity,ScrollView } from 'react-native'
import { router } from "expo-router";
import { Ionicons } from '@expo/vector-icons';


const faq = () => {
  return (
    <ScrollView>
    <View>
        <Text>1. General Questions</Text>
        <Text>What is HotelHaven?</Text>
        <Text>HotelHaven is a hotel room booking service that allows users to find, compare, and book rooms.</Text>
        <Text>2. Booking Process</Text>
        <Text>How do I book a room?</Text>
        <Text>Simply search for a hotel by entering a location or hotel name, browse the results, select a room, and click "Book Now." You’ll be prompted to select dates and make payment.</Text>
        <Text>3. Account and Profile</Text>
        <Text>How do I reset my password?</Text>
        <Text>If you forget your password, click on the Forgot Password? link on the login screen and follow the instructions to reset it.</Text>
        <Text>Can I delete my account?</Text>
        <Text>Yes, you can delete your account by going to Profile - Account Security - Delete Account. Please note that once your account is deleted, all your data will be permanently removed.</Text>
    </View>
    </ScrollView>
  )
}

export default faq