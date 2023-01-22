import {
  userALlController,
  userMeController,
  userUpdateController,
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
} from '../schemas/users'
import { deserializeUser, restrictTo, requireUser } from '../middlewares'
import { publicProcedure, router } from '../trpc'

// export default router
export const user = router({
  me: publicProcedure
    .meta(userMeMeta)
    .use(deserializeUser)
    .use(requireUser)
    .input(userMeInputSchema)
    .output(userMeOutputSchema)
    .query(userMeController),
  update: publicProcedure
    .meta(userUpdateMeta)
    .use(deserializeUser)
    .use(requireUser)
    .input(userUpdateInputSchema)
    .output(userUpdateOutputSchema)
    .mutation(userUpdateController),
  all: publicProcedure
    .meta(userAllMeta)
    .use(deserializeUser)
    .use(requireUser)
    .use(restrictTo(['admin']))
    .input(userAllInputSchema)
    .output(userAllOutputSchema)
    .query(userALlController),
})
