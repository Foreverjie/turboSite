import * as trpc from '@trpc/server'
import { createRouter } from './routes/createRouter'
import { cat } from './routes/cat.route'

const appRouter = createRouter().merge('cat.', cat)

export type AppRouter = typeof appRouter
export default appRouter
