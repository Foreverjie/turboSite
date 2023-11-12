import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter } from '~/server/routers/router'
import { createTRPCContext } from '~/server/context'
import { type NextRequest } from 'next/server'

// this is the server RPC API handler

const handler = (req: NextRequest) => {
  console.log(`incoming request ${req.url}`)
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => createTRPCContext({ req }),
    onError: ({ path, error }) => {
      console.error(
        `❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`,
      )
    },
  })
}

export const GET = handler
export const POST = handler
