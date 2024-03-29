import { AuthSignInInput, AuthSignInOutput } from '../../schemas/auth'
import prisma from '../../../prisma/prisma-client'
import { TRPCError } from '@trpc/server'
import { signJwt } from '../../utils/jwt'
import { CookieOptions } from 'express'
import bcrypt from 'bcryptjs'
import config from 'config'
import redisClient from '../../utils/connectRedis'

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
  console.log('signToken', config.get<number>('accessTokenExpiresIn'))
  // Sign the access token
  const accessToken = signJwt(
    {
      sub: user.id.toString(),
      user: {
        id: user.id.toString(),
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
    EX: config.get<number>('accessTokenExpiresIn') * 60 * 60 * 24,
  })

  // Return access token
  return { accessToken }
}

export const authSignInController = async ({
  input,
  ctx,
}: {
  input: AuthSignInInput
  ctx: any
}): Promise<AuthSignInOutput> => {
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
  const pwdMatch = await bcrypt.compare(password, user.password)
  if (!pwdMatch) {
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
}
