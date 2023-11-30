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
} from 'ui'
import { useClerk, useUser } from '@clerk/nextjs'
import { Moon, PlusCircleIcon, Sun, UserIcon } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import PostEditor from '../PostEditor'
import ShouldRender from '../ShouldRender'

export enum Theme {
  dark = 'dark',
  light = 'light',
}

function Header() {
  const { user, isSignedIn, isLoaded } = useUser()
  const router = useRouter()
  const path = usePathname()
  const [postOpen, setPostOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const { signOut } = useClerk()

  const goSignIn = () => {
    router.push(`/sign-in?redirect=${path}`)
  }

  const [position, setPosition] = useState(window.scrollY)
  const [visible, setVisible] = useState(true)
  const [headerClass, setHeaderClass] = useState('')
  useEffect(() => {
    const handleScroll = () => {
      const moving = window.scrollY
      if (moving > 0) {
        setVisible(position > moving)
        setPosition(moving)
        setHeaderClass('top-0 sticky backdrop-filter backdrop-blur-sm')
      } else {
        setVisible(true)
        setHeaderClass('')
      }
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
    document.cookie = `theme=${targetTheme};path=/;`
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

  const toMainPage = () => {
    router.push('/')
  }

  const toPage = (path: string) => {
    router.push(path)
    setSidebarOpen(false)
  }

  const cls = visible ? 'top-0' : 'top-[-80px]'

  return (
    <div
      className={`w-full flex p-4 z-50 items-center justify-between transition-all duration-500 ease-in-out ${cls} ${headerClass}`}
    >
      <ShouldRender if={!isLoaded || !isSignedIn}>
        <Avatar className="flex justify-center items-center" onClick={goSignIn}>
          <UserIcon />
        </Avatar>
      </ShouldRender>
      <ShouldRender if={isLoaded && isSignedIn}>
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
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
                <Button variant="link" onClick={() => toPage('/profile')}>
                  Profile
                </Button>
                <Button variant="link" onClick={() => toPage('/notifications')}>
                  Notifications
                </Button>
                <Button variant="link" onClick={() => toPage('/favorites')}>
                  Favorites
                </Button>
                <Button variant="link" onClick={() => toPage('/settings')}>
                  Settings
                </Button>
              </div>
              <div className="flex justify-between items-center">
                <div onClick={toggleTheme}>
                  {theme === Theme.light ? <Sun /> : <Moon />}
                </div>
                <Button variant="link" onClick={() => signOut()}>
                  Sign Out
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </ShouldRender>
      <Image
        src="/flash.svg"
        alt="Icon"
        width={40}
        height={40}
        onClick={toMainPage}
      />
      <ShouldRender if={isLoaded && isSignedIn}>
        <Sheet open={postOpen} onOpenChange={setPostOpen}>
          <SheetTrigger>
            <PlusCircleIcon className="m-2" />
          </SheetTrigger>
          <SheetContent side={'bottom'} className="h-4/5 flex flex-col">
            <SheetHeader title="Add Post" />
            <PostEditor onPostAdded={() => setPostOpen(false)} />
          </SheetContent>
        </Sheet>
      </ShouldRender>
    </div>
  )
}

export default Header
