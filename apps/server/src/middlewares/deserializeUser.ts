import { TRPCError } from '@trpc/server'
import prisma from '../../prisma/prisma-client'
import redisClient from '../utils/connectRedis'
import { verifyJwt } from '../utils/jwt'

export const deserializeUser = async ({ ctx, next }: any) => {
  // try {
  // Get the token
  let accessToken
  const {
    headers: { cookie },
  } = ctx.req
  if (cookie) {
    const values = cookie.split(';').reduce((res: any, item: string) => {
      const data = item.trim().split('=')
      return { ...res, [data[0]]: data[1] }
    }, {})
    ctx.res.locals.cookie = values
  } else ctx.res.locals.cookie = {}

  if (
    ctx.req.headers.authorization &&
    ctx.req.headers.authorization.startsWith('Bearer')
  ) {
    accessToken = ctx.req.headers.authorization?.split(' ')[1]
  } else if (ctx.res.locals.cookie) {
    accessToken = ctx.res.locals.cookie['access-token']
  }

  if (!accessToken) {
    ctx.res.locals.user = null
    ctx.res.locals.accessToken = accessToken
    return next()
  }

  // Validate Access Token
  const decoded = verifyJwt<{ sub: string }>(accessToken)

  if (!decoded) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: "Invalid token or user doesn't exist",
    })
  }

  // Check if user has a valid session
  const session = await redisClient.get(decoded.sub)

  if (!session) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'User session has expired',
    })
  }

  // Check if user still exist
  const user = await prisma.user.findUnique({
    where: {
      id: JSON.parse(session).id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      avatar: true,
    },
  })

  if (!user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'User with that token no longer exist',
    })
  }

  // This is really important (Helps us know if the user is logged in from other controllers)
  // You can do: (req.user or res.locals.user)
  ctx.res.locals.user = user

  return next()
}
