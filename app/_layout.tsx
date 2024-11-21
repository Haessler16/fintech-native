import FontAwesome from '@expo/vector-icons/FontAwesome'
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Link, Stack, useRouter, useSegments } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import 'react-native-reanimated'

import { useColorScheme } from '@/hooks/useColorScheme'
import Colors from '@/constants/Colors'
import { Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { ClerkLoaded, ClerkProvider, useAuth } from '@clerk/clerk-expo'
import * as SecureStore from 'expo-secure-store'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router'

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key)
      if (item) {
        console.log(`${key} was used 🔐 \n`)
      } else {
        console.log('No values stored under key: ' + key)
      }
      return item
    } catch (error) {
      console.error('SecureStore get item error: ', error)
      await SecureStore.deleteItemAsync(key)
      return null
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value)
    } catch (err) {
      return
    }
  },
}

function InitialLayout() {
  const colorScheme = useColorScheme()
  const [loaded, error] = useFonts({
    // SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  })
  const router = useRouter()
  const { isLoaded, isSignedIn } = useAuth()
  const segment = useSegments()

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  useEffect(() => {
    if (!isLoaded) {
      return
    }
    const inAuthGroup = segment[0] === '(authenticated)'

    if (isSignedIn && !inAuthGroup) {
      router.replace('/(authenticated)/(tabs)/home')
    } else if (!isSignedIn && inAuthGroup) {
      router.replace('/')
    }
  }, [isLoaded, isSignedIn])

  if (!loaded && !isLoaded) {
    return <Text>Loading...</Text>
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
        {/* <Stack.Screen name="modal" options={{ presentation: 'modal' }} /> */}
        <Stack.Screen name='index' options={{ headerShown: false }} />
        <Stack.Screen
          name='signup'
          options={{
            title: '',
            headerBackTitle: '',
            headerShadowVisible: false,
            headerStyle: { backgroundColor: Colors.background },
            headerLeft: () => {
              return (
                <TouchableOpacity onPress={router.back}>
                  <Ionicons name='arrow-back' size={34} color={Colors.dark} />
                </TouchableOpacity>
              )
            },
          }}
        />
        <Stack.Screen
          name='signin'
          options={{
            title: '',
            headerBackTitle: '',
            headerShadowVisible: false,
            headerStyle: { backgroundColor: Colors.background },
            headerLeft: () => {
              return (
                <TouchableOpacity onPress={router.back}>
                  <Ionicons name='arrow-back' size={34} color={Colors.dark} />
                </TouchableOpacity>
              )
            },
            headerRight: () => {
              return (
                <Link href='/help' asChild>
                  <TouchableOpacity onPress={router.back}>
                    <Ionicons
                      name='help-circle-outline'
                      size={34}
                      color={Colors.dark}
                    />
                  </TouchableOpacity>
                </Link>
              )
            },
          }}
        />

        <Stack.Screen
          name='help'
          options={{ title: 'Help', presentation: 'modal' }}
        />

        <Stack.Screen
          name='verify/[phone]'
          options={{
            title: '',
            headerBackTitle: '',
            headerShadowVisible: false,
            headerStyle: { backgroundColor: Colors.background },
            headerLeft: () => {
              return (
                <TouchableOpacity onPress={router.back}>
                  <Ionicons name='arrow-back' size={34} color={Colors.dark} />
                </TouchableOpacity>
              )
            },
          }}
        />

        <Stack.Screen
          name='(authenticated)/(tabs)'
          options={{ headerShown: false }}
        />
      </Stack>
    </ThemeProvider>
  )
}

function RootLayoutNav() {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar style='light' />
        <InitialLayout />
      </GestureHandlerRootView>
    </ClerkProvider>
  )
}

export default RootLayoutNav
