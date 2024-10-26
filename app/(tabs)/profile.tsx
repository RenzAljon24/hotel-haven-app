import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import ProtectedRoute from '@/components/ProtectedRoute';
import { router } from 'expo-router';

const Profile = () => {
  const { signOut, user } = useAuth();
  const Logout = () => {
    signOut();
  };

  return (
    <ProtectedRoute>
      <ScrollView className="flex-1 bg-zinc-50">
        <View className="mt-5 mr-5">
          <View className="flex items-center p-4">
            {user ? (
              <>
                <TouchableOpacity onPress={() => router.push('/(updateProfile)/update-profile')} className="relative">
                  <Image
                    source={{ uri: user.profile }}
                    className="w-32 h-32 rounded-full border-2"
                    style={{ shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84 }}
                  />


                
                  <TouchableOpacity
                    onPress={() => router.push('/(updateProfile)/update-profile')}
                    style={{
                      position: 'absolute',
                      right: 5,
                      bottom: 5,
                      backgroundColor: 'white',
                      borderRadius: 20,
                      padding: 5,
                    }}
                  >
                    <MaterialCommunityIcons name="pencil" size={20} color="#15A86D" />
                  </TouchableOpacity>
                </TouchableOpacity>
                <Text className="font-pbold text-2xl pt-2 text-gray-800" style={{ fontSize: 24 }}>
                  {user.firstName} {user.lastName}
                </Text>
              </>
            ) : (
              <Text className="font-bold text-lg pt-2 text-gray-600">
                No user data available
              </Text>
            )}
          </View>

          <View className="pl-6 rounded-lg ml-4 gap-2 mt-6">
            <Text className='py-1 font-psemibold opacity-50 flex-1' style={{ fontSize: 13 }}>
              Support
            </Text>
            <TouchableOpacity 
              onPress={() => router.push('/(hotel-haven-terms)/faq')} 
              className="mt-4" 
              style={{ flexDirection: 'row', alignItems: 'center' }}
            >
              <MaterialCommunityIcons name="file-document" size={22} color="black" style={{ marginLeft: 5 }} />
              <Text className="font-psemibold text-slate-900" style={{ fontSize: 13, marginLeft: 20 }}>FAQs</Text>
              <AntDesign name="right" size={18} color="black" style={{ marginLeft: 'auto' }} />
            </TouchableOpacity>
            <Text className='py-1 font-psemibold opacity-50 flex-1' style={{ fontSize: 13 }}>
              Information
            </Text>
            <TouchableOpacity 
              onPress={() => router.push('/(hotel-haven-terms)/About')} 
              style={{ flexDirection: 'row', alignItems: 'center' }}
            >
              <MaterialCommunityIcons name="information" size={22} color="black" style={{ marginLeft: 5 }} />
              <Text className="font-psemibold text-slate-900" style={{ fontSize: 13, marginLeft: 20 }}>About Hotel Haven</Text>
              <AntDesign name="right" size={18} color="black" style={{ marginLeft: 'auto' }} />
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => router.push('/(hotel-haven-terms)/privacy')} 
              className="mt-4" 
              style={{ flexDirection: 'row', alignItems: 'center' }}
            >
              <MaterialCommunityIcons name="lock" size={22} color="black" style={{ marginLeft: 5 }} />
              <Text className="font-psemibold text-slate-900" style={{ fontSize: 13, marginLeft: 20 }}>Privacy Policy</Text>
              <AntDesign name="right" size={18} color="black" style={{ marginLeft: 'auto' }} />
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => router.push('/(hotel-haven-terms)/terms')} 
              className="mt-4" 
              style={{ flexDirection: 'row', alignItems: 'center' }}
            >
              <MaterialCommunityIcons name="file-document" size={22} color="black" style={{ marginLeft: 5 }} />
              <Text className="font-psemibold text-slate-900" style={{ fontSize: 13, marginLeft: 20 }}>Terms and Conditions</Text>
              <AntDesign name="right" size={18} color="black" style={{ marginLeft: 'auto' }} />
            </TouchableOpacity>
          </View>

          <View className="p-6 rounded-lg m-4">
            <TouchableOpacity 
              onPress={Logout} 
              style={{ flexDirection: 'row', alignItems: 'center' }}
            >
              <MaterialCommunityIcons name="logout" size={22} color="red" style={{ marginLeft: 5 }} />
              <Text className="font-bold text-lg ml-2 text-red-600" style={{ fontSize: 13, marginLeft: 20 }}>
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
