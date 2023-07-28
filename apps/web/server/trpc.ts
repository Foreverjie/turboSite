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
import { restrictTo } from './middlewares'
import { z, ZodError } from 'zod'
import { type Context } from './context'
import { Webhook } from 'svix'
import { buffer } from 'micro'
import crypto from 'crypto'

// export const t = initTRPC.meta<TRPCPanelMeta>().create({
const t = initTRPC.context<Context>().create({
  /**
   * @see https://trpc.io/docs/v10/data-transformers
   */
  // transformer: superjson,
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
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  return next({
    ctx: {
      auth: ctx.auth,
    },
  })
})

// const webhookMiddleware = t.middleware(async ({ ctx, input, next, ...res }) => {
//   // const payload = (await buffer(req)).toString();
//   //   const headers = req.headers;

//   //   const wh = new Webhook(secret);
//   //   let msg;
//   //   try {
//   //       msg = wh.verify(payload, headers);
//   //   } catch (err) {
//   //       res.status(400).json({});
//   //   }

//   //   // Do something with the message...

//   //   res.json({});

//   console.log('webhookMiddleware', ctx, input, res)

//   return next()
// })

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

// const webhookSecret = process.env.WEBHOOK_SECRET
const webhookSecret = 'whsec_FCPDv8XCTFUr/rqYjDcnQy9/5FcZHtun'

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
    try {
      const headersList = ctx.req.headers as any

      const signedContent = `${headersList.get('svix-id')}.${headersList.get(
        'svix-timestamp',
      )}.${input.toString()}`

      const secretBytes = new Buffer(webhookSecret.split('_')[1], 'base64')
      const signature = crypto
        .createHmac('sha256', secretBytes)
        .update(signedContent)
        .digest('base64')
      console.log('signature', signature)
      throw new TRPCError({ code: 'UNAUTHORIZED', message: 'test' })
    } catch (err) {
      console.log('err', err)
      throw new TRPCError({ code: 'UNAUTHORIZED' })
    }

    return next()
  })

export const adminProcedure = protectedProcedure.use(restrictTo(['admin']))
