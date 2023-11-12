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
import { Webhook } from 'svix'
import { z, ZodError } from 'zod'
import superjson from 'superjson'

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
  if (!ctx.auth.userId) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You need to Sign In first.',
    })
  }
  return next({
    ctx: {
      auth: ctx.auth,
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

const webhookSecret = process.env.WEBHOOK_SECRET

/**
 * webhook procedure
 *
 * If you want a query or mutation to ONLY be accessible to webhook, use
 * this. It verifies the session is valid
 *
 */
export const webhookProcedure = t.procedure
  .input(z.any())
  .use(async ({ input, next, ctx }) => {
    if (!webhookSecret) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Webhook secret not found',
      })
    }
    try {
      const headersList = ctx.req.headers as any

      const headers = {
        'svix-id': headersList.get('svix-id'),
        'svix-signature': headersList.get('svix-signature'),
        'svix-timestamp': headersList.get('svix-timestamp'),
      }

      const wh = new Webhook(webhookSecret)
      wh.verify(JSON.stringify(input), headers)
      return next()

      // manually verify
      // const signedContent = `${headersList.get('svix-id')}.${headersList.get(
      //   'svix-timestamp',
      // )}.${JSON.stringify(input)}`

      // const secretBytes = new Buffer(webhookSecret.split('_')[1], 'base64')
      // const signature = crypto
      //   .createHmac('sha256', secretBytes)
      //   .update(signedContent)
      //   .digest('base64')
      // const expectedSignature = headersList
      //   .get('svix-signature')
      //   .split(' ')
      //   .map((s: string) => s.split(',')[1])

      // if (expectedSignature.includes(signature)) {
      //   return next()
      // } else {
      //   throw new TRPCError({
      //     code: 'UNAUTHORIZED',
      //     message: 'Incorrect Signature',
      //   })
      // }
    } catch (err) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: `Verify webhook failed. ${err}`,
      })
    }
  })

export const adminProcedure = protectedProcedure.use(restrictTo(['admin']))
