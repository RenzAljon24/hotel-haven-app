import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import ProtectedRoute from '@/components/ProtectedRoute';
import { router } from 'expo-router';


const Profile = () => {
  const { signOut, user } = useAuth();

  const Logout = () => {
    signOut();
  };


  return (
    <ProtectedRoute>
      <ScrollView className="flex-1 bg-gray-200">
        <View className="mt-5">
          <View className="flex items-center p-4">
            {user && user.profile ? (
              <>
                <Image
                  source={{ uri: user.profile }}
                  className="w-32 h-32 rounded-full border-2 border-blue-500"
                />
                <Text className="font-bold text-2xl pt-2 text-gray-800">
                  {user.firstName} {user.lastName}
                </Text>
              </>
            ) : (
              <Text className="font-bold text-lg pt-2 text-gray-600">
                No user data available
              </Text>
            )}
          </View>

          <View className="pl-6 rounded-lg  ml-4 gap-2 mt-6">
            <Text className='py-1 font-pblack'>
                Information
            </Text>
            <TouchableOpacity 
              onPress={() => router.push('/(hotel-haven-terms)/About')} 
              style={{ flexDirection: 'row', alignItems: 'center' }}
            >
              <MaterialCommunityIcons name="information-outline" size={24} color="black" />
              <Text className="font-pregular text-lg ml-2 text-slate-900">About Hotel Haven</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => router.push('/(hotel-haven-terms)/privacy')} 
              className="mt-4" 
              style={{ flexDirection: 'row', alignItems: 'center' }}
            >
              <MaterialCommunityIcons name="lock-outline" size={24} color="black" />
              <Text className="font-pregular text-lg ml-2 text-slate-900">Privacy Policy</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => router.push('/(hotel-haven-terms)/terms')} 
              className="mt-4" 
              style={{ flexDirection: 'row', alignItems: 'center' }}
            >
              <MaterialCommunityIcons name="file-document-outline" size={24} color="black" />
              <Text className="font-pregular text-lg ml-2 text-slate-900">Terms and Conditions</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => router.push('/(hotel-haven-terms)/faq')} 
              className="mt-4" 
              style={{ flexDirection: 'row', alignItems: 'center' }}
            >
              <MaterialCommunityIcons name="file-document-outline" size={24} color="black" />
              <Text className="font-pregular text-lg ml-2 text-slate-900">FAQs</Text>
            </TouchableOpacity>
          </View>

          <View className="p-6  rounded-lg  m-4">
            <TouchableOpacity 
              onPress={Logout} 
              style={{ flexDirection: 'row', alignItems: 'center' }}
            >
              <MaterialCommunityIcons name="logout" size={24} color="red" />
              <Text className="font-bold text-lg ml-2 text-red-600">
                Log out
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ProtectedRoute>
  );
};

export default Profile;
