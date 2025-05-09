import {
  userALlController,
  userCreateController,
  userMeController,
  userStatusController,
  userUpdateController,
  userSignInController,
  userSignOutController,
  userSignUpController,
  userVerifyController,
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
  userSignInInputSchema,
  userSignInMeta,
  userSignInOutputSchema,
  userSignOutMeta,
  userSignOutOutputSchema,
  userSignUpInputSchema,
  userSignUpMeta,
  userSignUpOutputSchema,
  userStatusInputSchema,
  userStatusMeta,
  userStatusOutputSchema,
  userUpdateInputSchema,
  userUpdateMeta,
  userUpdateOutputSchema,
  userVerifyInputSchema,
  userVerifyMeta,
  userVerifyOutputSchema,
} from '../schemas/users'
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
    .meta(userSignInMeta)
    .input(userSignInInputSchema)
    .output(userSignInOutputSchema)
    .mutation(userSignInController),
  signUp: publicProcedure
    .meta(userSignUpMeta)
    .input(userSignUpInputSchema)
    .output(userSignUpOutputSchema)
    .mutation(userSignUpController),
  signOut: protectedProcedure
    .meta(userSignOutMeta)
    .output(userSignOutOutputSchema)
    .mutation(userSignOutController),
  verify: publicProcedure
    .meta(userVerifyMeta)
    .input(userVerifyInputSchema)
    .output(userVerifyOutputSchema)
    .mutation(userVerifyController),
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
