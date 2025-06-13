'use client'

import { useEffect, useState } from 'react'
import { StyledButton } from '../../../../components/ui/button/StyledButton'
import { Input } from '../../../../components/ui/input'
import { ButtonMotionBase } from 'ui'
import Link from 'next/link'
import { cn } from 'ui/src/utils'
import { trpc } from '../../../../utils/trpc'
import { Logo } from '~/icons/logo'

export default function SignUpPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [otp, setOtp] = useState('')
  const [isOtpSent, setIsOtpSent] = useState(false)
  const [countdown, setCountdown] = useState(0)

  const { mutateAsync: sendOtp, isLoading: sendOtpLoading } =
    trpc.user.signUp.useMutation({
      onSuccess: () => {
        setIsOtpSent(true)
        setCountdown(60)
      },
    })

  const { mutateAsync: signUp, isLoading: signUpLoading } =
    trpc.user.verify.useMutation({
      onSuccess: () => {
        window.location.href = '/'
      },
    })

  const handleSendOtp = () => {
    if (
      !email ||
      !password ||
      !confirmPassword ||
      password !== confirmPassword
    ) {
      return
    }
    sendOtp({ email, password, passwordConfirmation: confirmPassword })
  }

  const handleSignUp = () => {
    if (!email || !otp) {
      return
    }
    signUp({ email, verificationCode: otp })
  }

  // Countdown logic
  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown(prev => prev - 1)
      }, 1000)

      return () => clearInterval(timer)
    } else {
      setIsOtpSent(false)
    }
  }, [countdown])

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <Logo className="size-16" />

      <h1 className="mb-6 mt-8 text-2xl">
        {'Sign Up to'} <b>{` Flash`}</b>
      </h1>
      <div className="flex flex-col items-center gap-4 px-4 min-w-[300px]">
        <Input
          value={email}
          onChange={e => setEmail(e.target.value)}
          type="text"
          placeholder="Email"
          className="w-full"
        />

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
        <Input
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          type={isPasswordVisible ? 'text' : 'password'}
          placeholder="Confirm Password"
          className="w-full"
        />
        <div className="w-full relative">
          <Input
            value={otp}
            onChange={e => setOtp(e.target.value)}
            type="text"
            placeholder="Enter OTP"
            className="w-full"
          />
          {sendOtpLoading ? (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center">
              <i className="loading loading-spinner loading-xs opacity-50" />
            </div>
          ) : (
            <ButtonMotionBase
              disabled={isOtpSent || sendOtpLoading} // Disable button during countdown
              className={
                'absolute right-4 top-1/2 -translate-y-1/2 flex items-center disabled:opacity-50' // Add disabled style
              }
              onClick={handleSendOtp}
            >
              <div className="text-sm text-gray-500">
                {isOtpSent ? `Resend in ${countdown}s` : 'Send OTP'}
              </div>
            </ButtonMotionBase>
          )}
        </div>
        <StyledButton
          disabled={!email || !password || !confirmPassword || !otp}
          isLoading={signUpLoading}
          onClick={handleSignUp}
          className="w-full"
        >
          Sign Up
        </StyledButton>
      </div>

      <hr className="mt-4 mx-4 border-neutral-200 dark:border-neutral-700" />
      <div className="mt-6 mb-2 px-4 flex items-center justify-center">
        <div className="text-neutral-800 dark:text-neutral-200">
          Already have an account?
        </div>
        <StyledButton
          variant="link"
          className="ml-2 text-neutral-800 dark:text-neutral-200"
        >
          <Link href="/sign-in">Sign In</Link>
        </StyledButton>
      </div>
    </div>
  )
}
