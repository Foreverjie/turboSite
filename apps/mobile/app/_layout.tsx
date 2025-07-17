import { Stack } from 'expo-router'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { TRPCProvider } from '../src/utils/trpcProvider'
import 'react-native-url-polyfill/auto'

export default function RootLayout() {
  return (
    <TRPCProvider>
      <SafeAreaProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
        </Stack>
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </TRPCProvider>
  )
}
