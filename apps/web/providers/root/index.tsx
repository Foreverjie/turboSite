'use client'

import { LazyMotion } from 'framer-motion'
import { ThemeProvider } from 'next-themes'
import type { PropsWithChildren } from 'react'
import { ProviderComposer } from './ProviderComposer'
import { PageScrollInfoProvider } from './page-scroll-info-provider'
import { useBeforeUnload } from '~/hooks/common/use-before-unload'

const loadFeatures = () =>
  import('./framer-lazy-feature').then(res => res.default)

const baseContexts: JSX.Element[] = [
  <ThemeProvider key="themeProvider" />,
  <PageScrollInfoProvider />,
  <useBeforeUnload.Provider />,

  <LazyMotion features={loadFeatures} strict key="framer" />,
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
