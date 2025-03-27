'use client'

import React, { useEffect, Fragment } from 'react'
import Image from 'next/image'
import { AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

import { UserCircleIcon } from 'lucide-react'
import {
  ButtonMotionBase,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
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
  const session = {
    name: 'Guest',
    image: 'https://avatars.githubusercontent.com/u/20612607?v=4',
  }

  return (
    <AnimatePresence>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <ReaderAvatar />
        </DropdownMenuTrigger>

        {session && (
          <DropdownMenuPortal>
            <DropdownMenuContent
              sideOffset={8}
              align="end"
              className="relative flex max-w-[30ch] flex-col"
            >
              {session && (
                <Fragment>
                  <DropdownMenuLabel className="text-xs text-base-content/60">
                    Account
                  </DropdownMenuLabel>
                  <DropdownMenuLabel className="min-w-0">
                    <div className="-mt-1 flex min-w-0 items-center gap-2">
                      <img
                        src={session.image}
                        className="size-8 rounded-full"
                      />
                      <div className="min-w-0 max-w-40 leading-none">
                        <div className="truncate">{session.name}</div>
                        {/* <EllipsisHorizontalTextWithTooltip className="min-w-0 truncate text-xs text-base-content/60">
                          {session?.handle
                            ? `@${session.handle}`
                            : session?.email}
                        </EllipsisHorizontalTextWithTooltip> */}
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                </Fragment>
              )}
              <DropdownMenuItem
                onClick={async () => {
                  // getToken() && apiClient.user.proxy('logout').post()
                  // removeToken()
                  // await authClient.signOut().then(res => {
                  //   if (res.data?.success) {
                  //     window.location.reload()
                  //   }
                  // })
                }}
                icon={<i className="i-mingcute-exit-line size-4" />}
              >
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenuPortal>
        )}
      </DropdownMenu>
    </AnimatePresence>
  )
}

const ReaderAvatar = () => {
  // const session = useSessionReader()!
  const session = {
    name: 'Guest',
    image: 'https://avatars.githubusercontent.com/u/20612607?v=4',
  }
  return (
    <div className="pointer-events-auto relative flex items-center justify-center">
      <img
        className="rounded-full"
        height={36}
        width={36}
        src={session.image}
        alt={session.name}
      />
      {/* <UserAuthFromIcon className="absolute -bottom-1 right-0" /> */}
    </div>
  )
}
