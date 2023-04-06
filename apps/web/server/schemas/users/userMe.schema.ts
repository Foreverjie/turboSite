import { OpenApiMeta } from 'trpc-openapi'
import { z } from 'zod'

export const userMeMeta: OpenApiMeta = {
  openapi: {
    method: 'GET',
    path: '/user.me',
    tags: ['users'],
    summary: 'Return present user',
  },
}
export const userMeInputSchema = z.void()
export const userMeOutputSchema = z.object({
  name: z.string(),
  email: z.string(),
  role: z.string(),
  avatar: z.string(),
  likes: z.array(
    z.object({
      content: z.string(),
    }),
  ),
})

export type UserMeOutput = z.TypeOf<typeof userMeOutputSchema>
