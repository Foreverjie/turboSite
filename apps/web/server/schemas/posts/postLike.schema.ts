import type { TRPCPanelMeta } from 'trpc-panel'
import { z } from 'zod'

export const postLikeMeta: TRPCPanelMeta = {
  description: 'Like a post / Dislike a post',
}

export const postLikeInputSchema = z.object({
  id: z.number(),
  like: z.boolean(),
})
export const postLikeOutputSchema = z.boolean()

export type PostLikeInput = z.TypeOf<typeof postLikeInputSchema>
export type PostLikeOutput = z.TypeOf<typeof postLikeOutputSchema>
