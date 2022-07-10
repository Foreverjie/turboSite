import express, { Router } from 'express'
import { loginHandler, registerHandler } from '../controllers/auth.controller'
import { requireUser } from '../middlewares/requireUser'
import { validate } from '../middlewares/validate'
import { createUserSchema, loginUserSchema } from '../schemas/user.schema'
import { createRouter } from './createRouter'
import { TRPCError } from '@trpc/server'
import prisma from '../../prisma/prisma-client'
import z from 'zod'

// const router: Router = express.Router()

// // Register user route
// router.post('/register', validate(createUserSchema), registerHandler)

// // Login user route
// router.post('/login', loginHandler)

// export default router

export const auth = createRouter().mutation('login', {
  input: z.object({ email: z.string(), password: z.string() }),
  async resolve({ input }) {
    const { email } = input

    const user = await prisma.user.findUnique({
      where: { email },
      select: { email: true },
    })
    if (!user) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: `could not find user with email ${email}`,
      })
    }
    return user
  },
})
