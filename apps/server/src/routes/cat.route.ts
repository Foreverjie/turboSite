import * as trpc from '@trpc/server'
import { Context } from '../context'
import z from 'zod'

let cats: Cat[] = []

const Cat = z.object({
  id: z.number(),
  name: z.string(),
})
const Cats = z.array(Cat)

function newId(): number {
  return Math.floor(Math.random() * 10000)
}

const createRouter = () => {
  return trpc.router<Context>()
}

const cat = createRouter().mutation('Get', {
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

export type Cat = z.infer<typeof Cat>
export type Cats = z.infer<typeof Cats>
