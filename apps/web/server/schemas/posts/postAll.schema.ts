import type { TRPCPanelMeta } from 'trpc-panel'
import { z } from 'zod'

export const postAllMeta: TRPCPanelMeta = {
  description: 'List all posts',
}
export const postAllInputSchema = z.void()
export const postAllOutputSchema = z
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
  })
  .array()

export type PostAllOutput = z.TypeOf<typeof postAllOutputSchema>
