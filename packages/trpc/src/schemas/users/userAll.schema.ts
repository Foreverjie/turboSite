import { TRPCPanelMeta } from 'trpc-panel'
import { z } from 'zod'

export const userAllMeta: TRPCPanelMeta = {
  description: 'Get all users',
}
export const userAllInputSchema = z.void()
export const userAllOutputSchema = z
  .object({ name: z.string(), email: z.string(), role: z.string() })
  .array()

export type UserAllOutput = z.TypeOf<typeof userAllOutputSchema>
