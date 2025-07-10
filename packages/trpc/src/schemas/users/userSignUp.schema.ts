import { TRPCPanelMeta } from 'trpc-panel'
import { z } from 'zod'

export const userSignUpMeta: TRPCPanelMeta = {
  description: 'Sign up user',
}
export const userSignUpInputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(100),
  passwordConfirmation: z.string().min(6).max(100),
})
export const userSignUpOutputSchema = z
  .object({
    error: z
      .object({
        message: z.string(),
      })
      .nullable(),
  })
  .nullable()

export type UserSignUpInput = z.TypeOf<typeof userSignUpInputSchema>
export type UserSignUpOutput = z.TypeOf<typeof userSignUpOutputSchema>
