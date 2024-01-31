import { useSignUp } from '@clerk/nextjs'
import SignUpTitle from '~/components/SignUp/SignUpTitle'
import { parseClerkError, ClerkAPIResponseError } from '~/utils/apiError'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
} from 'ui'

type SignUpPasswordStepProps = {
  onDone: () => void
}

const PasswordInputSchema = z
  .object({
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match',
      })
    }
  })

export function SignUpPasswordStep({ onDone }: SignUpPasswordStepProps) {
  const { signUp, isLoaded, setActive } = useSignUp()

  const form = useForm<z.infer<typeof PasswordInputSchema>>({
    mode: 'all',
    resolver: zodResolver(PasswordInputSchema),
  })

  if (!isLoaded) {
    return null
  }

  const onSubmit = async function (value: z.infer<typeof PasswordInputSchema>) {
    try {
      const completeSignUp = await signUp.update({
        password: value.password,
      })
      if (completeSignUp.status === 'complete') {
        await setActive({
          session: completeSignUp.createdSessionId,
        })
        onDone()
      }
    } catch (err) {
      form.setError('password', {
        type: 'manual',
        message: parseClerkError(err as ClerkAPIResponseError),
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col justify-center items-center mb-4 space-y-2 text-center">
          <SignUpTitle>Set your password</SignUpTitle>

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} type="password" placeholder="Password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="Confirm Password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center items-center">
            <Button type="submit" disabled={!form.formState.isValid}>
              Continue
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
