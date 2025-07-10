import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter, createTRPCContext } from 'trpc-config'
import { type NextRequest } from 'next/server'
import { createClient } from '~/utils/supabase/server'
import { db } from '~/drizzle/client'

// this is the server RPC API handler

const handler = async (req: NextRequest) => {
  console.log(`incoming request ${req.url}`)

  const supabase = await createClient()

  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => createTRPCContext({ req, supabase, db }),
    onError: ({ path, error }) => {
      console.error(
        `❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`,
      )
    },
  })
}

export const GET = handler
export const POST = handler
