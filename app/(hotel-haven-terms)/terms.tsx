import { View, Text } from 'react-native'
import React from 'react'

const terms = () => {
  return (
    <View>
      <Text>HotelHaven’s Term & Condition</Text>
      <Text>Welcome to HotelHaven! By using our app, you agree to the following Terms and Conditions. Please read them carefully.</Text>
      <Text className='font-pbold'>1. Acceptance of Terms</Text>
      <Text>By accessing or using HotelHaven, you agree to be bound by these Terms and Conditions. If you do not agree, you may not use the App.</Text>
      <Text className='font-pbold'>2. Account Registration</Text>
      <Text>To use certain features of the App, you must create an account. You are responsible for maintaining the confidentiality of your login information and all activities that occur under your account.</Text>
      <Text className='font-pbold'>3. Booking and Payment</Text>
      <Text>Room Availability: The availability of rooms is determined by the hotels themselves. HotelHaven is not responsible for any inaccuracies in room availability.</Text>
      <Text>Payments: Payments are processed through secure third-party payment providers. HotelHaven does not store your payment details.</Text>
      <Text>No Refund Policy: All bookings made through HotelHaven are final and non-refundable. Please review your booking details carefully before completing your reservation.</Text>
      <Text className='font-pbold'>4. User Conduct</Text>
      <Text>You agree not to:</Text>
      <Text>Violate any laws or regulations while using the App.</Text>
      <Text>Use the App for any fraudulent or illegal activities.</Text>
      <Text>Provide false or misleading information.</Text>
      <Text className='font-pbold'>5. Intellectual Property</Text>
      <Text>All content provided in the App, including logos, text, and images, are the intellectual property of HotelHaven or our partners. You may not use this content without our permission.</Text>
      <Text className='font-pbold'>6. Limitation of Liability</Text>
      <Text>HotelHaven is not responsible for any direct, indirect, or incidental damages that result from your use of the App, including issues related to hotel bookings.</Text>
      <Text className='font-pbold'>7. Termination</Text>
      <Text>We may suspend or terminate your account if you violate these Terms and Conditions, without prior notice or liability.</Text>
      <Text className='font-pbold'>8. Changes to Terms</Text>
      <Text>We may update these Terms and Conditions from time to time. You will be notified of any changes by an update in the App.</Text>
      <Text className='font-pbold'>9. Contact Us</Text>
      <Text>If you have any questions about these Terms and Conditions, please contact us at support@hotelhaven.com</Text>
    </View>
  )
}

export default terms