import * as trpc from '@trpc/server'
import { NextRequest } from 'next/server'
import { type User } from '@supabase/auth-helpers-nextjs'
import { createWebContext } from 'trpc-config/src/adapters/web'
import { AdapterContext } from 'trpc-config/src/adapters'

interface InnerContext extends AdapterContext {
  user: User | null
  headers: Headers
}

/**
 * This helper generates the "internals" for a tRPC context. If you need to use
 * it, you can export it from here
 *
 * Examples of things you may need it for:
 * - testing, so we don't have to mock Next.js' req/res
 * - trpc's `createSSGHelpers` where we don't have req/res
 * @see https://create.t3.gg/en/usage/trpc#-servertrpccontextts
 */
const createInnerTRPCContext = async ({
  user,
  headers,
  auth,
  db,
}: InnerContext) => {
  return {
    user,
    headers,
    auth,
    db,
  }
}

/**
 * This is the actual context you'll use in your router. It will be used to
 * process every request that goes through your tRPC endpoint
 * @link https://trpc.io/docs/context
 */
export const createTRPCContext = async (opts: { req: NextRequest }) => {
  const { req } = opts

  // Create context with shared adapters
  const adapterContext = await createWebContext()

  return createInnerTRPCContext({
    user: adapterContext.user ?? null,
    headers: req.headers,
    auth: adapterContext.auth,
    db: adapterContext.db,
  })
}

export type Context = trpc.inferAsyncReturnType<typeof createTRPCContext>
