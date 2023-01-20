import { OpenApiMeta } from 'trpc-openapi'
import { z } from 'zod'

export const userUpdateMeta: OpenApiMeta = {
  openapi: {
    method: 'POST',
    path: '/user.update',
    tags: ['users'],
    summary: 'Update present user',
  },
}
export const userUpdateInputSchema = z.object({
  name: z.string().optional(),
  avatar: z.string().optional(),
})
export const userUpdateOutputSchema = z.object({
  name: z.string(),
  email: z.string(),
  role: z.string(),
  avatar: z.string(),
})

export type UserUpdateInput = z.TypeOf<typeof userUpdateInputSchema>
export type UserUpdateOutput = z.TypeOf<typeof userUpdateOutputSchema>
