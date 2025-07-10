import type { TRPCPanelMeta } from 'trpc-panel'
import { z } from 'zod'

export const postAllMeta: TRPCPanelMeta = {
  description: 'List all posts',
}
export const postAllInputSchema = z.object({
  limit: z.number().min(1).max(100).nullish(),
  cursor: z.number().nullish(),
})
export const postAllOutputSchema = z.object({
  posts: z
    .object({
      createdAt: z.date(),
      title: z.string().nullish(),
      link: z.string(),
      publicationDate: z.date(),
      description: z.string().nullish(),
      sourceFeedUrl: z.string().nullish(),
    })
    .array(),
  nextCursor: z.number().nullish(),
})

export type PostAllInput = z.TypeOf<typeof postAllInputSchema>
export type PostAllOutput = z.TypeOf<typeof postAllOutputSchema>
