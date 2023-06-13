import { publicProcedure, router } from '../trpc'
import {
  // authSignInInputSchema,
  // authSignInMeta,
  // authSignInOutputSchema,
  authSignUpInputSchema,
  authSignUpMeta,
  authSignUpOutputSchema,
} from '../schemas/auth'
import {
  // authSignInController,
  authSignUpController,
} from '../controllers/auth'

export const auth = router({
  // Sign in Handled by NextAuth.js
  // signIn: publicProcedure
  //   .meta(authSignInMeta)
  //   .input(authSignInInputSchema)
  //   .output(authSignInOutputSchema)
  //   .mutation(authSignInController),
  signUp: publicProcedure
    .meta(authSignUpMeta)
    .input(authSignUpInputSchema)
    .output(authSignUpOutputSchema)
    .mutation(authSignUpController),
})
