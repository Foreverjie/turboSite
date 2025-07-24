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
      url: z.string(),
      contentHtml: z.string().nullish(),
      contentText: z.string().nullish(),
      summary: z.string().nullish(),
      itemId: z.string().nullish(),
      authors: z
        .object({
          name: z.string().nullish(),
          url: z.string().nullish(),
          avatar: z.string().nullish(),
        })
        .array()
        .nullish(),
      attachments: z
        .object({
          url: z.string(),
          mimeType: z.string().nullish(),
          title: z.string().nullish(),
          sizeInBytes: z.number().nullish(),
          durationInSeconds: z.number().nullish(),
        })
        .array()
        .nullish(),
      isRead: z.number().default(0),
      isFavorite: z.number().default(0),
      dateModified: z.date().nullish(),
      rssSubId: z.number().nullish(),
      tags: z.string().array().nullish(),
      datePublished: z.date().nullish(),
      description: z.string().nullish(),
      sourceFeedUrl: z.string().nullish(),
      // RSS Subscription information
      rssSub: z.object({
        id: z.number(),
        title: z.string(),
        icon: z.string().nullish(),
        favicon: z.string().nullish(),
        homePageUrl: z.string().nullish(),
        description: z.string().nullish(),
      }).nullish(),
    })
    .array(),
  nextCursor: z.number().nullish(),
})

export type PostAllInput = z.TypeOf<typeof postAllInputSchema>
export type PostAllOutput = z.TypeOf<typeof postAllOutputSchema>
