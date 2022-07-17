import { createRouter } from './createRouter'
import { cat } from './cat.route'
import { auth } from './auth.route'
import { user } from './user.route'
import { post } from './post.route'

const appRouter = createRouter()
  .merge('cat.', cat)
  .merge('auth.', auth)
  .merge('user.', user)
  .merge('post.', post)

export type AppRouter = typeof appRouter
export default appRouter
