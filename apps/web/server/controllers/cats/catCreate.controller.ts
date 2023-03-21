import prisma from '../../../prisma/prisma-client'
import { Prisma } from '@prisma/client'
import { TRPCError } from '@trpc/server'
import { CatCreateInput } from '../../schemas/cats/catCreate.schema'

export const catCreateController = async ({
  input,
}: {
  input: CatCreateInput
}) => {
  const { name } = input
  try {
    const note = await prisma.cat.create({
      data: {
        name,
      },
      select: {
        // id: true,
        name: true,
      },
    })

    return {
      status: 'success',
      data: {
        note,
      },
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'Cat with that title already exists',
        })
      }
    }
    throw error
  }
}
