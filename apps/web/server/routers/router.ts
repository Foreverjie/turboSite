import { z } from 'zod'
import { publicProcedure, router } from '../trpc'
import { cat, post, user, ip } from '.'

export const appRouter = router({
  sayHello: publicProcedure
    .meta({
      description: 'Say hello',
    })
    .input(z.object({ name: z.string() }))
    .output(z.object({ greeting: z.string() }))
    .query(({ input }) => {
      return { greeting: `Hello ${input.name}!` }
    }),
  cat,
  post,
  user,
  ip,
})

export type AppRouter = typeof appRouter
