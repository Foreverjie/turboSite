import { TRPCPanelMeta } from 'trpc-panel'
import { z } from 'zod'

export const userMeMeta: TRPCPanelMeta = {
  description: 'Get current user',
}
export const userMeInputSchema = z.void()

