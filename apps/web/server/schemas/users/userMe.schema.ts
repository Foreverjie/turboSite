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
  createdAt: z.date(),
  gender: z.nativeEnum(Gender).nullable(),
  Post: z.array(
    z.object({
      type: z.string(),
      author: z.object({
        id: z.number(),
        name: z.string(),
        avatar: z.string(),
      }),
      id: z.number(),
      content: z.string(),
      createdAt: z.date(),
      updatedAt: z.date(),
      files: z.string().array(),
      likeBy: z
        .object({
          userId: z.string(),
        })
        .array(),
    }),
  ),
  lastLoginIp: z.string().nullable(),
  lastLoginTime: z.date().nullable(),
})

export type UserMeOutput = z.TypeOf<typeof userMeOutputSchema>
