import { publicProcedure, router } from '../trpc'
import {
  catCreateInputSchema,
  catCreateMeta,
  catListInputSchema,
  catListMeta,
  catListOutputSchema,
} from '../schemas/cats'
import { catListController, catCreateController } from '../controllers/cats'

export const cat = router({
  list: publicProcedure
    .meta(catListMeta)
    .input(catListInputSchema)
    .output(catListOutputSchema)
    .query(catListController),
  create: publicProcedure
    .meta(catCreateMeta)
    .input(catCreateInputSchema)
    .mutation(({ input }: any) => catCreateController({ input })),
})
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
// .mutation('Delete', {
//   input: z.object({ id: z.number() }),
//   output: z.string(),
//   async resolve(req) {
//     cats = cats.filter(cat => cat.id !== req.input.id)
//     return 'success'
//   },
// })
