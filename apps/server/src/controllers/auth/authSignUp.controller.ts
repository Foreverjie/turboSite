import { AuthSignUpOutput, AuthSignUpInput } from '../../schemas/auth'
import prisma from '../../../prisma/prisma-client'
import { TRPCError } from '@trpc/server'
import bcrypt from 'bcryptjs'

export const authSignUpController = async ({
  input,
  ctx,
}: {
  input: AuthSignUpInput
  ctx: any
}): Promise<AuthSignUpOutput> => {
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
}
