import { useForm } from 'react-hook-form'
import { useSignUp } from '@clerk/nextjs'
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
} from 'ui'
import React from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ClerkAPIResponseError, parseClerkError } from '~/utils/apiError'
import SignUpTitle from '../../../components/SignUp/SignUpTitle'

type SignUpEmailStepProps = {
  onDone: () => void
}

const emailInputSchema = z.object({
  email: z.string().email(),
})

export function SignUpEmailStep({ onDone }: SignUpEmailStepProps) {
  const { signUp, isLoaded } = useSignUp()

  const form = useForm<z.infer<typeof emailInputSchema>>({
    resolver: zodResolver(emailInputSchema),
    defaultValues: {
      email: '',
    },
  })

  if (!isLoaded) {
    return null
  }

  const onSubmit = async function (value: z.infer<typeof emailInputSchema>) {
    try {
      await sendClerkOtp(value)
      onDone()
    } catch (error) {
      form.setError('email', {
        type: 'manual',
        message: parseClerkError(error as ClerkAPIResponseError),
      })
    }
  }

  const sendClerkOtp = async function (
    value: z.infer<typeof emailInputSchema>,
  ) {
    const signUpAttempt = await signUp.create({
      emailAddress: value.email,
    })
    await signUpAttempt.prepareEmailAddressVerification({
      strategy: 'email_code',
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        // className={formStyles.fields}
      >
        <SignUpTitle>What is your email address?</SignUpTitle>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-col justify-center items-center mb-4 space-y-2 text-center">
                <FormControl>
                  <Input
                    {...field}
                    className="bg-gray-100 rounded-md p-1 border focus:ring-2 focus:border-transparent"
                  />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <div className="flex justify-center items-center">
          <Button type="submit" disabled={!form.formState.isValid}>
            Continue
          </Button>
        </div>
      </form>
    </Form>
  )
}
