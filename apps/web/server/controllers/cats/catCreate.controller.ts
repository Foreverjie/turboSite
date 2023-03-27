import prisma from '../../../prisma/prisma-client'
import { Prisma } from '@prisma/client'
import { TRPCError } from '@trpc/server'
import {
  CatCreateInput,
  CatCreateOutput,
} from '../../schemas/cats/catCreate.schema'

export const catCreateController = async ({
  input,
}: {
  input: CatCreateInput
}): Promise<CatCreateOutput> => {
  const { name } = input
  try {
    const cat = await prisma.cat.create({
      data: {
        name,
      },
      select: {
        // id: true,
        name: true,
      },
    })

    return cat
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
