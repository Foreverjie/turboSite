import { OpenApiMeta } from 'trpc-openapi'
import { z } from 'zod'

export const postNewMeta: OpenApiMeta = {
  openapi: {
    method: 'POST',
    path: '/post.new',
    tags: ['posts'],
    summary: 'Send a new post',
  },
}
export const postNewInputSchema = z.object({
  content: z.string(),
  files: z.string().array().optional(),
})
export const postNewOutputSchema = z.object({
  content: z.string(),
  files: z.string().array().optional(),
})

export type PostNewInput = z.TypeOf<typeof postNewInputSchema>
export type PostNewOutput = z.TypeOf<typeof postNewOutputSchema>
