import { Stack } from 'expo-router'
import { AuthGuard } from '../../src/components/AuthGuard'

export default function AuthLayout() {
  return (
    <AuthGuard requireAuth={false}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen 
          name="signin" 
          options={{ 
            title: '登录'
          }} 
        />
      </Stack>
    </AuthGuard>
  )
}
