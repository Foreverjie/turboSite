'use client'

import React, { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

import { useSignIn, useUser } from '@clerk/nextjs'

import { UserCircleIcon } from 'lucide-react'
import {
  ButtonMotionBase,
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from 'ui'
import { useAggregationSelector } from '~/providers/root/aggregation-data-provider'

import { HeaderActionButton } from './HeaderActionButton'
import { UserButton, SignedIn, SignedOut, SignInButton } from '@clerk/nextjs'

const OwnerAvatar = () => {
  const ownerAvatar = useAggregationSelector().aggregationData?.user.avatar
  //   const resolveAdminUrl = useResolveAdminUrl()
  return (
    <ButtonMotionBase
      onClick={() => {
        // open admin url
        // window.open('', '_blank')
      }}
      className="pointer-events-auto relative flex h-10 w-10 items-center justify-center"
    >
      <span className="sr-only">Go to dashboard</span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="rounded-full" src={ownerAvatar} alt="site owner" />
      {/* <UserAuthFromIcon className="absolute -bottom-1 -right-1" /> */}
    </ButtonMotionBase>
  )
}

export function UserAuth() {
  const pathname = usePathname()
  const { isSignedIn } = useUser()

  if (isSignedIn) {
    return <OwnerAvatar />
  }

  return (
    <AnimatePresence>
      <SignedIn key="user-info">
        <div className="pointer-events-auto flex h-10 w-full items-center justify-center">
          <div className="relative">
            <UserButton
              afterSignOutUrl={'/'}
              appearance={{
                elements: {
                  logoBox: 'w-9 h-9 ring-2 ring-white/20 rounded-full',
                },
              }}
            />
            {/* <UserAuthFromIcon className="absolute -bottom-1 -right-1" /> */}
          </div>
        </div>
      </SignedIn>

      <SignedOut key="sign-in">
        <HoverCard>
          <HoverCardTrigger>
            <TriggerComponent />
          </HoverCardTrigger>
          <HoverCardContent>Sign In</HoverCardContent>
        </HoverCard>
      </SignedOut>
    </AnimatePresence>
  )
}

const TriggerComponent = () => {
  return (
    <SignInButton mode="modal" redirectUrl={'/'}>
      <HeaderActionButton aria-label="Guest Login">
        <UserCircleIcon className="h-4 w-4" />
      </HeaderActionButton>
    </SignInButton>
  )
}
