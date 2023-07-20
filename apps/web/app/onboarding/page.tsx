'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { trpc } from '~/utils/trpc'

function Onboarding() {
  const router = useRouter()
  // const

  const createUser = trpc.user.create.useMutation()

  useEffect(() => {
    createUser.mutate()
  }, [])

  const handleContinue = () => {
    router.replace('/')
  }

  return (
    <div>
      <div>Onboarding</div>
      <button onClick={handleContinue}>Continue</button>
    </div>
  )
}

export default Onboarding
