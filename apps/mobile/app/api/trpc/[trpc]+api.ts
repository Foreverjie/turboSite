import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter, createTRPCContext } from 'trpc-config'
import { supabase } from '../../../lib/supabase'

export async function GET(req: Request) {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => createTRPCContext({ req, supabase }),
  })
}

export async function POST(req: Request) {
  console.log("Received POST request");
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => createTRPCContext({ req, supabase }),
  })
}
