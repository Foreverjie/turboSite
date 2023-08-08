import { TRPCPanelMeta } from 'trpc-panel'
import { z } from 'zod'
import { Gender, UserType } from '@prisma/client'

export const userMeMeta: TRPCPanelMeta = {
  description: 'Get current user',
}
export const userMeInputSchema = z.void()
export const userMeOutputSchema = z.object({
  name: z.string(),
  email: z.string().nullable(),
  phone: z.string().nullable(),
  role: z.nativeEnum(UserType),
  avatar: z.string(),
  likes: z.array(
    z.object({
      content: z.string(),
    }),
  ),
  gender: z.nativeEnum(Gender).nullable(),
})

export type UserMeOutput = z.TypeOf<typeof userMeOutputSchema>
