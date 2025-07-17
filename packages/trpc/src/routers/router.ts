import { z } from 'zod'
import { publicProcedure, router } from '../trpc'
import {  post } from './post.router'
import { user } from './user.router'

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
  user,
  post,
})

export type AppRouter = typeof appRouter
