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
import { AlertCircle, FileWarning, Terminal } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from 'ui'
import ShouldRender from '../../components/ShouldRender'

function Onboarding() {
  const router = useRouter()
  const { isSignedIn, isLoaded } = useUser()
  const [missingFields, setMissingFields] = useState<string[]>([])
  const [optionalFields, setOptionalFields] = useState<string[]>([])

  if (!isSignedIn && isLoaded) {
    router.push('/')
  }

  // Give user tips to finish onboarding
  // Get Missing fields
  const { data: user } = trpc.user.me.useQuery()

  useEffect(() => {
    if (user) {
      const missingFields = []
      const optionalFields = []
      if (!user.name) {
        missingFields.push('name')
      }
      if (!user.email) {
        missingFields.push('email')
      }
      // for now, china can not receive sms from clerk, so we don't require phone
      // if (!user.phone) {
      //   missingFields.push('phone')
      // }
      setMissingFields(missingFields)
      if (!user.gender) {
        optionalFields.push('gender')
      }
      setOptionalFields(optionalFields)
    }
  }, [router, user])

  return (
    <div>
      <div>Onboarding</div>
      <ShouldRender if={missingFields.length > 0}>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Missing fields: {missingFields.join(', ')}
          </AlertDescription>
        </Alert>
      </ShouldRender>
      <ShouldRender if={optionalFields.length > 0}>
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Complete your user profile</AlertTitle>
          <AlertDescription>
            Fields you can fill in: {optionalFields.join(', ')}
          </AlertDescription>
        </Alert>
      </ShouldRender>
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
