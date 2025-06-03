import { TRPCPanelMeta } from 'trpc-panel'
import { z } from 'zod'

export const userSendOtpMeta: TRPCPanelMeta = {
  description: 'Send OTP to user email',
}

export const userSendOtpInputSchema = z.object({
  email: z.string().email(),
  type: z.enum(['signin', 'signup', 'magiclink', 'recovery']).default('signin'),
})

export const userSendOtpOutputSchema = z.object({
  error: z
    .object({
      message: z.string(),
    })
    .nullable(),
  success: z.boolean(),
})

export type UserSendOtpInput = z.TypeOf<typeof userSendOtpInputSchema>
export type UserSendOtpOutput = z.TypeOf<typeof userSendOtpOutputSchema>
