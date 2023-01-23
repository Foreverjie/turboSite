import { OpenApiMeta } from 'trpc-openapi'
import { z } from 'zod'

export const postLikeMeta: OpenApiMeta = {
  openapi: {
    method: 'POST',
    path: '/post.like',
    tags: ['posts'],
    summary: 'Like a post',
  },
}
export const postLikeInputSchema = z.object({
  id: z.string(),
})
export const postLikeOutputSchema = z.boolean()

export type PostLikeInput = z.TypeOf<typeof postLikeInputSchema>
export type PostLikeOutput = z.TypeOf<typeof postLikeOutputSchema>

export const postDislikeMeta: OpenApiMeta = {
  openapi: {
    method: 'POST',
    path: '/post.dislike',
    tags: ['posts'],
    summary: 'Dislike a post',
  },
}
export const postDislikeInputSchema = z.object({
  id: z.string(),
})
export const postDislikeOutputSchema = z.boolean()

export type PostDislikeInput = z.TypeOf<typeof postDislikeInputSchema>
export type PostDislikeOutput = z.TypeOf<typeof postDislikeOutputSchema>
