import { TRPCPanelMeta } from 'trpc-panel'
import { z } from 'zod'

export const userSyncMeta: TRPCPanelMeta = {
  // TODO remove
  description: 'Sync user data from Clerk',
}
export const userSyncInputSchema = z.any()
export const userSyncOutputSchema = z.boolean()

export type UserSyncInput = z.TypeOf<typeof userSyncInputSchema>
export type UserSyncOutput = z.TypeOf<typeof userSyncOutputSchema>
