import type { TRPCPanelMeta } from 'trpc-panel'
import { z } from 'zod'

export const postRefreshMeta: TRPCPanelMeta = {
  description: 'Refresh and fetch newest RSS items from external source',
}

export const postRefreshInputSchema = z.object({
  force: z.boolean().optional().default(false),
})

export const postRefreshOutputSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  itemsCount: z.number().optional(),
  error: z.string().nullable(),
})

export type PostRefreshInput = z.TypeOf<typeof postRefreshInputSchema>
export type PostRefreshOutput = z.TypeOf<typeof postRefreshOutputSchema>
