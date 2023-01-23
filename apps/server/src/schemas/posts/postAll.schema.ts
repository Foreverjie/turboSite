import { OpenApiMeta } from 'trpc-openapi'
import { z } from 'zod'

export const postAllMeta: OpenApiMeta = {
  openapi: {
    method: 'GET',
    path: '/post.all',
    tags: ['posts'],
    summary: 'Get all post',
  },
}
export const postAllInputSchema = z.void()
export const postAllOutputSchema = z
  .object({
    id: z.string(),
    type: z.string(),
    content: z.string(),
    files: z.string().array(),
    likeByIds: z.string().array(),
    author: z.object({
      id: z.string(),
      name: z.string(),
      avatar: z.string(),
    }),
  })
  .array()

export type PostAllOutput = z.TypeOf<typeof postAllOutputSchema>
