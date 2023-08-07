'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  UserProfile,
  useUser,
} from '@clerk/nextjs'
import { trpc } from '../../utils/trpc'

function Onboarding() {
  const router = useRouter()
  const { isSignedIn, isLoaded } = useUser()
  const [missingFields, setMissingFields] = useState<string[]>([])

  if (!isSignedIn && isLoaded) {
    router.push('/')
  }

  // Give user tips to finish onboarding
  // Get Missing fields
  const { data: user } = trpc.user.me.useQuery()

  useEffect(() => {
    if (user) {
      const missingFields = []
      if (!user.name) {
        missingFields.push('name')
      }
      if (!user.email) {
        missingFields.push('bio')
      }
      if (!user.phone) {
        missingFields.push('phone')
      }
      setMissingFields(missingFields)
    }
  }, [user])

  return (
    <div>
      <div>Onboarding</div>
      <div>Missing fields: {missingFields.join(', ')}</div>
      <SignedIn>
        {/* Signed in users will see their user profile */}
        <UserProfile />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </div>
  )
}

export default Onboarding
