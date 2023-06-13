import { createTRPCReact, httpLink } from '@trpc/react-query'
import type { AppRouter } from '~/server/routers'

export const trpc = createTRPCReact<AppRouter>()
