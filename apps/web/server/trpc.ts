/**
 * This is your entry point to setup the root configuration for tRPC on the server.
 * - `initTRPC` should only be used once per app.
 * - We export only the functionality that we use so we can enforce which base procedures should be used
 *
 * Learn how to create protected base procedures and other things below:
 * @see https://trpc.io/docs/v10/router
 * @see https://trpc.io/docs/v10/procedures
 */
import { initTRPC, TRPCError } from '@trpc/server'
import superjson from 'superjson'
import { ZodError } from 'zod'

import { type Context } from './context'
import { restrictTo } from './middlewares'

// export const t = initTRPC.meta<TRPCPanelMeta>().create({
const t = initTRPC.context<Context>().create({
  /**
   * @see https://trpc.io/docs/v10/data-transformers
   */
  transformer: superjson,
  /**
   * @see https://trpc.io/docs/v10/error-formatting
   */
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    }
  },
})

// check if the user is signed in, otherwise throw a UNAUTHORIZED CODE
const isAuthed = t.middleware(({ next, ctx }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You need to Sign In first.',
    })
  }
  return next({
    ctx: {
      user: ctx.user,
    },
  })
})

/**
 * Create a router
 * @see https://trpc.io/docs/v10/router
 */
export const router = t.router
/**
 * Create an unprotected procedure
 * @see https://trpc.io/docs/v10/procedures
 **/
export const publicProcedure = t.procedure
/**
 * @see https://trpc.io/docs/v10/middlewares
 */
export const middleware = t.middleware
/**
 * @see https://trpc.io/docs/v10/merging-routers
 */
export const mergeRouters = t.mergeRouters

/**
 * Protected (auth) procedure
 *
 * If you want a query or mutation to ONLY be accessible to logged in users, use
 * this. It verifies the session is valid and guarantees ctx.session.user is not
 * null
 *
 * @see https://trpc.io/docs/procedures
 */
export const protectedProcedure = t.procedure.use(isAuthed)

export const adminProcedure = protectedProcedure.use(restrictTo(['admin']))
