import { OpenApiMeta } from 'trpc-openapi'
import { z } from 'zod'

export const postByIdMeta: OpenApiMeta = {
  openapi: {
    method: 'GET',
    path: '/post.postById',
    tags: ['posts'],
    summary: 'Get a post by id',
  },
}
export const postByIdInputSchema = z.object({ id: z.number() })
export const postByIdOutputSchema = z.object({
  type: z.string(),
  content: z.string(),
  // files: z.string().array(),
  isBlocked: z.boolean(),
  isDeleted: z.boolean(),
  author: z.object({
    id: z.number(),
    name: z.string(),
    avatar: z.string(),
  }),
})

export type PostByIdInput = z.TypeOf<typeof postByIdInputSchema>
export type PostByIdOutput = z.TypeOf<typeof postByIdOutputSchema>
