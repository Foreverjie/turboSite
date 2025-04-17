'use server'

import { createClient } from '~/utils/supabase/server'

export const signIn = async () => {
  try {
    const supabase = await createClient()
    const res = await supabase.auth.signInWithPassword({
      email: '864129545@qq.com',
      password: 'zzj123,.',
    })
    console.log('Sign in response:', res)
  } catch (err) {
    handleError(err)
  }
}

export const signOut = async () => {
  try {
    const supabase = await createClient()
    const { error } = await supabase.auth.signOut()
    if (error) {
      handleError(error)
    } else {
      console.log('Sign out successful')
    }
  } catch (err) {
    handleError(err)
  }
}

const handleError = (error: any) => {
  console.error('Error:', error.message || error)
}

export const signUp = async ({
  email,
  password,
}: {
  email: string
  password: string
}) => {
  try {
    const supabase = await createClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })
    if (error) {
      handleError(error)
    } else {
      console.log('Sign up successful')
    }
  } catch (err) {
    handleError(err)
  }
}

export const getUser = async () => {
  try {
    const supabase = await createClient()
    const { data: session, error } = await supabase.auth.getUser()
    if (error) {
      handleError(error)
    } else {
      return session.user || null
    }
  } catch (err) {
    handleError(err)
  }
}
