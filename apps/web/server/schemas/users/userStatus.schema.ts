import { TRPCPanelMeta } from 'trpc-panel'
import { z } from 'zod'

export const userStatusMeta: TRPCPanelMeta = {
  description: 'Get current user status',
}
export const userStatusInputSchema = z.void()
export const userStatusOutputSchema = z.object({
  status: z.enum([
    'NEED_ONBOARDING',
    'INFORMATION_INCOMPLETE',
    'ACTIVE',
    'ERROR',
    'LOCKED',
  ]),
})

export type UserStatusOutput = z.TypeOf<typeof userStatusOutputSchema>
