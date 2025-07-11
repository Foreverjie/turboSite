import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import { AppNavigator } from './src/components/AppNavigator'
import { TRPCProvider } from './src/utils/trpcProvider'

export default function App() {
  return (
    <TRPCProvider>
      <View style={styles.container}>
        <AppNavigator />
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
