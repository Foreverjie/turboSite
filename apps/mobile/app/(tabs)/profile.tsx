import React from 'react'
import { ProfileScreen } from '../../src/screens'
import { router } from 'expo-router'

export default function SettingsPage() {
  const handleSignOut = () => {
    // 退出登录后跳转到登录页面
    router.replace('/(auth)/signin')
  }

  return <ProfileScreen onSignOut={handleSignOut} />
}
