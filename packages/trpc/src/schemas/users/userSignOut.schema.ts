import { TRPCPanelMeta } from 'trpc-panel'
import { z } from 'zod'

export const userSignOutMeta: TRPCPanelMeta = {
  description: 'Sign out user',
}
export const userSignOutOutputSchema = z.object({
  error: z
    .object({
      message: z.string(),
    })
    .nullable(),
})

export type UserSignOutOutput = z.TypeOf<typeof userSignOutOutputSchema>
