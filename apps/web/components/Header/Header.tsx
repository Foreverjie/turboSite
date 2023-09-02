'use client'

import Image from 'next/image'
import React from 'react'
import { Avatar } from '../Avatar'

function Header() {
  return (
    <div className="sticky top-0 flex justify-between bg-background p-4 z-50">
      <Avatar />
      <Image src="/flash.svg" alt="Icon" width={40} height={40} />
    </div>
  )
}

export default Header
