import { Tabs } from 'expo-router'
import { Text, View } from 'react-native'
import { AuthGuard } from '../../src/components/AuthGuard'
import { Ionicons } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function TabLayout() {
  const insets = useSafeAreaInsets()
  
  return (
    <AuthGuard requireAuth={true}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            borderTopWidth: 0.5,
            borderTopColor: 'rgba(0, 0, 0, 0.1)',
            paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: -2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 5,
          },
          tabBarActiveTintColor: '#FF6B35',
          tabBarInactiveTintColor: '#9CA3AF',
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '600',
            marginTop: 4,
          },
          tabBarItemStyle: {
            paddingVertical: 4,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: '首页',
            tabBarIcon: ({ focused, color }) => (
              <Ionicons 
                name={focused ? 'home' : 'home-outline'} 
                size={22} 
                color={color} 
              />
            ),
          }}
        />
        <Tabs.Screen
          name="subscription"
          options={{
            title: '订阅',
            tabBarIcon: ({ focused, color }) => (
              <Ionicons 
                name={focused ? 'library' : 'library-outline'} 
                size={22} 
                color={color} 
              />
            ),
          }}
        />
        <Tabs.Screen
          name="discovery"
          options={{
            title: '发现',
            tabBarIcon: ({ focused, color }) => (
              <Ionicons 
                name={focused ? 'compass' : 'compass-outline'} 
                size={22} 
                color={color} 
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: '设置',
            tabBarIcon: ({ focused, color }) => (
              <Ionicons 
                name={focused ? 'settings' : 'settings-outline'} 
                size={22} 
                color={color} 
              />
            ),
          }}
        />
      </Tabs>
    </AuthGuard>
  )
}
