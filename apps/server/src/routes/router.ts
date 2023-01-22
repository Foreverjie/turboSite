import { router, mergeRouters } from '../trpc'
import { cat, user, auth } from '.'
import { post } from './post.route'

// const appRouter = createRouter()
//   .merge('cat.', cat)
//   .merge('auth.', auth)
//   .merge('user.', user)
//   .merge('post.', post)

const appRouter = router({
  cat,
  auth,
  user,
  // post,
})

export type AppRouter = typeof appRouter
export default appRouter
