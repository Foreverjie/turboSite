'use client'

import Image from 'next/image'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from 'ui'

import { PlusCircleIcon, UserIcon } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import ShouldRender from '../ShouldRender'
import { usePathname, useRouter } from 'next/navigation'

function Header() {
  const { user, isSignedIn, isLoaded } = useUser()
  const router = useRouter()
  const path = usePathname()

  const goSignIn = () => {
    router.push(`/sign-in?redirect=${path}`)
  }

  return (
    <div className="sticky top-0 flex bg-background p-4 z-50 items-center justify-between">
      <>
        <ShouldRender if={!isLoaded || !isSignedIn}>
          <Avatar
            className="flex justify-center items-center"
            onClick={goSignIn}
          >
            <UserIcon />
          </Avatar>
        </ShouldRender>
        <ShouldRender if={isLoaded && isSignedIn}>
          <Avatar>
            <AvatarImage src={user?.imageUrl} />
            <AvatarFallback>{user?.username}</AvatarFallback>
          </Avatar>
        </ShouldRender>
      </>
      <Image src="/flash.svg" alt="Icon" width={40} height={40} />
      <PlusCircleIcon className="m-2" />
    </div>
  )
}

export default Header
