import { TRPCError } from '@trpc/server'
import { UserSendOtpInput, UserSendOtpOutput } from '~/server/schemas/users'
import { createClient } from '~/utils/supabase/server'

export const userSendOtpController = async (input: {
  input: UserSendOtpInput
}): Promise<UserSendOtpOutput> => {
  const { email, type } = input.input

  try {
    // Create Supabase client
    const supabase = await createClient()
    if (type === 'signin') {
      // Send OTP using Supabase Auth
      const { error } = await supabase.auth.signInWithOtp({
        email,
      })
      if (error) {
        console.error('Error sending OTP:', error.message)
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: error.message || 'Failed to send OTP',
        })
      }
    }

    return {
      error: null,
      success: true,
    }
  } catch (error) {
    console.error('Unexpected error in sendOtp:', error)
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to send OTP',
    })
  }
}
