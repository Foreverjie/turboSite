import { Stack } from 'expo-router'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { TRPCProvider } from '../src/utils/trpcProvider'
import { GlobalLoadingProvider } from '../src/components'
import 'react-native-url-polyfill/auto'

export default function RootLayout() {
  return (
    <TRPCProvider>
      <SafeAreaProvider>
        <GlobalLoadingProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(tabs)" />
          </Stack>
          <StatusBar style="auto" />
        </GlobalLoadingProvider>
      </SafeAreaProvider>
    </TRPCProvider>
  )
}
