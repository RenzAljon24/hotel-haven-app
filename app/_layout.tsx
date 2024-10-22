import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useCallback } from 'react';
import 'react-native-reanimated';
import '../global.css';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from '@/context/AuthContext';
import { ActivityIndicator } from 'react-native';
import { StripeProvider } from '@stripe/stripe-react-native';

// Main Component
export default function RootLayout() {
  // Load custom fonts
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  
  useEffect(() => {
    const preventSplashScreenAutoHide = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn('Failed to prevent splash screen auto-hide:', e);
      }
    };
    preventSplashScreenAutoHide();
  }, []);

  // Handle fonts error
  useEffect(() => {
    if (error) {
      console.error('Error loading fonts:', error);
    }
  }, [error]);

  //hide the splashw hen the fonts are loaded
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      try {
        await SplashScreen.hideAsync();
      } catch (e) {
        console.warn('Failed to hide splash screen:', e);
      }
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    try {
      return <SplashScreenComponent />;
    } catch (error) {
      console.log(error)
    }
    
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <StripeProvider publishableKey="pk_test_51Q7hMJEX4IweCiIU7yXJN0kNvWkGVx3lzIQExNOw9cwJ8kthRaArhlh0dT1LRdIkYMbjj6gRyBnKVzlOg2xGlUOa00RPE0QcnS">
        <AuthProvider>
          <Stack>
            <Stack.Screen name="LandingPage" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(rooms_screens)" options={{ headerShown: false }} />
            <Stack.Screen name="(hotel-haven-terms)" options={{ headerShown: false }} />
            <Stack.Screen name="(updateProfile)" options={{ headerShown: false }} />
            <Stack.Screen name="RoomDetails" options={{ headerShown: false }} />
            <Stack.Screen name="Successful" options={{ headerShown: false }} />
            <Stack.Screen name="Reservation" options={{ headerTitle: "", headerBlurEffect: 'regular', headerTransparent: true }} />
          </Stack>
        </AuthProvider>
      </StripeProvider>
    </GestureHandlerRootView>
  );
}

// Optional fallback component while fonts are loading
const SplashScreenComponent = () => (
  <GestureHandlerRootView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator size="large" color="#0000ff" />
  </GestureHandlerRootView>
);
