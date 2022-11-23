import React, { PropsWithChildren } from 'react'

import { WebHeader } from './WebHeader'

interface AppLayoutProps {
  isLoading?: boolean
}

export function WebLayout({
  children,
  isLoading,
}: PropsWithChildren<AppLayoutProps>) {
  return (
    <>
      <WebHeader isLoading={isLoading} />

      <div className="bg-gray-100 h-full">
        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </>
  )
}
