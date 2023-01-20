import { OpenApiMeta } from 'trpc-openapi'
import { z } from 'zod'

export const catListMeta: OpenApiMeta = {
  openapi: {
    method: 'GET',
    path: '/cat.list',
    tags: ['cats'],
    summary: 'Read all cats',
  },
}
export const catListInputSchema = z.void()
export const catListOutputSchema = z
  .object({ name: z.string(), id: z.string() })
  .array()

export type CatListOutput = z.TypeOf<typeof catListOutputSchema>
