import * as trpc from '@trpc/server'
import { createRouter } from './routes/createRouter'
import { cat } from './routes/cat.route'
import { auth } from './routes/auth.route'

const appRouter = createRouter().merge('cat.', cat).merge('auth.', auth)

export type AppRouter = typeof appRouter
export default appRouter
