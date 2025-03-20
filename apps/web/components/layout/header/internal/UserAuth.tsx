'use client'

import React, { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { signIn } from '~/auth'

import { UserCircleIcon } from 'lucide-react'
import {
  ButtonMotionBase,
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from 'ui'
import { useAggregationSelector } from '~/providers/root/aggregation-data-provider'

import { HeaderActionButton } from './HeaderActionButton'
import { TriggerComponent } from './TriggerComponent'
// import { signInFromServer } from './action'

const OwnerAvatar = () => {
  // const ownerAvatar = useAggregationSelector().aggregationData?.user.avatar
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
      <img
        className="rounded-full"
        src={'https://avatars.githubusercontent.com/u/20612607?v=4'}
        alt="site owner"
      />
      {/* <UserAuthFromIcon className="absolute -bottom-1 -right-1" /> */}
    </ButtonMotionBase>
  )
}

export function UserAuth() {
  const pathname = usePathname()

  // if (isSignedIn) {
  //   return <OwnerAvatar />
  // }

  return (
    <AnimatePresence>
      <div className="pointer-events-auto flex h-10 w-full items-center justify-center">
        <div className="relative"></div>
      </div>

      <HoverCard>
        <HoverCardTrigger>
          <TriggerComponent />
        </HoverCardTrigger>
        <HoverCardContent>Sign In</HoverCardContent>
      </HoverCard>
    </AnimatePresence>
  )
}
