import { useSession } from 'next-auth/react'
import React from 'react'
import Image from 'next/image'

function Profile() {
  const { data: session, status } = useSession()
  console.log('session', session)
  return (
    <div>
      Hello {session?.user.username} {status}
      {session?.user.avatar ? (
        <Image
          src={session?.user.avatar}
          width={100}
          height={100}
          alt="username"
        />
      ) : null}
    </div>
  )
}

Profile.requireAuth = true

export default Profile
