import { OpenApiMeta } from 'trpc-openapi'
import { z } from 'zod'

export const authSignInMeta: OpenApiMeta = {
  openapi: {
    method: 'POST',
    path: '/auth.signIn',
    tags: ['auth'],
    summary: 'User Sign in',
  },
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
