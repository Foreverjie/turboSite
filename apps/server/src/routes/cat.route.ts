import * as trpc from '@trpc/server'
import { createRouter } from './createRouter'
import z from 'zod'
import prisma from '../../prisma/prisma-client'

let cats: Cat[] = []

const Cat = z.object({
  id: z.number(),
  name: z.string(),
})
const Cats = z.array(Cat)

function newId(): string {
  return Math.floor(Math.random() * 10000).toString()
}

const deserializeUser = async ({ req, res, next }: any) => {
  throw new trpc.TRPCError({ code: 'INTERNAL_SERVER_ERROR' })
}

export const cat = createRouter()
  // .middleware(deserializeUser)
  .mutation('Get', {
    input: z.object({ id: z.number() }),
    output: Cat,
    async resolve(req) {
      const foundCat = cats.find(cat => cat.id === req.input.id)
      if (!foundCat) {
        throw new trpc.TRPCError({
          code: 'BAD_REQUEST',
          message: `could not find cat with id ${req.input.id}`,
        })
      }
      return foundCat
    },
  })
  .query('List', {
    output: Cats,
    async resolve() {
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
  .mutation('Delete', {
    input: z.object({ id: z.number() }),
    output: z.string(),
    async resolve(req) {
      cats = cats.filter(cat => cat.id !== req.input.id)
      return 'success'
    },
  })

type Cat = z.infer<typeof Cat>
type Cats = z.infer<typeof Cats>
