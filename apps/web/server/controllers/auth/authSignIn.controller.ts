import { AuthSignInInput, AuthSignInOutput } from '../../schemas/auth'
import prisma from '@/prisma/prisma-client'
import { TRPCError } from '@trpc/server'
import bcrypt from 'bcryptjs'

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

  return user
}
