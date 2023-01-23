import { router } from '../trpc'
import { cat, user, auth, post } from '.'

const appRouter = router({
  cat,
  auth,
  user,
  post,
})

export type AppRouter = typeof appRouter
export default appRouter
