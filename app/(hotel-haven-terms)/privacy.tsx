import { View, Text } from 'react-native'
import React from 'react'

const privacy = () => {
  return (
    <View>
      <Text>Privacy Policies for <Text className='color-green-600'>HotelHaven</Text></Text>
      <Text>In HotelHaven, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and share information when you use our app for hotel room booking services.</Text>
      <Text>1. Information We Collect</Text>
      <Text>Personal Information: When you use HotelHaven, we may collect personal information such as your name, email address, phone number, and payment information.</Text>
      <Text>Usage Information: We collect information about how you interact with the App, including which rooms you view and book, as well as other preferences.</Text>
      <Text>Location Data: We may collect your location information if you allow us to do so, for the purpose of showing nearby hotels.</Text>
      <Text>2. How We Use Your Information</Text>
      <Text>Providing Services: To facilitate room bookings, process payments, and provide customer support.</Text>
      <Text>Improvement of Services: To analyze app usage trends and improve features and performance.</Text>
      <Text>Marketing: To send you promotional offers or updates, which you can opt out of at any time.</Text>
      <Text>3. How We Share Your Information</Text>
      <Text>With Hotel Partners: We share booking details with the hotels you choose to stay at.</Text>
      <Text>Third-Party Service Providers: We may share your data with third parties to process payments, send emails, or store data securely.</Text>
      <Text>Legal Requirements: We may disclose your information if required by law or in response to a legal request.</Text>

      <Text>4. Data Security</Text>
      <Text>We use appropriate security measures to protect your personal data from unauthorized access, disclosure, or destruction.</Text>
      <Text>5. Your Choices</Text>
      <Text>You may update or delete your personal information at any time by accessing your account settings in the App. You can also request to have your account deleted by contacting our support team.</Text>
      <Text>6. Changes to This Policy</Text>
      <Text>We may update this Privacy Policy from time to time. You will be notified of any changes by an update in the App.</Text>
      
    </View>
  )
}

export default privacy