import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { Avatar } from 'ui/src'

function PostBox() {
  const [input, setInput] = useState('')
  const { data: session, status } = useSession()

  const user = session
    ? {
        name: session.user?.name,
        avatar: session.user?.image,
      }
    : null

  const router = useRouter()

  const handleLogin = () => {
    router.push('/signIn')
  }

  const handleMe = () => {
    router.push('/user/me')
  }

  return (
    <div className="flex space-x-2 p-5">
      <div className="min-w-45 min-h-45 mt-4">
        <Avatar user={user} onClick={handleLogin} />
      </div>

      <div className="flex flex-1 items-center pl-2">
        <form action="" className="flex flex-1 flex-col">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            type={'text'}
            placeholder="What's Happening?"
            className="h-24 w-full text-xl outline-none placeholder:text-xl"
          />
          <div className="flex items-center">
            <div className="flex flex-1 space-x-2 text-primary"></div>
            <button
              className="rounded-full bg-primary px-5 py-2 font-bold text-white disabled:opacity-40"
              disabled={!input}
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PostBox
