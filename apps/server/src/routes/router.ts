import * as trpc from '@trpc/server'
import { createRouter } from './createRouter'
import { cat } from './cat.route'
import { auth } from './auth.route'

const appRouter = createRouter().merge('cat.', cat).merge('auth.', auth)

export type AppRouter = typeof appRouter
export default appRouter
