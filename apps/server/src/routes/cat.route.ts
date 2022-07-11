import * as trpc from '@trpc/server'
import { createRouter } from './createRouter'
import z, { string } from 'zod'
import prisma from '../../prisma/prisma-client'

// const deserializeUser = async ({ req, res, next }: any) => {
//   throw new trpc.TRPCError({ code: 'INTERNAL_SERVER_ERROR' })
// }

export const cat = createRouter()
  // .middleware(deserializeUser)
  // .mutation('Get', {
  //   input: z.object({ id: z.number() }),
  //   output: Cat,
  //   async resolve(req) {
  //     const foundCat = cats.find(cat => cat.id === req.input.id)
  //     if (!foundCat) {
  //       throw new trpc.TRPCError({
  //         code: 'BAD_REQUEST',
  //         message: `could not find cat with id ${req.input.id}`,
  //       })
  //     }
  //     return foundCat
  //   },
  // })
  .query('List', {
    output: z.object({ name: z.string(), id: z.string() }).array(),
    async resolve() {
      const cats = await prisma.cat.findMany({
        select: {
          name: true,
          id: true,
        },
      })
      return cats
    },
  })
  .mutation('Create', {
    input: z.object({ name: z.string().max(50) }),
    async resolve({ input }) {
      const { name } = input
      const newCat = await prisma.cat.create({
        data: {
          name,
        },
        select: {
          // id: true,
          name: true,
        },
      })
      return newCat
    },
  })
// .mutation('Delete', {
//   input: z.object({ id: z.number() }),
//   output: z.string(),
//   async resolve(req) {
//     cats = cats.filter(cat => cat.id !== req.input.id)
//     return 'success'
//   },
// })
