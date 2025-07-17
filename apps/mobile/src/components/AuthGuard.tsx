import React, { useEffect, useState } from 'react'
import { router } from 'expo-router'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { supabase } from '../../lib/supabase'
import type { Session } from '@supabase/supabase-js'

interface AuthGuardProps {
  children: React.ReactNode
  requireAuth?: boolean
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ 
  children, 
  requireAuth = true 
}) => {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 获取初始会话
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
      
      // 根据认证状态重定向
      if (requireAuth && !session) {
        router.replace('/(auth)/signin')
      } else if (!requireAuth && session) {
        router.replace('/(tabs)/')
      }
    })

    // 监听认证状态变化
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
        
        if (requireAuth && !session) {
          router.replace('/(auth)/signin')
        } else if (!requireAuth && session) {
          router.replace('/(tabs)/')
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [requireAuth])

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    )
  }

  return <>{children}</>
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
})
