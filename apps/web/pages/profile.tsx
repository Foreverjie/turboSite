import { useSession } from 'next-auth/react'
import React from 'react'

function Profile() {
  const { data: session, status } = useSession()
  console.log('session', session)
  return (
    <div>
      Hello {session?.user.username} {status}
      {session?.user.avatar ? (
        <img
          className="rounded-full h-10 w-10 object-cover"
          src={session?.user.avatar}
          alt="username"
        />
      ) : null}
    </div>
  )
}

Profile.requireAuth = true

export default Profile
