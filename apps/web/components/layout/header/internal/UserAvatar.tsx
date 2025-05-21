'use client'

import { AnimatePresence } from 'motion/react'
import { Fragment } from 'react'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
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
import { useModalStack } from '../../../ui/modal/stacked/hooks'
import { usePresentUserProfileModal } from './hooks'
import { cn } from 'ui/src/utils'
import { LoginProps } from './LoginButton'

export const UserAvatar = ({
  ref,
  className,
  avatarClassName,
  hideName,
  userId,
  enableModal,
  style,
  onClick,
  ...props
}: {
  className?: string
  avatarClassName?: string
  hideName?: boolean
  userId?: string
  enableModal?: boolean
} & LoginProps &
  React.HTMLAttributes<HTMLDivElement> & {
    ref?: React.Ref<HTMLDivElement>
  }) => {
  const user = trpc.user.me.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retryOnMount: false,
  })

  const isSignedIn = !!user.data

  const presentUserProfile = usePresentUserProfileModal('drawer')

  return (
    <AnimatePresence>
      <div className="pointer-events-auto flex h-10 w-full items-center justify-center">
        <div className="relative">
          {isSignedIn ? (
            <div
              style={style}
              ref={ref}
              onClick={e => {
                // console.log('click', e)
                // presentUserProfile(userId || 'ttt')
                // if (enableModal) {
                //   presentUserProfile(userId)
                // }
                // presentUserProfile(userId)
                // onClick?.(e)
              }}
              {...props}
              className={cn(
                'text-text-secondary flex h-20 items-center justify-center gap-2 px-5 py-2 font-medium',
                className,
              )}
            >
              <Avatar
                className={cn(
                  'aspect-square h-full w-auto overflow-hidden rounded-full border bg-stone-300',
                  avatarClassName,
                )}
              >
                <AvatarImage
                  className="animate-in fade-in-0 duration-200"
                  src={user.data.user_metadata.avatar_url}
                  alt={user.data.user_metadata.name}
                />
                <AvatarFallback
                  style={
                    {
                      // backgroundColor: getColorScheme(randomColor, true).light
                      //   .accent,
                    }
                  }
                  className="text-xs text-white"
                >
                  {user.data.email}
                </AvatarFallback>
              </Avatar>
              {!hideName && <div>{user.data.user_metadata.name}</div>}
            </div>
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
