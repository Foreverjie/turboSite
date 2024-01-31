import React, { useEffect, useRef } from 'react'
import anime from 'animejs'
import { Button } from 'ui'
import SignUpTitle from '../../../components/SignUp/SignUpTitle'

type SignUpDoneStepProps = {
  onDone: () => void
}

export const SignUpDoneStep = ({ onDone }: SignUpDoneStepProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current

    if (container) {
      const circle = container.querySelector('.circle')
      const check = container.querySelector('.check')
      const text = container.querySelector('.text')

      anime({
        targets: circle,
        scale: [0, 1],
        opacity: [0, 1],
        easing: 'easeInOutQuad',
        duration: 1000,
      })

      anime({
        targets: check,
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutQuad',
        duration: 1500,
        delay: 1000,
      })

      anime({
        targets: text,
        opacity: [0, 1],
        translateY: [20, 0],
        easing: 'easeInOutQuad',
        duration: 1000,
        delay: 2000,
      })
    }
  }, [])

  return (
    <div className="container" ref={containerRef}>
      <div className="flex flex-col justify-center items-center mb-4 space-y-2 text-center">
        <svg className="icon" viewBox="0 0 64 64">
          <circle
            className="circle"
            cx="32"
            cy="32"
            r="30"
            fill="none"
            strokeWidth="4"
          />
          <path
            className="check"
            fill="none"
            strokeWidth="4"
            strokeLinecap="round"
            d="M23.2 32.4l7.7 7.7 16.3-16.4"
          />
        </svg>
        <SignUpTitle>Sign up successful!</SignUpTitle>
        <Button onClick={onDone}>Go Explore!</Button>
      </div>
    </div>
  )
}
