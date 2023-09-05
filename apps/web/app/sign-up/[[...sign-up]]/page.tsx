'use client'

import { useCallback, useEffect, useState } from 'react'
import { SignUpEmailStep } from './sign-up-email-step'
import { useRouter } from 'next/navigation'
import { SignUpCodeStep } from './sign-up-code-step'
import { SignUpPasswordStep } from './sign-up-password-step'
import { SignUpInformationStep } from './sign-up-information-step'
import { SignUpDoneStep } from './sign-up-done-step'
import { useSession } from '@clerk/nextjs'
import { Button } from 'ui'

enum SignUpStep {
  EMAIL,
  CODE,
  PASSWORD,
  INFORMATION,
  DONE,
}

export default function Page() {
  const [step, setStep] = useState(SignUpStep.EMAIL)
  const { isLoaded, isSignedIn } = useSession()
  const router = useRouter()
  const nextStep = useCallback(async () => {
    if (step === SignUpStep.DONE) {
      router.push('/')
      return
    }
    setStep(prev => prev + 1)
  }, [router, step])

  const toSignIn = () => {
    router.push('/sign-in')
  }

  const renderStep = useCallback(() => {
    switch (step) {
      case SignUpStep.EMAIL:
        return <SignUpEmailStep onDone={nextStep} />
      case SignUpStep.CODE:
        return <SignUpCodeStep onDone={nextStep} />
      case SignUpStep.PASSWORD:
        return <SignUpPasswordStep onDone={nextStep} />
      case SignUpStep.INFORMATION:
        return <SignUpInformationStep onDone={nextStep} />
      case SignUpStep.DONE:
        return <SignUpDoneStep onDone={nextStep} />
    }
  }, [nextStep, step])

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.replace('/')
    }
  }, [isLoaded, isSignedIn])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-6 lg:px-8">
      {renderStep()}
      <div className="mt-4">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-200 flex space-x-2 justify-center items-center">
          <span>Already have an account?</span>
          <Button variant={'link'} onClick={toSignIn} className="p-0">
            Sign in
          </Button>
        </p>
      </div>
    </div>
  )
}
