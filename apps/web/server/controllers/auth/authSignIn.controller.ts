import { AuthSignInInput, AuthSignInOutput } from '../../schemas/auth'
import prisma from '@/prisma/prisma-client'
import { TRPCError } from '@trpc/server'
import { signIn } from 'next-auth/react'
import bcrypt from 'bcryptjs'

export const authSignInController = async ({
  input,
  ctx,
}: {
  input: AuthSignInInput
  ctx: any
}): Promise<AuthSignInOutput> => {
  const { email, password } = input

  // const res = await signIn('credentials', {
  //   redirect: false,
  //   email,
  //   password,
  // })
  // console.log('res', res)

  const user = await prisma.user.findUnique({
    where: { email },
    select: {
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

  return {
    email: user.email,
    name: user.name,
    avatar: user.avatar,
  }
}
