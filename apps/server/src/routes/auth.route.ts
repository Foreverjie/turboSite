import { createRouter } from './createRouter'
import { TRPCError } from '@trpc/server'
import prisma from '../../prisma/prisma-client'
import z from 'zod'
import { CookieOptions } from 'express'
import bcrypt from 'bcryptjs'
import { signJwt } from '../utils/jwt'
import config from 'config'
import redisClient from '../utils/connectRedis'

const accessTokenCookieOptions: CookieOptions = {
  expires: new Date(
    Date.now() + config.get<number>('accessTokenExpiresIn') * 60 * 1000,
  ),
  maxAge: config.get<number>('accessTokenExpiresIn') * 60 * 1000,
  httpOnly: true,
  sameSite: 'lax',
}

// Only set secure to true in production
if (process.env.NODE_ENV === 'production')
  accessTokenCookieOptions.secure = true

// Sign Token
export const signToken = async (user: any) => {
  // Sign the access token
  const accessToken = signJwt(
    {
      sub: user.id,
      user: {
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    },
    {
      expiresIn: `${config.get<number>('accessTokenExpiresIn')} days`,
    },
  )

  // Create a Session
  redisClient.set(user.id.toString(), JSON.stringify(user), {
    EX: 60 * 60,
  })

  // Return access token
  return { accessToken }
}

export const auth = createRouter()
  .mutation('SignIn', {
    input: z.object({ email: z.string(), password: z.string() }),
    async resolve({ input, ctx }: any) {
      const { email, password } = input

      const user = await prisma.user.findUnique({
        where: { email },
        select: {
          id: true,
          email: true,
          password: true,
          name: true,
          avatar: true,
        },
      })
      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Could not find user with email ${email}`,
        })
      }
      if (!bcrypt.compare(user.password, password)) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: `Invalid email or password`,
        })
      }
      const { accessToken } = await signToken(user)

      // can middleware or context do this?
      ctx.res.cookie('accessToken', accessToken, accessTokenCookieOptions)
      ctx.res.cookie('logged_in', true, {
        ...accessTokenCookieOptions,
        httpOnly: false,
      })

      return accessToken
    },
  })
  .mutation('SignUp', {
    input: z.object({
      email: z.string().email(),
      name: z.string().min(1, { message: "Can't Be Empty" }),
      password: z
        .string()
        .min(8, { message: 'Must be 8 or more characters long.' })
        .max(32, { message: 'Must be 32 or fewer characters long.' }),
      passwordConfirm: z
        .string()
        .min(8, { message: 'Must be 8 or more characters long.' })
        .max(32, { message: 'Must be 32 or fewer characters long.' }),
    }),
    async resolve({ input }) {
      const { email, name, password, passwordConfirm } = input

      const count = await prisma.user.count({
        where: { email },
      })
      if (count > 0) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'Email already exist',
        })
      }
      if (password !== passwordConfirm) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Password and ConfirmPassword is not Consistent',
        })
      }

      const hashedPassword = await bcrypt.hash(password, 12)

      const user = await prisma.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
        },
        select: {
          email: true,
          name: true,
        },
      })

      return user
    },
  })
