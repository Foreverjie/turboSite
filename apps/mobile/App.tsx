import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { SignInScreen } from './src/screens';

export default function App() {
  return (
    <View style={styles.container}>
      <SignInScreen />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
