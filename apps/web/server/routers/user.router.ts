import {
  userALlController,
  userMeController,
  userUpdateController,
  userStatusController,
  userCreateController,
  userSyncController,
} from '../controllers/users'
import {
  userAllInputSchema,
  userAllMeta,
  userAllOutputSchema,
  userMeInputSchema,
  userMeMeta,
  userMeOutputSchema,
  userUpdateInputSchema,
  userUpdateMeta,
  userUpdateOutputSchema,
  userStatusMeta,
  userStatusInputSchema,
  userStatusOutputSchema,
  userCreateMeta,
  userCreateInputSchema,
  userCreateOutputSchema,
  userSyncMeta,
  userSyncInputSchema,
  userSyncOutputSchema,
} from '../schemas/users'
import {
  adminProcedure,
  protectedProcedure,
  router,
  webhookProcedure,
} from '../trpc'

// export default router
export const user = router({
  sync: webhookProcedure
    .meta(userSyncMeta)
    .input(userSyncInputSchema)
    .output(userSyncOutputSchema)
    .mutation(userSyncController),
  create: protectedProcedure
    .meta(userCreateMeta)
    .input(userCreateInputSchema)
    .output(userCreateOutputSchema)
    .mutation(userCreateController),
  status: protectedProcedure
    .meta(userStatusMeta)
    .input(userStatusInputSchema)
    .output(userStatusOutputSchema)
    .query(userStatusController),
  me: protectedProcedure
    .meta(userMeMeta)
    .input(userMeInputSchema)
    .output(userMeOutputSchema)
    .query(userMeController),
  update: protectedProcedure
    .meta(userUpdateMeta)
    .input(userUpdateInputSchema)
    .output(userUpdateOutputSchema)
    .mutation(userUpdateController),
  all: adminProcedure
    .meta(userAllMeta)
    .input(userAllInputSchema)
    .output(userAllOutputSchema)
    .query(userALlController),
})
