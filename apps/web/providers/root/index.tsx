'use client'

import { LazyMotion } from 'framer-motion'
import { ThemeProvider } from 'next-themes'
import type { PropsWithChildren } from 'react'
import { ProviderComposer } from './ProviderComposer'
import { PageScrollInfoProvider } from './page-scroll-info-provider'

const loadFeatures = () =>
  import('./framer-lazy-feature').then(res => res.default)

const baseContexts: JSX.Element[] = [
  <ThemeProvider key="themeProvider" />,
  <PageScrollInfoProvider />,

  //   <LazyMotion features={loadFeatures} strict key="framer" />,
]

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <>
      <ProviderComposer contexts={baseContexts}>
        {children}
        {/* <DebugProvider key="debugProvider" /> */}
        {/* <ScriptInjectProvider /> */}
      </ProviderComposer>
    </>
  )
}
