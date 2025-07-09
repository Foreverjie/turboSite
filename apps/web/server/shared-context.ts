/**
 * Web application tRPC context - using shared trpc package
 */
import { NextRequest } from 'next/server'
import { createClient } from '../utils/supabase/server'
import { createWebTRPCContextFactory } from 'trpc-config/context'

/**
 * Inner context for web application
 */
interface InnerContext {
  user: any | null
  headers: Headers
}

/**
 * Create inner tRPC context
 */
const createInnerTRPCContext = async ({ user, headers }: InnerContext) => {
  return {
    user,
    headers,
  }
}

/**
 * Main tRPC context creation function
 * This uses the shared trpc package's context factory
 */
export const createTRPCContext = async (opts: { req: NextRequest }) => {
  const { req } = opts

  const supabase = await createClient()
  const userRes = await supabase.auth.getUser()

  return createInnerTRPCContext({
    user: userRes.data?.user ?? null,
    headers: req.headers,
  })
}

export type Context = Awaited<ReturnType<typeof createTRPCContext>>
