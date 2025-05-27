'use client'

import { UserCircleIcon } from 'lucide-react'
import { m } from 'motion/react'
import Link from 'next/link'
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ButtonMotionBase, DropdownMenuItem } from 'ui'
import { cn } from 'ui/src/utils'
import { XOR } from '../../../../lib/types'
import { trpc } from '../../../../utils/trpc'
import { useIsMobile } from '../../../../utils/viewport'
import { StyledButton } from '../../../ui/button/StyledButton'
import { Input } from '../../../ui/input'
import { useModalStack } from '../../../ui/modal/stacked/hooks'
import { Tabs } from '../../../ui/tabs'
import { sendOTP } from './action'
import { HeaderActionButton } from './HeaderActionButton'
import { Button } from '~/components/ui/button'

const AuthLoginModalContent = () => {
  const isMobile = useIsMobile()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [otpTimer, setOtpTimer] = useState(60) // Initial countdown time: 60 seconds
  const timerRef = useRef<NodeJS.Timeout | null>(null) // Ref to store timer ID

  const { mutateAsync: signIn, isLoading: signInLoading } =
    trpc.user.signIn.useMutation({
      onSuccess: () => {
        // Handle successful sign-in
        console.log('Sign in successful')
        // refresh the page
        window.location.reload()
      },
    })

  const handleEmailSignIn = ({
    email,
    password,
    otp,
  }: {
    email: string
  } & XOR<{ password: string }, { otp: string }>) => {
    if (otp && !password) {
      // Handle OTP sign-in
      signIn({
        email,
        otp,
      })
      return
    }
    if (password && !otp) {
      console.log('Signing in with password', email, password)
      // Handle password sign-in
      signIn({
        email,
        password,
      })
      return
    }
  }

  const TABS = useMemo(
    () => [
      {
        key: 'password',
        title: 'Password',
      },
      {
        key: 'otp',
        title: 'OTP',
      },
    ],
    [],
  )

  useEffect(() => {
    // Clear timer on component unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (otpSent) {
      // Start the countdown timer
      setOtpTimer(60) // Reset timer to 60 when sending OTP
      timerRef.current = setInterval(() => {
        setOtpTimer(prevTimer => {
          if (prevTimer <= 1) {
            clearInterval(timerRef.current!)
            setOtpSent(false) // Re-enable the button
            return 60 // Reset timer display value (optional, could keep 0 until next send)
          }
          return prevTimer - 1
        })
      }, 1000)

      // Cleanup function to clear interval when otpSent becomes false or component unmounts
      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current)
        }
      }
    }
  }, [otpSent])

  const [tab, setTab] = useState('password')

  const Inner = (
    <div className="bg-theme-background">
      <div className="text-center">
        登录到 <b>Flash</b>
      </div>

      <Tabs.Root
        value={tab}
        className={cn('px-4 pt-2 lg:pt-4')}
        onValueChange={tab => {
          setTab(tab as any)
        }}
      >
        <Tabs.List id="comment-tabs" className="gap-3">
          {TABS.map(({ title, key }) => (
            <Tabs.Trigger
              key={key}
              value={key as any}
              onClick={() => {
                setTab(key)
              }}
              selected={tab === key.toString()}
            >
              {title}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
      </Tabs.Root>
      <div className="mt-6">
        <div className="flex flex-col items-center gap-4 px-4">
          <Input
            autoFocus
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
            className="w-full"
          />
          {tab === 'password' ? (
            <>
              <div className="w-full relative">
                <Input
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  type={isPasswordVisible ? 'text' : 'password'}
                  placeholder="Password"
                  className="w-full"
                />
                <ButtonMotionBase
                  className={
                    'absolute right-4 top-1/2 -translate-y-1/2 flex items-center'
                  }
                  onClick={() => {
                    setIsPasswordVisible(!isPasswordVisible)
                  }}
                >
                  <i
                    className={cn(
                      'text-lg text-gray-500',

                      isPasswordVisible
                        ? 'i-mingcute-eye-line'
                        : 'i-mingcute-eye-close-line',
                    )}
                  />
                </ButtonMotionBase>
              </div>
              <div className="flex justify-between w-full">
                <StyledButton variant={'link'} className="text-neutral">
                  <Link href="/forgot-password">Forgot Password?</Link>
                </StyledButton>
                <StyledButton
                  disabled={!email || !password}
                  isLoading={signInLoading}
                  onClick={() => {
                    handleEmailSignIn({
                      email,
                      password,
                    })
                  }}
                >
                  Login
                </StyledButton>
              </div>
            </>
          ) : (
            <>
              <div className="w-full relative">
                <Input
                  value={otp}
                  maxLength={6}
                  onChange={e => setOtp(e.target.value)}
                  type="text"
                  placeholder="OTP"
                  className="w-full"
                />
                <StyledButton
                  // variant="ghost"
                  disabled={otpSent} // Disable button during countdown
                  className={
                    'absolute right-4 top-1/2 -translate-y-1/2 flex items-center disabled:opacity-50' // Add disabled style
                  }
                  // isLoading={}
                  onClick={async () => {
                    if (!email) {
                      // Add some user feedback, e.g., using a toast notification
                      console.error('Email is required to send OTP')
                      return
                    }
                    const res = await sendOTP(email)
                    if (!res?.error) {
                      // Handle OTP sent successfully
                      console.log('OTP sent successfully')
                      setOtpSent(true)
                    } else {
                      // Handle error, maybe show a toast
                      console.error('Failed to send OTP:', res.error)
                    }
                  }}
                >
                  <div className="text-sm text-gray-500">
                    {otpSent ? `Resend in ${otpTimer}s` : 'Send OTP'}
                  </div>
                </StyledButton>
              </div>

              <div className="flex justify-end w-full">
                <Button
                  disabled={!email || !otp}
                  isLoading={signInLoading}
                  onClick={() => {
                    if (email && otp) {
                      handleEmailSignIn({ email, otp })
                    }
                  }}
                >
                  Login
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      <hr className="mt-4 mx-4 border-neutral-200 dark:border-neutral-700" />
      <div className="mt-6 mb-2 px-4 flex items-center justify-center">
        <div className="text-neutral-800 dark:text-neutral-200">
          Don&apos;t have an account?
        </div>
        <StyledButton
          variant="link"
          className="ml-2 text-neutral-800 dark:text-neutral-200"
        >
          <Link href="/sign-up">Sign Up</Link>
        </StyledButton>
      </div>

      {/* <div className="mt-6">
        <AuthProvidersRender />
      </div> */}
    </div>
  )

  if (isMobile) {
    return Inner
  }

  return (
    <m.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10, transition: { type: 'tween' } }}
      transition={{ type: 'spring' }}
      className="absolute left-1/2 top-1/2"
    >
      <div className="w-[360px] bg-theme-background -translate-x-1/2 -translate-y-1/2 rounded-xl border bg-base-100 p-3 shadow-2xl shadow-stone-300 dark:border-neutral-700 dark:shadow-stone-800">
        {Inner}
      </div>
    </m.div>
  )
}

export const AuthProvidersRender: FC = () => {
  //   const providers = useAuthProviders()
  const providers = ['github', 'google', 'facebook', 'twitter']
  //   const [authProcessingLockSet, setAuthProcessingLockSet] = useState(
  //     () => new Set<AuthSocialProviders>(),
  //   )
  return (
    <>
      {providers && (
        <ul className="flex items-center justify-center gap-3">
          {providers.map((provider: string) => (
            <li key={provider}>
              <ButtonMotionBase
                // disabled={authProcessingLockSet.has(provider)}
                onClick={() => {
                  //   if (authProcessingLockSet.has(provider)) return
                  //   authClient.signIn.social({
                  //     provider,
                  //     callbackURL: window.location.href,
                  //   })
                  //   setAuthProcessingLockSet(prev => {
                  //     prev.add(provider)
                  //     return new Set(prev)
                  //   })
                }}
              >
                <div className="flex size-10 items-center justify-center rounded-full border bg-base-100 dark:border-neutral-700">
                  {/* {!authProcessingLockSet.has(provider) ? (
                    <Fragment>
                      {provider === 'github' ? (
                        <GitHubBrandIcon />
                      ) : (
                        <img
                          className="size-4"
                          src={`https://authjs.dev/img/providers/${provider}.svg`}
                        />
                      )}
                    </Fragment>
                  ) : ( */}
                  <div className="center flex">
                    <i className="loading loading-spinner loading-xs opacity-50" />
                  </div>
                  {/* )} */}
                </div>
              </ButtonMotionBase>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export const SignInButton = ({ isLoading }: { isLoading: boolean }) => {
  const { present } = useModalStack()

  const handleSignIn = useCallback(() => {
    present({
      title: '',
      overlay: true,
      clickOutsideToDismiss: true,
      // CustomModalComponent: PlainModal,
      content: AuthLoginModalContent,
    })
  }, [present])
  return (
    <HeaderActionButton
      onClick={() => {
        handleSignIn()
      }}
      disabled={isLoading}
    >
      {isLoading ? (
        <i className="loading loading-spinner loading-xs opacity-50" />
      ) : (
        <UserCircleIcon size={20} />
      )}
    </HeaderActionButton>
  )
}

export const SignOutButton = () => {
  const { mutateAsync: signOut, isLoading } = trpc.user.signOut.useMutation({
    onSuccess: () => {
      // Handle successful sign out
      window.location.reload()
    },
  })

  return (
    <DropdownMenuItem
      onClick={() => {
        signOut()
      }}
    >
      <StyledButton variant="link" isLoading={isLoading}>
        <i className="i-mingcute-exit-line size-4" />
        Sign Out
      </StyledButton>
    </DropdownMenuItem>
  )
}
