import { OpenApiMeta } from 'trpc-openapi'
import { z } from 'zod'

export const catCreateMeta: OpenApiMeta = {
  openapi: {
    method: 'POST',
    path: '/cat.create',
    tags: ['cat'],
    summary: 'create a cat with name',
  },
}
export const catCreateInputSchema = z.object({
  name: z.string({
    required_error: 'Name is required',
  }),
})

export type CatCreateInput = z.TypeOf<typeof catCreateInputSchema>
