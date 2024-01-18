import './globals.css'

import type { PropsWithChildren } from 'react'

import { init } from './init'

init()

export default function RootLayout({ children }: PropsWithChildren) {
  return <>{children}</>
}
