import { useSignUp } from '@clerk/clerk-react'
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

type SignUpCodeStepProps = {
  onDone: () => void
}

const codeInputSchema = z.object({
  code: z.string(),
})

export function SignUpCodeStep({ onDone }: SignUpCodeStepProps) {
  const { signUp, isLoaded } = useSignUp()

  const form = useForm<z.infer<typeof codeInputSchema>>({
    mode: 'all',
    resolver: zodResolver(codeInputSchema),
  })

  if (!isLoaded) {
    return null
  }

  const verifyOtp = async function (value: z.infer<typeof codeInputSchema>) {
    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: value.code,
      })
      if (signUpAttempt.verifications.emailAddress.status === 'verified') {
        onDone()
      }
    } catch (err) {
      form.setError('code', {
        type: 'manual',
        message: parseClerkError(err as ClerkAPIResponseError),
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(verifyOtp)}>
        <SignUpTitle>Enter the confirmation code</SignUpTitle>
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-col justify-center items-center mb-4 space-y-2 text-center">
                <FormControl>
                  <>
                    <span>
                      A 6-digit code was just sent to {signUp.emailAddress}
                      <br />
                    </span>
                    <Input {...field} />
                  </>
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <div className="flex justify-center items-center">
          <Button disabled={!form.formState.isValid}>Continue</Button>
        </div>
      </form>
    </Form>
  )
}
