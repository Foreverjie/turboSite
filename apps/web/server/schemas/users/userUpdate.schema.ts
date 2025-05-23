import { TRPCPanelMeta } from 'trpc-panel'
import { z } from 'zod'

export const userUpdateMeta: TRPCPanelMeta = {
  description: 'Update user',
}
export const userUpdateInputSchema = z.object({
  name: z.string().optional(),
  image: z.string().optional(),
  handle: z.string().optional(),
})
export const userUpdateOutputSchema = z.object({
  error: z
    .object({
      message: z.string(),
    })
    .nullable(),
})

export type UserUpdateInput = z.TypeOf<typeof userUpdateInputSchema>
export type UserUpdateOutput = z.TypeOf<typeof userUpdateOutputSchema>
