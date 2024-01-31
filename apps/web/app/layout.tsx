import '../styles/index.css'

import type { PropsWithChildren } from 'react'

import { init } from './init'
import { ClerkProvider } from '@clerk/nextjs'
import { cookies } from 'next/headers'
import { dark } from '@clerk/themes'

init()

export default function RootLayout({ children }: PropsWithChildren) {
  const theme = cookies().get('theme')

  return (
    <ClerkProvider
      appearance={{
        baseTheme: theme?.value === 'dark' ? dark : undefined,
      }}
    >
      {children}{' '}
    </ClerkProvider>
  )
}
