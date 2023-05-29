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
    // files: z.string().array(),
    // likeByIds: z.string().array(),
    author: z.object({
      id: z.number(),
      name: z.string(),
      avatar: z.string(),
    }),
  })
  .array()

export type PostAllOutput = z.TypeOf<typeof postAllOutputSchema>
