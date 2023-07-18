import { TRPCPanelMeta } from 'trpc-panel'
import { z } from 'zod'

export const userMeMeta: TRPCPanelMeta = {
  description: 'Get current user',
}
export const userMeInputSchema = z.void()
export const userMeOutputSchema = z.object({
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

export type UserMeOutput = z.TypeOf<typeof userMeOutputSchema>
