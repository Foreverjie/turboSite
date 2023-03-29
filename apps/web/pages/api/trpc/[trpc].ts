import { createOpenApiNextHandler } from 'trpc-openapi'
import { appRouter } from '@/server/routers/router'
import { createTRPCContext } from '@/server/trpc'

export default createOpenApiNextHandler({
  router: appRouter,
  createContext: createTRPCContext,
})
