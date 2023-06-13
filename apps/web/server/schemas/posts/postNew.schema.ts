import type { TRPCPanelMeta } from 'trpc-panel'
import { z } from 'zod'

export const postNewMeta: TRPCPanelMeta = {
  description: 'Create a new post',
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
