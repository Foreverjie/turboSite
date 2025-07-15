import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import { AppNavigator } from './src/components/AppNavigator'
import { TRPCProvider } from './src/utils/trpcProvider'
import { supabase } from './lib/supabase'
import 'react-native-url-polyfill/auto'
import { useEffect, useState } from 'react'
import { Session } from '@supabase/supabase-js'

export default function App() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <TRPCProvider>
      <View style={styles.container}>
        <AppNavigator session={session} />
        <StatusBar style="auto" />
      </View>
    </TRPCProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})
