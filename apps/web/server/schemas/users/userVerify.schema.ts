import { TRPCPanelMeta } from 'trpc-panel'
import { z } from 'zod'

export const userVerifyMeta: TRPCPanelMeta = {
  description: 'Verify user',
}
export const userVerifyInputSchema = z.object({
  email: z.string().email(),
  verificationCode: z.string().min(6).max(6),
})
export const userVerifyOutputSchema = z
  .object({
    error: z
      .object({
        message: z.string(),
      })
      .nullable(),
  })
  .nullable()

export type UserVerifyInput = z.TypeOf<typeof userVerifyInputSchema>
export type UserVerifyOutput = z.TypeOf<typeof userVerifyOutputSchema>
