import type { TRPCPanelMeta } from 'trpc-panel'
import { z } from 'zod'

export const catListMeta: TRPCPanelMeta = {
  description: 'List all cats',
}
export const catListInputSchema = z.void()
export const catListOutputSchema = z
  .object({ name: z.string(), id: z.number() })
  .array()

export type CatListOutput = z.TypeOf<typeof catListOutputSchema>
