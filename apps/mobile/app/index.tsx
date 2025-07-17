import { useEffect } from 'react'
import { Redirect } from 'expo-router'
import { supabase } from '../lib/supabase'

export default function Index() {
  // 直接重定向到认证页面，让 AuthGuard 处理具体的逻辑
  return <Redirect href="/(auth)/signin" />
}
