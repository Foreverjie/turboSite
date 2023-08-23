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
import { useRouter } from 'next/navigation'

type SignUpCodeStepProps = {
  onDone: () => void
}

const NameInputSchema = z.object({
  name: z.string(),
})

export function SignUpCodeStep({ onDone }: SignUpCodeStepProps) {
  const { signUp, isLoaded, setActive } = useSignUp()
  const router = useRouter()

  const form = useForm<z.infer<typeof NameInputSchema>>({
    mode: 'all',
    resolver: zodResolver(NameInputSchema),
  })

  if (!isLoaded) {
    return null
  }

  const onSubmit = async function (value: z.infer<typeof NameInputSchema>) {
    try {
      const completeSignUp = await signUp.update({
        username: value.name,
      })
      if (completeSignUp.status === 'complete') {
        await setActive({
          session: completeSignUp.createdSessionId,
        })
        onDone()
      }
    } catch (err) {
      form.setError('name', {
        type: 'manual',
        message: parseClerkError(err as ClerkAPIResponseError),
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <SignUpTitle>Tell the world who you are</SignUpTitle>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center items-center">
          <Button disabled={form.formState.isValid}>Continue</Button>
        </div>
      </form>
    </Form>
  )
}
