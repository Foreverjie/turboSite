'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  Textarea,
} from 'ui'

import { useUser, useClerk } from '@clerk/nextjs'
import {
  ImageIcon,
  MapPinIcon,
  Moon,
  PlusCircleIcon,
  Sun,
  UserIcon,
} from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { trpc } from '../../utils/trpc'
import ShouldRender from '../ShouldRender'

export enum Theme {
  dark = 'dark',
  light = 'light',
}

function Header() {
  const { user, isSignedIn, isLoaded } = useUser()
  const router = useRouter()
  const path = usePathname()
  const [post, setPost] = useState('')
  const [postOpen, setPostOpen] = useState(false)
  const utils = trpc.useContext()
  const newPost = trpc.post.new.useMutation({
    onSuccess: () => {
      utils.post.all.invalidate()
    },
  })
  const { signOut } = useClerk()

  const addPost = async () => {
    if (!post) return
    await newPost.mutateAsync({ content: post })
    setPostOpen(false)
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

  const [theme, setTheme] = useState<Theme>(Theme.light)

  const toggleTheme = () => {
    const targetTheme = theme === Theme.light ? Theme.dark : Theme.light
    const root = document.getElementsByTagName('html')[0]
    root.classList.remove(Theme.dark, Theme.light)
    root.classList.add(targetTheme)
    document.cookie = `theme=${targetTheme}`
    setTheme(targetTheme)
  }

  useEffect(() => {
    const isDarkTheme = document
      .getElementsByTagName('html')[0]
      .classList.contains(Theme.dark)
    if (isDarkTheme) {
      setTheme(Theme.dark)
    } else {
      setTheme(Theme.light)
    }
  }, [])

  const cls = visible ? 'top-0' : 'top-[-80px]'

  return (
    <div
      className={`fixed shadow-md w-full flex bg-background p-4 z-50 items-center justify-between transition-all duration-500 ease-in-out ${cls}`}
    >
      <ShouldRender if={!isLoaded || !isSignedIn}>
        <Avatar className="flex justify-center items-center" onClick={goSignIn}>
          <UserIcon />
        </Avatar>
      </ShouldRender>
      <ShouldRender if={isLoaded && isSignedIn}>
        <Sheet>
          <SheetTrigger>
            <Avatar>
              <AvatarImage src={user?.imageUrl} />
              <AvatarFallback>{user?.username}</AvatarFallback>
            </Avatar>
          </SheetTrigger>
          <SheetContent side={'left'} className="flex">
            <div className="flex flex-col flex-1 justify-around">
              <Avatar>
                <AvatarImage src={user?.imageUrl} />
                <AvatarFallback>{user?.username}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col space-y-2">
                <Button variant="link" onClick={() => router.push('/profile')}>
                  Profile
                </Button>
                <Button
                  variant="link"
                  onClick={() => router.push('/notifications')}
                >
                  Notifications
                </Button>
                <Button
                  variant="link"
                  onClick={() => router.push('/favorites')}
                >
                  Favorites
                </Button>
                <Button variant="link" onClick={() => router.push('/settings')}>
                  Settings
                </Button>
                <Button variant="link" onClick={() => router.push('/sign-out')}>
                  Sign Out
                </Button>
              </div>
              <div
                onClick={toggleTheme}
                className="flex justify-between items-center"
              >
                {theme === Theme.light ? <Sun /> : <Moon />}
                <Button variant="link" onClick={() => signOut()}>
                  Sign Out
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </ShouldRender>
      <Image src="/flash.svg" alt="Icon" width={40} height={40} />
      <ShouldRender if={isLoaded && isSignedIn}>
        <Sheet open={postOpen} onOpenChange={setPostOpen}>
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
