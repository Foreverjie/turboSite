'use client'

import { useSession, useSignIn } from '@clerk/nextjs'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from 'ui'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { EmailCodeFactor } from '@clerk/types'

const SignInInputSchema = z.object({
  email: z.string().email(),
  code: z.string().length(6).optional(),
  password: z.string().min(8).optional(),
})

enum SignInType {
  CODE = 'CODE',
  PASSWORD = 'PASSWORD',
}

export default function Page() {
  const { isLoaded, isSignedIn } = useSession()
  const { signIn, setActive } = useSignIn()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectPath =
    searchParams.get('redirect') ||
    process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL ||
    '/'

  const [signInType, setSignInType] = useState<SignInType>(SignInType.CODE)

  const form = useForm<z.infer<typeof SignInInputSchema>>({
    resolver: zodResolver(SignInInputSchema),
    defaultValues: {
      email: '',
      code: undefined,
      password: undefined,
    },
  })

  const [countdown, setCountdown] = useState<number>(0)

  const sendCode = async () => {
    form.trigger(['email'])
    if (!form.formState.isValid) {
      return
    }
    const { email } = form.getValues()

    const signInAttempt = await signIn?.create({
      identifier: email,
    })

    const emailCodeFactor = signInAttempt?.supportedFirstFactors.find(
      factor => factor.strategy === 'email_code',
    ) as EmailCodeFactor

    await signIn?.prepareFirstFactor({
      strategy: 'email_code',
      emailAddressId: emailCodeFactor?.emailAddressId,
    })

    setCountdown(60)
    const timer = setInterval(() => {
      setCountdown(prevCountdown => prevCountdown - 1)
    }, 1000)

    setTimeout(() => {
      clearInterval(timer)
    }, 60000)
  }

  const onSubmit = async function (value: z.infer<typeof SignInInputSchema>) {
    let signInAttempt
    if (signInType === SignInType.CODE) {
      signInAttempt = await signIn?.attemptFirstFactor({
        strategy: 'email_code',
        code: value.code as string,
      })
      if (signInAttempt?.status === 'complete') {
        onSuccess(signInAttempt.createdSessionId)
      }
    } else {
      signInAttempt = await signIn?.create({
        identifier: value.email,
        password: value.password,
      })
      if (signInAttempt?.status === 'complete') {
        onSuccess(signInAttempt.createdSessionId)
      }
    }
  }

  useEffect(() => {
    if (isSignedIn) {
      router.replace(redirectPath)
    }
  }, [isSignedIn, router, redirectPath])

  const toSignUp = () => {
    router.push(`/sign-up?redirect=${redirectPath}`)
  }

  const onSuccess = (createdSessionId: string | null) => {
    setActive &&
      setActive({
        session: createdSessionId,
      })
    router.replace(redirectPath)
  }

  if (!isLoaded) {
    return null
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
      <Tabs defaultValue={SignInType.CODE} className="min-w-[300px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger
            value={SignInType.CODE}
            onClick={() => setSignInType(SignInType.CODE)}
          >
            Code
          </TabsTrigger>
          <TabsTrigger
            value={SignInType.PASSWORD}
            onClick={() => setSignInType(SignInType.PASSWORD)}
          >
            Password
          </TabsTrigger>
        </TabsList>
        <TabsContent value={SignInType.CODE}>
          <Card>
            <CardHeader className="py-8">
              <CardTitle className="font-bold">
                Sign In with one-time code
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  // className={formStyles.fields}
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex justify-center items-center mb-4 space-x-2 text-center">
                          <FormControl>
                            <Input placeholder="Email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center space-x-2">
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="One-time Code"
                              {...field}
                            />
                          </FormControl>
                          <Button
                            disabled={countdown !== 0}
                            onClick={sendCode}
                            type={'button'}
                          >
                            {countdown === 0 ? 'Send' : `${countdown}s`}
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex mt-4">
                    <Button
                      type="submit"
                      className="flex-1"
                      disabled={!form.formState.isValid}
                    >
                      {'Continue'}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value={SignInType.PASSWORD}>
          <Card>
            <CardHeader className="py-8">
              <CardTitle className="font-bold">Sign In with password</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  // className={formStyles.fields}
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex justify-center items-center mb-4 space-x-2 text-center">
                          <FormControl>
                            <Input placeholder="Email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center space-x-2">
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Password"
                              {...field}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex mt-4">
                    <Button
                      type="submit"
                      className="flex-1"
                      disabled={!form.formState.isValid}
                    >
                      {'Continue'}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-4">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-200 flex space-x-2 justify-center items-center">
          <span>Do not have an account?</span>
          <Button variant={'link'} onClick={toSignUp} className="p-0">
            Sign Up
          </Button>
        </p>
      </div>
    </div>
  )
}
