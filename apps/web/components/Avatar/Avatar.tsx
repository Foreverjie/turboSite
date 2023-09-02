'use client'

import React from 'react'
import { Avatar as CommonAvatar, AvatarFallback, AvatarImage } from 'ui'
import { useUser } from '@clerk/nextjs'
import ShouldRender from '../ShouldRender'
import { UserIcon } from 'lucide-react'

export const Avatar = () => {
  const { user, isSignedIn, isLoaded } = useUser()

  return (
    <>
      <ShouldRender if={!isLoaded || !isSignedIn}>
        <CommonAvatar className="flex justify-center items-center">
          <UserIcon />
        </CommonAvatar>
      </ShouldRender>
      <ShouldRender if={isLoaded && isSignedIn}>
        <CommonAvatar>
          <AvatarImage src={user?.imageUrl} />
          <AvatarFallback>{user?.username}</AvatarFallback>
        </CommonAvatar>
      </ShouldRender>
    </>
  )
}
