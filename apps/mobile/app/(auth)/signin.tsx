import React from 'react'
import { SignInScreen } from '../../src/screens'
import { router } from 'expo-router'

export default function SignInPage() {
  const handleSignInSuccess = () => {
    router.replace('/(tabs)/')
  }

  return <SignInScreen onSignInSuccess={handleSignInSuccess} />
}
