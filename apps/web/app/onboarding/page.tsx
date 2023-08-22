'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  UserProfile,
  useUser,
} from '@clerk/nextjs'
import { trpc } from '../../utils/trpc'
import { AlertCircle, Terminal } from 'lucide-react'
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'ui'
import ShouldRender from '../../components/ShouldRender'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { userUpdateInputSchema } from '../../server/schemas/users'
import { Gender } from '@prisma/client'
import { clerkClient } from '@clerk/nextjs'

function Onboarding() {
  const router = useRouter()
  const { isSignedIn, isLoaded, user } = useUser()
  const [missingFields, setMissingFields] = useState<string[]>([])
  const [optionalFields, setOptionalFields] = useState<string[]>([])
  const { data: userData } = trpc.user.me.useQuery()
  const updateUser = trpc.user.update.useMutation()
  const form = useForm<z.infer<typeof userUpdateInputSchema>>({
    resolver: zodResolver(userUpdateInputSchema),
    defaultValues: useMemo(() => {
      return {
        name: '',
        email: user?.primaryEmailAddress?.emailAddress ?? '',
        gender: user?.publicMetadata.gender as Gender | undefined,
      }
    }, [user]),
  })

  useEffect(() => {
    if (isLoaded) {
      if (!isSignedIn) {
        router.replace('/sign-in')
      } else {
        form.reset({
          name: user?.username ?? '',
          email: user?.primaryEmailAddress?.emailAddress ?? '',
        })
      }
    }
  }, [isLoaded, isSignedIn, router, user, form])

  useEffect(() => {
    if (userData) {
      const missingFields = []
      const optionalFields = []
      if (!userData.name) {
        missingFields.push('name')
      }
      if (!userData.email) {
        missingFields.push('email')
      }
      // for now, china can not receive sms from clerk, so we don't require phone
      // if (!user.phone) {
      //   missingFields.push('phone')
      // }
      setMissingFields(missingFields)
      if (!userData.gender) {
        optionalFields.push('gender')
      }
      setOptionalFields(optionalFields)
    }
  }, [router, userData])

  const onSubmit = async (values: z.infer<typeof userUpdateInputSchema>) => {
    try {
      // updateUser.mutate(values)
      user?.update({
        username: values.name,
        unsafeMetadata: {
          gender: values.gender,
        },
      })
    } catch (error) {
      console.error('Update user data error', error)
      // alert('Failed to update user data')
    }
  }

  return (
    <div>
      <div>Onboarding</div>
      <ShouldRender if={missingFields.length > 0}>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Missing fields: {missingFields.join(', ')}
          </AlertDescription>
        </Alert>
      </ShouldRender>
      <ShouldRender if={optionalFields.length > 0}>
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Complete your user profile</AlertTitle>
          <AlertDescription>
            Fields you can fill in: {optionalFields.join(', ')}
          </AlertDescription>
        </Alert>
      </ShouldRender>
      <SignedIn>
        {/* Signed in users will see their user profile */}
        <UserProfile />
      </SignedIn>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} disabled />
                </FormControl>
                <FormDescription>This is your public email.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Shock the world..." {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
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
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
}

export default Onboarding
