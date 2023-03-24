import type { OpenApiMeta } from 'trpc-openapi'
import { z } from 'zod'

export const catListMeta: OpenApiMeta = {
  openapi: {
    method: 'GET',
    path: '/cat.list',
    tags: ['cat'],
    summary: 'Read all cats',
  },
}
export const catListInputSchema = z.void()
export const catListOutputSchema = z
  .object({ name: z.string(), id: z.number() })
  .array()

export type CatListOutput = z.TypeOf<typeof catListOutputSchema>
