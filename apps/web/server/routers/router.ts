import { router } from '../trpc'
import { cat } from './index'

export const appRouter = router({
  cat,
})

export type AppRouter = typeof appRouter
