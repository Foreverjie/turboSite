'use client'

import { useCallback, useState } from 'react'
import { SignUpEmailStep } from './sign-up-email-step'
import { useRouter } from 'next/navigation'
import { SignUpCodeStep } from './sign-up-code-step'
import { SignUpPasswordStep } from './sign-up-password-step'
import { SignUpInformationStep } from './sign-up-information-step'
import { SignUpDoneStep } from './sign-up-done-step'
import { useSignUp } from '@clerk/nextjs'

enum SignUpStep {
  EMAIL,
  CODE,
  PASSWORD,
  INFORMATION,
  DONE,
}

export default function Page() {
  const [step, setStep] = useState(SignUpStep.EMAIL)
  const { signUp, isLoaded, setActive } = useSignUp()
  const router = useRouter()
  const nextStep = useCallback(async () => {
    // console.log('nextStep', isLoaded)
    // if (!isLoaded) return
    if (step === SignUpStep.DONE) {
      router.push('/')
      return
    }
    // if (signUp?.status === 'complete') {
    //   await setActive({
    //     session: signUp.createdSessionId,
    //   })
    // }
    setStep(prev => prev + 1)
  }, [router, step])
  // const prevStep = () => {
  //   setStep((prev) => prev - 1)
  // }
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-6 lg:px-8">
      {renderStep()}
    </div>
  )
}
