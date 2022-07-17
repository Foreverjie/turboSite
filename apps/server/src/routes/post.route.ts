import { deserializeUser } from '../middlewares/deserializeUser'
import { requireUser } from '../middlewares/requireUser'
import { restrictTo } from '../middlewares/restrictTo'
import { createRouter } from './createRouter'
import { z } from 'zod'
import prisma from '../../prisma/prisma-client'

// export default router
export const post = createRouter()
  .middleware(deserializeUser)
  .middleware(requireUser)
  .mutation('New', {
    input: z.object({
      content: z.string(),
      files: z.string().array().optional(),
    }),
    output: z.object({
      content: z.string(),
      files: z.string().array().optional(),
    }),
    async resolve({ ctx, input }: any) {
      return await prisma.post.create({
        data: {
          content: input.content,
          files: input.files,
          authorId: ctx.user.id,
        },
      })
    },
  })
//   .middleware(restrictTo(['admin']))
//   .query('All', {
//     output: z.object({ name: z.string(), email: z.string() }).array(),
//     async resolve() {
//       return await prisma.user.findMany({
//         select: {
//           name: true,
//           email: true,
//         },
//       })
//     },
//   })
