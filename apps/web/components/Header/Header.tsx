'use client'

import Image from 'next/image'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from 'ui'
import { useUser } from '@clerk/nextjs'
import ShouldRender from '../ShouldRender'

function Header() {
  const { user, isSignedIn, isLoaded } = useUser()

  return (
    <div
      style={{
        position: 'sticky',
        height: '60px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        boxSizing: 'border-box',
        zIndex: 1,
      }}
    >
      <ShouldRender if={!isLoaded}>
        <Avatar>
          <AvatarImage src="/avatarLoading.svg"></AvatarImage>
        </Avatar>
      </ShouldRender>
      <ShouldRender if={isLoaded && isSignedIn}>
        <Avatar>
          <AvatarImage src={user?.imageUrl} />
          <AvatarFallback>{user?.username}</AvatarFallback>
        </Avatar>
      </ShouldRender>
      <Image src="/flash.svg" alt="Icon" width={40} height={40} />
    </div>
  )
}

export default Header
