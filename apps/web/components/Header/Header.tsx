'use client'

import Image from 'next/image'
import React, { useState } from 'react'
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

  console.log('loading', newPost.isLoading)

  const goSignIn = () => {
    router.push(`/sign-in?redirect=${path}`)
  }

  const handleImageClick = () => {}
  const handleLocationClick = () => {}

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
              <Button onClick={addPost}>Post</Button>
            </div>
          </SheetContent>
        </Sheet>
      </ShouldRender>
    </div>
  )
}

export default Header
