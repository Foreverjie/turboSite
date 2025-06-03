'use server'

import { createClient } from '~/utils/supabase/server'

export const sendOTP = async (email: string) => {
  try {
    const supabase = await createClient()
    return await supabase.auth.signInWithOtp({
      email,
    })
  } catch (err) {
    handleError(err)
    return {
      error: 'Unknown error',
    }
  }
}

const handleError = (error: any) => {
  console.error('Error:', error.message || error)
}
