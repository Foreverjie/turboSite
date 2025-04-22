'use client'

import { UserCircleIcon } from 'lucide-react'
import { sendOTP, signIn, signOut } from './action'
import { HeaderActionButton } from './HeaderActionButton'
import { ButtonMotionBase, DropdownMenuItem } from 'ui'
import { useModalStack } from '../../../ui/modal'
import { FC, useCallback, useMemo, useState } from 'react'
import { useIsMobile } from '../../../../utils/viewport'
import { m } from 'motion/react'
import { cn } from 'ui/src/utils'
import { Tabs } from '../../../ui/tabs'
import { Input } from '../../../ui/input'
import { StyledButton } from '../../../ui/button/StyledButton'
import Link from 'next/link'
import { XOR } from '../../../../lib/types'

const AuthLoginModalContent = () => {
  const isMobile = useIsMobile()

  const handleEmailSignIn = ({
    email,
    password,
    otp,
  }: {
    email: string
  } & XOR<{ password: string }, { otp: string }>) => {
    // Implement PKCE flow for email/password sign-in
    if (otp && !password) {
      // Handle OTP sign-in
      signIn({
        email,
        otp,
      })
      return
    }
    if (password && !otp) {
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
        component: () => {
          const [email, setEmail] = useState('')
          const [password, setPassword] = useState('')
          const [isPasswordVisible, setIsPasswordVisible] = useState(false)

          return (
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
                  <ButtonMotionBase variant={'link'} className="text-neutral">
                    <Link href="/forgot-password">Forgot Password?</Link>
                  </ButtonMotionBase>
                  <StyledButton
                    disabled={!email || !password}
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
            </div>
          )
        },
      },
      {
        key: 'otp',
        title: 'OTP',
        component: () => {
          const [email, setEmail] = useState('')
          const [otp, setOtp] = useState('')
          return (
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
                <div className="w-full relative">
                  <Input
                    value={otp}
                    maxLength={6}
                    onChange={e => setOtp(e.target.value)}
                    type="text"
                    placeholder="OTP"
                    className="w-full"
                  />
                  <ButtonMotionBase
                    className={
                      'absolute right-4 top-1/2 -translate-y-1/2 flex items-center'
                    }
                    onClick={() => {
                      sendOTP(email)
                    }}
                  >
                    <div className="text-sm text-gray-500">Send OTP</div>
                  </ButtonMotionBase>
                </div>

                <div className="flex justify-end w-full">
                  <StyledButton
                    disabled={!email || !otp}
                    onClick={() => handleEmailSignIn({ email, otp })}
                  >
                    Login
                  </StyledButton>
                </div>
              </div>
            </div>
          )
        },
      },
    ],
    [],
  )

  const [tab, setTab] = useState('password')

  const Inner = (
    <>
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
      {TABS.map(({ key, component: Component }) => {
        if (key.toString() === tab) return <Component key={key} />
        return null
      })}

      <div className="mt-6">
        <AuthProvidersRender />
      </div>
    </>
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
      <div className="w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-xl border bg-base-100 p-3 shadow-2xl shadow-stone-300 dark:border-neutral-700 dark:shadow-stone-800">
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
          {providers.map(provider => (
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

export const SignInButton = () => {
  const { present } = useModalStack()

  const handleSignIn = useCallback(() => {
    present({
      title: '',
      overlay: true,
      clickOutsideToDismiss: true,
      CustomModalComponent: ({ children }) => <div>{children}</div>,
      content: AuthLoginModalContent,
    })
  }, [present])
  return (
    <HeaderActionButton
      onClick={() => {
        handleSignIn()
      }}
    >
      <UserCircleIcon size={20} />
    </HeaderActionButton>
  )
}

export const SignOutButton = () => {
  return (
    <DropdownMenuItem
      onClick={() => {
        signOut()
      }}
      icon={<i className="i-mingcute-exit-line size-4" />}
    >
      Sign Out
    </DropdownMenuItem>
  )
}
