'use server'

import { createClient } from '~/utils/supabase/server'
import { XOR } from '../../../../lib/types'

export const signIn = async ({
  email,
  password,
  otp,
}: {
  email: string
} & XOR<{ password: string }, { otp: string }>) => {
  try {
    const supabase = await createClient()
    if (!email) {
      throw new Error('Email is required')
    }

    if (password) {
      await supabase.auth.signInWithPassword({
        email,
        password,
      })
    } else if (otp) {
      await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'email',
      })
    }
  } catch (err) {
    handleError(err)
  }
}

export const sendOTP = async (email: string) => {
  try {
    const supabase = await createClient()
    await supabase.auth.signInWithOtp({
      email,
    })
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
