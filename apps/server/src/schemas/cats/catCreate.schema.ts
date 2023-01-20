import { z } from 'zod'

export const catCreateInputSchema = z.object({
  name: z.string({
    required_error: 'Name is required',
  }),
})

export type CatCreateInput = z.TypeOf<typeof catCreateInputSchema>
