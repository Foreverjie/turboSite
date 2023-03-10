import { OpenApiMeta } from 'trpc-openapi'
import { z } from 'zod'

export const postEditMeta: OpenApiMeta = {
  openapi: {
    method: 'POST',
    path: '/post.edit',
    tags: ['posts'],
    summary: 'Edit post',
  },
}
export const postEditInputSchema = z.object({
  id: z.number(),
  content: z.string().optional(),
  isBlocked: z.boolean().optional(),
  files: z.string().array().optional(),
})
export const postEditOutputSchema = z.object({
  type: z.string(),
  content: z.string(),
  // files: z.string().array(),
  isBlocked: z.boolean(),
  // likeByIds: z.string().array(),
  author: z.object({
    id: z.number(),
    name: z.string(),
    avatar: z.string(),
  }),
  updatedAt: z.date(),
  repost: z
    .object({
      content: z.string(),
    })
    .nullable(),
})

export type PostEditInput = z.TypeOf<typeof postEditInputSchema>
export type PostEditOutput = z.TypeOf<typeof postEditOutputSchema>
