import { OpenApiMeta } from 'trpc-openapi'
import { z } from 'zod'

export const userAllMeta: OpenApiMeta = {
  openapi: {
    method: 'GET',
    path: '/user.all',
    tags: ['users'],
    summary: 'Return all users',
  },
}
export const userAllInputSchema = z.void()
export const userAllOutputSchema = z
  .object({ name: z.string(), email: z.string(), role: z.string() })
  .array()

export type UserAllOutput = z.TypeOf<typeof userAllOutputSchema>
