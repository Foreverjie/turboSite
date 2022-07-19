import { deserializeUser } from '../middlewares/deserializeUser'
import { requireUser } from '../middlewares/requireUser'
import { restrictTo } from '../middlewares/restrictTo'
import { createRouter } from './createRouter'
import { z } from 'zod'
import prisma from '../../prisma/prisma-client'

// export default router
export const user = createRouter()
  .middleware(deserializeUser)
  .middleware(requireUser)
  .query('Me', {
    output: z.object({
      name: z.string(),
      email: z.string(),
      role: z.string(),
      avatar: z.string(),
    }),
    async resolve({ ctx }: any) {
      return ctx.res.locals.user
    },
  })
  .middleware(restrictTo(['admin']))
  .query('All', {
    output: z.object({ name: z.string(), email: z.string() }).array(),
    async resolve() {
      return await prisma.user.findMany({
        select: {
          name: true,
          email: true,
        },
      })
    },
  })
