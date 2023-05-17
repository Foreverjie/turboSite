import { TRPCPanelMeta } from 'trpc-panel'
import { z } from 'zod'

export const catCreateMeta: TRPCPanelMeta = {
  description: 'Create a cat',
}
export const catCreateInputSchema = z.object({
  name: z.string({
    required_error: 'Name is required',
  }),
})
export const catCreateOutputSchema = z.object({ name: z.string() })

export type CatCreateInput = z.TypeOf<typeof catCreateInputSchema>
export type CatCreateOutput = z.TypeOf<typeof catCreateOutputSchema>
