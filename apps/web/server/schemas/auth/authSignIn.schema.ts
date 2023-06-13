import type { TRPCPanelMeta } from 'trpc-panel'
import { z } from 'zod'

export const authSignInMeta: TRPCPanelMeta = {
  description: 'Sign in',
}
export const authSignInInputSchema = z.object({
  email: z.string(),
  password: z.string(),
})
export const authSignInOutputSchema = z.object({
  email: z.string(),
  name: z.string(),
  avatar: z.string(),
})

export type AuthSignInInput = z.TypeOf<typeof authSignInInputSchema>
export type AuthSignInOutput = z.TypeOf<typeof authSignInOutputSchema>
