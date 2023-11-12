import {
  createTRPCProxyClient,
  createTRPCReact,
  httpBatchLink,
  loggerLink,
} from '@trpc/react-query'
import { cookies } from 'next/headers'
import type { AppRouter } from '~/server/routers'
import superjson from 'superjson'
import { getBaseUrl } from '../client/trpcClient'

export const trpc = createTRPCReact<AppRouter>() // for client provider

export const trpcApi = createTRPCProxyClient<AppRouter>({
  transformer: superjson,
  links: [
    loggerLink({
      enabled: () => true,
    }),
    httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`,
    }),
  ],
})
