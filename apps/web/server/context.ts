import * as trpc from '@trpc/server'
import { getAuth } from '@clerk/nextjs/server'
import type {
  SignedInAuthObject,
  SignedOutAuthObject,
} from '@clerk/nextjs/server'
import * as trpcNext from '@trpc/server/adapters/next'

interface InnerContext {
  auth: SignedInAuthObject | SignedOutAuthObject
  opts: trpcNext.CreateNextContextOptions
}

/**
 * This helper generates the "internals" for a tRPC context. If you need to use
 * it, you can export it from here
 *
 * Examples of things you may need it for:
 * - testing, so we dont have to mock Next.js' req/res
 * - trpc's `createSSGHelpers` where we don't have req/res
 * @see https://create.t3.gg/en/usage/trpc#-servertrpccontextts
 */
const createInnerTRPCContext = ({ auth, opts }: InnerContext) => {
  return {
    auth,
    ...opts,
  }
}

/**
 * This is the actual context you'll use in your router. It will be used to
 * process every request that goes through your tRPC endpoint
 * @link https://trpc.io/docs/context
 */
export const createTRPCContext = async (
  opts: trpcNext.CreateNextContextOptions,
) => {
  const { req } = opts

  return createInnerTRPCContext({ auth: getAuth(req), opts })
}

export type Context = trpc.inferAsyncReturnType<typeof createTRPCContext>
