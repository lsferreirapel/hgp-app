import '@root/global.css'

import { useEffect, useState } from 'react'
import { LogBox } from 'react-native'
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'

// import Reactotron from 'reactotron-react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useFonts } from 'expo-font'
import { router, SplashScreen, Stack } from 'expo-router'

import { DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { Session } from '@supabase/supabase-js'

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider'
import { supabase } from '@/config/supabase'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

// Reactotron.configure().useReactNative().connect()

LogBox.ignoreAllLogs() //Ignore all log notifications

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  })

  const [session, setSession] = useState<Session | null>(null)

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
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  if (!loaded) {
    return null
  }

  if (!!session && !!session.user) router.replace('/(private)/(tabs)')

  return <RootLayoutNav />
}

function RootLayoutNav() {
  return (
    <GluestackUIProvider mode={'light'}>
      <ThemeProvider value={DefaultTheme}>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="index" />
          </Stack>
          <Toast />
        </SafeAreaProvider>
      </ThemeProvider>
    </GluestackUIProvider>
  )
}
