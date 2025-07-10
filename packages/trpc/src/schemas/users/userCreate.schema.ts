import { TRPCPanelMeta } from 'trpc-panel'
import { z } from 'zod'

export const userCreateMeta: TRPCPanelMeta = {
  description: 'Create a new user',
}
export const userCreateInputSchema = z.void()
export const userCreateOutputSchema = z.boolean()

export type UserCreateOutput = z.TypeOf<typeof userCreateOutputSchema>
