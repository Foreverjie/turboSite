'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Textarea,
} from 'ui'

import { ImageIcon, MapPinIcon, PlusCircleIcon, UserIcon } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import ShouldRender from '../ShouldRender'
import { usePathname, useRouter } from 'next/navigation'
import { trpc } from '../../utils/trpc'

function Header() {
  const { user, isSignedIn, isLoaded } = useUser()
  const router = useRouter()
  const path = usePathname()
  const [post, setPost] = useState('')
  const newPost = trpc.post.new.useMutation()

  const addPost = async () => {
    if (!post) return
    await newPost.mutateAsync({ content: post })
    setPost('')
  }

  const goSignIn = () => {
    router.push(`/sign-in?redirect=${path}`)
  }

  const handleImageClick = () => {}
  const handleLocationClick = () => {}

  const [position, setPosition] = useState(window.scrollY)
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    const handleScroll = () => {
      let moving = window.scrollY

      setVisible(position > moving)
      setPosition(moving)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  })

  const cls = visible ? 'top-0' : 'top-[-80px]'

  return (
    <div
      className={`fixed shadow-md w-full flex bg-background p-4 z-50 items-center justify-between transition duration-400 ease-in-out ${cls}`}
    >
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
      <ShouldRender if={isLoaded && isSignedIn}>
        <Sheet>
          <SheetTrigger>
            <PlusCircleIcon className="m-2" />
          </SheetTrigger>
          <SheetContent side={'bottom'} className="h-4/5 flex flex-col">
            <SheetHeader title="Add Post" />
            <Textarea
              className="flex flex-1"
              value={post}
              onChange={e => {
                setPost(e.target.value)
              }}
            />
            <div className="flex justify-between">
              <div className="flex items-center justify-start">
                <ImageIcon className="mr-2" onClick={handleImageClick} />
                <MapPinIcon className="mr-2" onClick={handleLocationClick} />
              </div>
              <Button onClick={addPost} loading={newPost.isLoading}>
                Post
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </ShouldRender>
    </div>
  )
}

export default Header
