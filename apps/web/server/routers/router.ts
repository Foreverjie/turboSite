import { z } from 'zod'
import { publicProcedure, router } from '../trpc'
import { cat } from '.'

export const appRouter = router({
  // sayHello: publicProcedure
  //   .meta({
  //     openapi: { method: 'GET', path: '/say-hello', tags: ['user'] },
  //   })
  //   .input(z.object({ name: z.string() }))
  //   .output(z.object({ greeting: z.string() }))
  //   .query(({ input }) => {
  //     return { greeting: `Hello ${input.name}!` }
  //   }),
  cat,
})

export type AppRouter = typeof appRouter
