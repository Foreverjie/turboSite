import {
  userALlController,
  userMeController,
  userUpdateController,
  userStatusController,
  userCreateController,
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
} from '../schemas/users'
import { adminProcedure, protectedProcedure, router } from '../trpc'

// export default router
export const user = router({
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
