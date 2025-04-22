import {
  userALlController,
  userCreateController,
  userMeController,
  userStatusController,
  userUpdateController,
  userSignInController,
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
import {
  userSignInInputSchema,
  userSignInMeta,
  userSignInOutputSchema,
} from '../schemas/users/userSignIn.schema'
import {
  adminProcedure,
  protectedProcedure,
  router,
  publicProcedure,
} from '../trpc'

// export default router
export const user = router({
  create: protectedProcedure
    .meta(userCreateMeta)
    .input(userCreateInputSchema)
    .output(userCreateOutputSchema)
    .mutation(userCreateController),
  signIn: publicProcedure
    // .meta(userSignInMeta)
    .input(userSignInInputSchema)
    .output(userSignInOutputSchema)
    .mutation(userSignInController),
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
