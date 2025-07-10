import {
  userMeController,
  userStatusController,
  userUpdateController,
  userSignInController,
  userSignOutController,
  userSignUpController,
  userVerifyController,
  userSendOtpController,
} from '../controllers'
import {
  userAllInputSchema,
  userAllMeta,
  userAllOutputSchema,
  userCreateInputSchema,
  userCreateMeta,
  userCreateOutputSchema,
  userMeInputSchema,
  userMeMeta,
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
  userSendOtpInputSchema,
  userSendOtpMeta,
  userSendOtpOutputSchema,
} from '../schemas/users'
import {
  adminProcedure,
  protectedProcedure,
  router,
  publicProcedure,
} from '../trpc'

// export default router
export const user = router({
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
  sendOtp: publicProcedure
    .meta(userSendOtpMeta)
    .input(userSendOtpInputSchema)
    .output(userSendOtpOutputSchema)
    .mutation(userSendOtpController),
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
})
