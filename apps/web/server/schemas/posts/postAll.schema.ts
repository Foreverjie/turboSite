import type { TRPCPanelMeta } from 'trpc-panel'
import { z } from 'zod'

export const postAllMeta: TRPCPanelMeta = {
  description: 'List all posts',
}
export const postAllInputSchema = z.object({
  limit: z.number().min(1).max(100).nullish(),
  cursor: z.any(),
})
export const postAllOutputSchema = z.object({
  posts: z
    .object({
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
      createdAt: z.date(),
      updatedAt: z.date(),
      postId: z.string(),
    })
    .array(),
  nextCursor: z.string().nullish(),
})

export type PostAllInput = z.TypeOf<typeof postAllInputSchema>
export type PostAllOutput = z.TypeOf<typeof postAllOutputSchema>
