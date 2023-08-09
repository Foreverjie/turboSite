import { Gender, UserType } from '@prisma/client'
import { TRPCPanelMeta } from 'trpc-panel'
import { z } from 'zod'

export const userUpdateMeta: TRPCPanelMeta = {
  description: 'Update user',
}
export const userUpdateInputSchema = z.object({
  name: z.string().optional(),
  avatar: z.string().optional(),
  email: z.string().email().optional(),
  role: z.nativeEnum(UserType).optional(),
  gender: z.nativeEnum(Gender).optional(),
})
export const userUpdateOutputSchema = z.object({
  name: z.string(),
  email: z.string().nullable(),
  role: z.nativeEnum(UserType),
  avatar: z.string(),
  gender: z.nativeEnum(Gender).nullable(),
})

export type UserUpdateInput = z.TypeOf<typeof userUpdateInputSchema>
export type UserUpdateOutput = z.TypeOf<typeof userUpdateOutputSchema>
