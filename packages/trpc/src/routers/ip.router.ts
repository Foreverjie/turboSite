import { ipInfoController } from '../controllers/ip'
import {
  ipInfoInputSchema,
  ipInfoOutputSchema,
  ipInfoMeta,
} from '../schemas/ip'
import { publicProcedure, router } from '../trpc'

export const ip = router({
  info: publicProcedure
    .meta(ipInfoMeta)
    .input(ipInfoInputSchema)
    .output(ipInfoOutputSchema)
    .query(ipInfoController),
})
