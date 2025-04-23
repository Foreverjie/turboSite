'use client'

import { AnimatePresence } from 'motion/react'
import { Fragment } from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'ui'

import { SignInButton, SignOutButton } from './SignInButton'
import { trpc } from '../../../../utils/trpc'

export function UserAuth() {
  const user = trpc.user.me.useQuery(undefined, {
    retry: false,
  })

  const isSignedIn = !!user.data

  return (
    <AnimatePresence>
      <div className="pointer-events-auto flex h-10 w-full items-center justify-center">
        <div className="relative">
          {isSignedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <ReaderAvatar />
              </DropdownMenuTrigger>

              {isSignedIn && (
                <DropdownMenuPortal>
                  <DropdownMenuContent
                    sideOffset={8}
                    align="end"
                    className="relative flex max-w-[30ch] flex-col"
                  >
                    {isSignedIn && (
                      <Fragment>
                        <DropdownMenuLabel className="text-xs text-base-content/60">
                          Account
                        </DropdownMenuLabel>
                        <DropdownMenuLabel className="min-w-0">
                          <div className="-mt-1 flex min-w-0 items-center gap-2">
                            <img
                              src={user.data.user_metadata.avatar_url}
                              className="size-8 rounded-full"
                            />
                            <div className="min-w-0 max-w-40 leading-none">
                              <div className="truncate">
                                {user.data.user_metadata.name}
                              </div>
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

                    <SignOutButton />
                  </DropdownMenuContent>
                </DropdownMenuPortal>
              )}
            </DropdownMenu>
          ) : (
            <SignInButton isLoading={user.isLoading} />
          )}
        </div>
      </div>
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
