'use client'

import { UserCircleIcon } from 'lucide-react'
import { m, AnimatePresence } from 'motion/react'
import Link from 'next/link'
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ButtonMotionBase, DropdownMenuItem } from 'ui'
import { cn } from 'ui/src/utils'
import { XOR } from '../../../../lib/types'
import { trpc } from '../../../../utils/trpc'
import { useIsMobile } from '../../../../utils/viewport'
import { StyledButton } from '../../../ui/button/StyledButton'
import { useModalStack } from '../../../ui/modal/stacked/hooks'
import { Tabs } from '../../../ui/tabs'
import { HeaderActionButton } from './HeaderActionButton'
import { Button } from '~/components/ui/button'
import { LoadingCircle } from '~/components/ui/loading'
import { PlainModal } from '~/components/ui/modal/stacked/custom-modal'
import { toast } from 'sonner'
import {
  Input,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '~/components/ui/input'

const AuthLoginModalContent = () => {
  const isMobile = useIsMobile()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [otpTimer, setOtpTimer] = useState(60) // Initial countdown time: 60 seconds
  const [showOtpInput, setShowOtpInput] = useState(false)
  const [tab, setTab] = useState('password')
  const timerRef = useRef<NodeJS.Timeout | null>(null) // Ref to store timer ID

  const { mutateAsync: sendOTP, isLoading: sendOTPLoading } =
    trpc.user.sendOtp.useMutation({
      onSuccess: () => {
        // Handle successful OTP send
        toast('OTP sent successfully! Please check your email.')
        setOtpSent(true) // Set otpSent to true to start the countdown
        setShowOtpInput(true) // Show the OTP input
      },
      onError: error => {
        toast('Failed to send OTP, please try again.')
        console.error('Error sending OTP:', error)
      },
    })

  const { mutateAsync: signIn, isLoading: signInLoading } =
    trpc.user.signIn.useMutation({
      onSuccess: () => {
        // Handle successful sign-in
        console.log('Sign in successful')
        // refresh the page
        window.location.reload()
      },
      onError: error => {
        toast('Sign in failed, please check your input.')
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

  const handleSendOtp = async () => {
    if (!email) {
      toast('Please enter your email first')
      return
    }
    await sendOTP({ email })
  }

  const resetOtpFlow = () => {
    setShowOtpInput(false)
    setOtpSent(false)
    setOtp('')
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
  }

  // Reset OTP flow when switching tabs or changing email
  useEffect(() => {
    resetOtpFlow()
  }, [tab, email])

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
          {/* Only show email input when not in OTP input mode or in password tab */}
          {(!showOtpInput || tab === 'password') && (
            <Input
              autoFocus
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="text"
              placeholder="Email"
              className="w-full"
            />
          )}
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
                <Button
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
                </Button>
              </div>
            </>
          ) : (
            <>
              <AnimatePresence mode="wait">
                {!showOtpInput ? (
                  <m.div
                    key="send-otp"
                    initial={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full"
                  >
                    <div className="flex justify-center w-full">
                      <Button
                        disabled={!email}
                        isLoading={sendOTPLoading}
                        onClick={handleSendOtp}
                        buttonClassName="w-full"
                      >
                        Send OTP
                      </Button>
                    </div>
                  </m.div>
                ) : (
                  <m.div
                    key="otp-input"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="w-full"
                  >
                    <div className="flex flex-col items-center space-y-2 w-full">
                      {/* Header with back button and instructions */}
                      <div className="flex items-start space-x-3 w-full">
                        <div className="flex-1">
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            We've sent a 6-digit code to{' '}
                            <span className=" text-sm font-medium text-gray-900 dark:text-gray-100">
                              {email || 'your'}
                            </span>
                          </p>
                        </div>
                      </div>

                      {/* OTP Input */}
                      <div className="flex flex-col items-center space-y-4 w-full">
                        <InputOTP
                          maxLength={6}
                          value={otp}
                          onChange={setOtp}
                          onComplete={(value: string) => {
                            if (value.length === 6) {
                              handleEmailSignIn({ email, otp: value })
                            }
                          }}
                        >
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>

                        {/* Action buttons */}
                        <div className="flex flex-col items-center space-y-2 w-full">
                          <Button
                            disabled={otp.length !== 6}
                            isLoading={signInLoading}
                            onClick={() => {
                              if (email && otp) {
                                handleEmailSignIn({ email, otp })
                              }
                            }}
                            buttonClassName="w-full"
                          >
                            Verify & Login
                          </Button>

                          <div className="text-center">
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              Didn't receive the code?{' '}
                            </span>
                            <StyledButton
                              variant="link"
                              disabled={otpSent}
                              isLoading={sendOTPLoading}
                              onClick={handleSendOtp}
                              className="text-sm font-medium p-0 h-auto"
                            >
                              {otpSent ? `Resend in ${otpTimer}s` : 'Resend'}
                            </StyledButton>
                          </div>
                        </div>
                      </div>
                    </div>
                  </m.div>
                )}
              </AnimatePresence>
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
  const isMobile = useIsMobile()

  const handleSignIn = useCallback(() => {
    present({
      title: '',
      overlay: true,
      clickOutsideToDismiss: true,
      CustomModalComponent: isMobile ? undefined : PlainModal,
      content: AuthLoginModalContent,
    })
  }, [present, isMobile])

  return (
    <HeaderActionButton
      onClick={() => {
        handleSignIn()
      }}
      disabled={isLoading}
    >
      {isLoading ? (
        <LoadingCircle size="small" />
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
