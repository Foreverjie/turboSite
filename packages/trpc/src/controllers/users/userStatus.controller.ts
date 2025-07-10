import { UserStatusOutput } from '../../schemas/users'
import { TRPCError } from '@trpc/server'

export const userStatusController = async ({
  ctx,
}: any): Promise<UserStatusOutput> => {
  throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: `Failed to get user status. Not implemented yet.`,
    })
}
