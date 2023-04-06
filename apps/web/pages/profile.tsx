import { useSession } from 'next-auth/react'
import React from 'react'

function Profile() {
  const { data: session, status } = useSession()
  return (
    <div>
      Hello {session?.user.username} {status}
    </div>
  )
}

Profile.requireAuth = true

export default Profile
