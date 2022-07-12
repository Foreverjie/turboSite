import express, { Router } from 'express'
import {
  getAllUsersHandler,
  getMeHandler,
} from '../controllers/user.controller'
import { deserializeUser } from '../middlewares/deserializeUser'
import { requireUser } from '../middlewares/requireUser'
import { restrictTo } from '../middlewares/restrictTo'
import { createRouter } from './createRouter'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

// const router: Router = express.Router()
// router.use(deserializeUser, requireUser)

// // Admin Get Users route
// router.get('/', restrictTo('admin'), getAllUsersHandler)

// // Get my info route
// router.get('/me', getMeHandler)

// export default router
export const user = createRouter()
  .middleware(deserializeUser)
  // .middleware(requireUser)
  .query('me', {
    output: z.object({ name: z.string(), email: z.string() }),
    async resolve({ ctx }: any) {
      console.log('ctx', ctx)
      return ctx.res.locals.user
    },
  })
