import { TRPCPanelMeta } from 'trpc-panel'
import { z } from 'zod'

export const ipInfoMeta: TRPCPanelMeta = {
  description: 'Get ip Info',
}
export const ipInfoInputSchema = z.void()
// ie.
// "city": "Shenzhen",
// "region": "Guangdong",
// "country": "CN",
export const ipInfoOutputSchema = z.object({
  city: z.string(),
  region: z.string(),
  country: z.string(),
  ip: z.string().nullable(),
})

export type IpInfoOutput = z.TypeOf<typeof ipInfoOutputSchema>
