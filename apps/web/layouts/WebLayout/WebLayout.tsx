import React, { PropsWithChildren } from 'react'

import { WebHeader } from './WebHeader'

interface AppLayoutProps {
  isLoading?: boolean
  headerItem?: JSX.Element
}

export function WebLayout({
  children,
  headerItem,
  isLoading,
}: PropsWithChildren<AppLayoutProps>) {
  return (
    <>
      <WebHeader isLoading={isLoading} headerItem={headerItem} />

      <div className="">
        <main className="">{children}</main>
      </div>
    </>
  )
}
