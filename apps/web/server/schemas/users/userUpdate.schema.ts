import { TRPCPanelMeta } from 'trpc-panel'
import { z } from 'zod'

export const userUpdateMeta: TRPCPanelMeta = {
  description: 'Update user',
}
export const userUpdateInputSchema = z.object({
  name: z.string().optional(),
  avatar: z.string().optional(),
})
export const userUpdateOutputSchema = z.object({
  name: z.string(),
  email: z.string().nullable(),
  role: z.string(),
  avatar: z.string(),
})

export type UserUpdateInput = z.TypeOf<typeof userUpdateInputSchema>
export type UserUpdateOutput = z.TypeOf<typeof userUpdateOutputSchema>
