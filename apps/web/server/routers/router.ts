import { router } from '../trpc'
import { cat } from '.'

export const appRouter = router({
  cat,
})

export type AppRouter = typeof appRouter
