import type { TRPCPanelMeta } from 'trpc-panel'
import { z } from 'zod'

export const postEditMeta: TRPCPanelMeta = {
  description: 'Edit post by id',
}
export const postEditInputSchema = z.object({
  id: z.string().nullable(),
  content: z.string().optional(),
  isBlocked: z.boolean().optional(),
  files: z.string().array().optional(),
})
export const postEditOutputSchema = z.object({
  id: z.number(),
  type: z.string(),
  content: z.string(),
  files: z.string().array(),
  likeBy: z
    .object({
      userId: z.string(),
    })
    .array(),
  author: z.object({
    id: z.number(),
    name: z.string(),
    avatar: z.string(),
  }),
  updatedAt: z.date(),
  postId: z.string(),
})

export type PostEditInput = z.TypeOf<typeof postEditInputSchema>
export type PostEditOutput = z.TypeOf<typeof postEditOutputSchema>
