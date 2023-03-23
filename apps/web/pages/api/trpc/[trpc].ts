import { createOpenApiNextHandler } from 'trpc-openapi'
import { appRouter } from '@/server/routers/router'

export default createOpenApiNextHandler({ router: appRouter })
