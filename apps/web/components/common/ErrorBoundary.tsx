'use client'

import { ErrorBoundary as ErrorBoundaryLib } from 'react-error-boundary'
import type { FC, PropsWithChildren } from 'react'
import { StyledButton } from '../ui/button/StyledButton'

// import { captureException } from '@sentry/nextjs'

const FallbackComponent = () => {
  return (
    <div className="flex w-full flex-col py-6 center">
      Something went wrong. Please contract to{' '}
      <a
        href="mailto:zhangzjsysu@foxmail.com"
        className="shiro-link--underline"
      >
        zhangzjsysu@foxmail.com
      </a>
      .
      <StyledButton
        onClick={() => {
          window.location.reload()
        }}
      >
        Reload Page
      </StyledButton>
    </div>
  )
}
export const ErrorBoundary: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ErrorBoundaryLib
      FallbackComponent={FallbackComponent}
      onError={e => {
        console.error(e)

        // TODO  sentry

        // captureException(e)
      }}
    >
      {children}
    </ErrorBoundaryLib>
  )
}
