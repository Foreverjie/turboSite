import { useUser } from '@clerk/nextjs'
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'ui'
import { Gender } from '@prisma/client'

type SignUpInformationStepProps = {
  onDone: () => void
}

const InformationInputSchema = z.object({
  name: z.string(),
  gender: z.nativeEnum(Gender).optional(),
})

export function SignUpInformationStep({ onDone }: SignUpInformationStepProps) {
  const { user, isLoaded } = useUser()

  const form = useForm<z.infer<typeof InformationInputSchema>>({
    mode: 'all',
    resolver: zodResolver(InformationInputSchema),
  })

  if (!isLoaded) {
    return null
  }

  const onSubmit = async function (
    value: z.infer<typeof InformationInputSchema>,
  ) {
    try {
      await user?.update({
        username: value.name,
        unsafeMetadata: {
          gender: value.gender,
        },
      })
      onDone()
    } catch (err) {
      // TODO - handle error from different fields
      form.setError('name', {
        type: 'manual',
        message: parseClerkError(err as ClerkAPIResponseError),
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col justify-center items-center mb-4 space-y-2 text-center">
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
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {/* TODO: generate select item by Gender */}
                      <SelectItem value={Gender.MALE}>{Gender.MALE}</SelectItem>
                      <SelectItem value={Gender.FEMALE}>
                        {Gender.FEMALE}
                      </SelectItem>
                      <SelectItem value={Gender.SECRET}>
                        {Gender.SECRET}
                      </SelectItem>
                    </SelectContent>
                  </Select>
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
