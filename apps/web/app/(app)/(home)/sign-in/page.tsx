'use client'

import { useRef, useState } from 'react'
import { m } from 'motion/react'
import { login } from './actions'
import { StyledButton } from '../../../../components/ui/button/StyledButton'
import { Input } from '../../../../components/ui/input'
import { ButtonMotionBase } from 'ui'
import { useIsMobile } from '../../../../utils/viewport'
import Link from 'next/link'
import { cn } from 'ui/src/utils'
import { trpc } from '../../../../utils/trpc'
import { XOR } from '../../../../lib/types'

export default function LoginPage() {
  const isMobile = useIsMobile()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [otpTimer, setOtpTimer] = useState(60) // Initial countdown time: 60 seconds
  const timerRef = useRef<NodeJS.Timeout | null>(null) // Ref to store timer ID

  const { mutateAsync: signInWithPwd, isLoading: signInLoading } =
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
    // Implement PKCE flow for email/password sign-in
    // if (otp && !password) {
    //   // Handle OTP sign-in
    //   signInWithPwd({
    //     email,
    //     password,
    //     // otp,
    //   })
    //   return
    // }
    if (password && !otp) {
      console.log('Signing in with password', email, password)
      // Handle password sign-in
      signInWithPwd({
        email,
        password,
      })
      return
    }
  }

  const handleLogin = async (e: React.MouseEvent) => {
    e.preventDefault()
    try {
      await login({ email, password })
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
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
      </div>

      <hr className="mt-4 mx-4 border-neutral-200 dark:border-neutral-700" />
      <div className="mt-6 mb-2 px-4 flex items-center justify-center">
        <div className="text-neutral-800 dark:text-neutral-200">
          Don't have an account?
        </div>
        <StyledButton
          variant="link"
          className="ml-2 text-neutral-800 dark:text-neutral-200"
        >
          <Link href="/sign-up">Sign Up</Link>
        </StyledButton>
      </div>
    </div>
  )
}
