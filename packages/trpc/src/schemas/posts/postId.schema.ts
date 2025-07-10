import type { TRPCPanelMeta } from 'trpc-panel'
import { z } from 'zod'

export const postIdMeta: TRPCPanelMeta = {
  description: 'Get post by id',
}
export const postIdInputSchema = z.object({
  id: z.string().nullable(),
})
export const postIdOutputSchema = z
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
  .nullable()

export type PostIdInput = z.TypeOf<typeof postIdInputSchema>
export type PostIdOutput = z.TypeOf<typeof postIdOutputSchema>
