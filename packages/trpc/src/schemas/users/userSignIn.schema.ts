import { TRPCPanelMeta } from 'trpc-panel'
import { z } from 'zod'

export const userSignInMeta: TRPCPanelMeta = {
  description: 'Sign in user',
}
export const userSignInInputSchema = z.union(
  [
    z.object({
      email: z.string().email(),
      password: z.string().min(6).max(100),
      otp: z
        .undefined({
          description: 'OTP should not be provided when using password',
        })
        .optional(),
    }),
    z.object({
      email: z.string().email(),
      otp: z.string().length(6, { message: 'OTP must be 6 characters long' }),
      password: z
        .undefined({
          description: 'Password should not be provided when using OTP',
        })
        .optional(),
    }),
  ],
  {
    errorMap: (issue, ctx) => {
      if (issue.code === z.ZodIssueCode.invalid_union) {
        // Check if it's because both password and OTP were provided, or neither.
        // This basic error map will just provide a general message for union failure.
        // For more specific messages based on *why* the union failed (e.g. both provided vs neither provided),
        // a .superRefine() on the union's result or more complex errorMap logic would be needed.
        // However, the individual object errors within the union (like "OTP should not be provided...") will usually be clear.
        return {
          message: 'Either password or OTP must be provided, but not both.',
        }
      }
      return { message: ctx.defaultError }
    },
  },
)
export const userSignInOutputSchema = z.object({
  response: z
    .object({
      user: z
        .object({
          id: z.string(),
          email: z.string().email(),
          created_at: z.string(),
          updated_at: z.string(),
          email_confirmed_at: z.string().nullable(),
          last_sign_in_at: z.string().nullable(),
        })
        .nullable(),
      session: z
        .object({
          access_token: z.string(),
          refresh_token: z.string(),
          expires_in: z.number(),
          expires_at: z.number(),
          token_type: z.string(),
        })
        .nullable(),
    })
    .nullable(),
  error: z
    .object({
      message: z.string(),
    })
    .nullable(),
})

export type UserSignInInput = z.TypeOf<typeof userSignInInputSchema>
export type UserSignInOutput = z.TypeOf<typeof userSignInOutputSchema>
