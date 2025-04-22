import { TRPCPanelMeta } from 'trpc-panel'
import { z } from 'zod'

export const userSignInMeta: TRPCPanelMeta = {
  description: 'Sign in user',
}
export const userSignInInputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(100),
})
export const userSignInOutputSchema = z.object({
  error: z
    .object({
      message: z.string(),
    })
    .nullable(),
})

export type UserSignInInput = z.TypeOf<typeof userSignInInputSchema>
export type UserSignInOutput = z.TypeOf<typeof userSignInOutputSchema>
