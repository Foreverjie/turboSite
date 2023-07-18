import { TRPCPanelMeta } from 'trpc-panel'
import { z } from 'zod'

export const userStatusMeta: TRPCPanelMeta = {
  description: 'Get current user status',
}
export const userStatusInputSchema = z.void()
export const userStatusOutputSchema = z.object({
  name: z.string(),
  email: z.string(),
  role: z.string(),
  avatar: z.string(),
  likes: z.array(
    z.object({
      content: z.string(),
    }),
  ),
})

export type UserStatusOutput = z.TypeOf<typeof userStatusOutputSchema>
