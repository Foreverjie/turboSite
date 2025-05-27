'use client'

import { AnimatePresence } from 'motion/react'

import { Avatar, AvatarFallback, AvatarImage } from 'ui'

import { cn } from 'ui/src/utils'
import { trpc } from '../../../../utils/trpc'
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
  isLoading = false,
  ...props
}: {
  className?: string
  avatarClassName?: string
  hideName?: boolean
  userId?: string
  enableModal?: boolean
  isLoading?: boolean
} & LoginProps &
  React.HTMLAttributes<HTMLDivElement> & {
    ref?: React.Ref<HTMLDivElement>
  }) => {
  const trpcUtils = trpc.useUtils()
  const user = trpcUtils.user.me.getData()

  return (
    <AnimatePresence>
      <div className="pointer-events-auto flex h-10 w-full items-center justify-center">
        <div className="relative">
          <div
            style={style}
            ref={ref}
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
                src={user?.user_metadata.image}
                alt={user?.user_metadata.name}
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
                {user?.user_metadata.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            {!hideName && <div>{user?.user_metadata.name}</div>}
          </div>
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
