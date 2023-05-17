import { z } from 'zod'

export const authSignUpMeta = {
  description: 'Sign up',
}
export const authSignUpInputSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1, { message: "Can't Be Empty" }),
  password: z
    .string()
    .min(8, { message: 'Must be 8 or more characters long.' })
    .max(32, { message: 'Must be 32 or fewer characters long.' }),
  passwordConfirm: z
    .string()
    .min(8, { message: 'Must be 8 or more characters long.' })
    .max(32, { message: 'Must be 32 or fewer characters long.' }),
})
export const authSignUpOutputSchema = z.object({
  email: z.string(),
  name: z.string(),
})

export type AuthSignUpInput = z.TypeOf<typeof authSignUpInputSchema>
export type AuthSignUpOutput = z.TypeOf<typeof authSignUpOutputSchema>
