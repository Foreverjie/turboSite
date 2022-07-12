import { createRouter } from './createRouter'
import { cat } from './cat.route'
import { auth } from './auth.route'
import { user } from './user.route'

const appRouter = createRouter()
  .merge('cat.', cat)
  .merge('auth.', auth)
  .merge('user.', user)

export type AppRouter = typeof appRouter
export default appRouter
