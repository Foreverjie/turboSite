import {
  userALlController,
  userCreateController,
  userMeController,
  userStatusController,
  userUpdateController,
} from '../controllers/users'
import {
  userAllInputSchema,
  userAllMeta,
  userAllOutputSchema,
  userCreateInputSchema,
  userCreateMeta,
  userCreateOutputSchema,
  userMeInputSchema,
  userMeMeta,
  userMeOutputSchema,
  userStatusInputSchema,
  userStatusMeta,
  userStatusOutputSchema,
  userUpdateInputSchema,
  userUpdateMeta,
  userUpdateOutputSchema,
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
    // .output(userMeOutputSchema)
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
