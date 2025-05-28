'use client'

import { LazyMotion } from 'motion/react'
import { ThemeProvider } from 'next-themes'
import type { PropsWithChildren } from 'react'
import { ProviderComposer } from './ProviderComposer'
import { PageScrollInfoProvider } from './page-scroll-info-provider'
import { useBeforeUnload } from '~/hooks/common/use-before-unload'
import { JotaiStoreProvider } from './jotai-provider'
import { ModalStackProvider } from '../../components/ui/modal'
import { HotkeyProvider } from './hotkeys-provider'
import { Toaster } from '~/components/ui/toast'

const loadFeatures = () =>
  import('./framer-lazy-feature').then(res => res.default)

const baseContexts: JSX.Element[] = [
  <HotkeyProvider />,
  <ThemeProvider key="themeProvider" />,
  <JotaiStoreProvider key="jotaiStoreProvider" />,

  <PageScrollInfoProvider />,
  <useBeforeUnload.Provider />,

  <LazyMotion features={loadFeatures} strict key="framer" />,
]

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <>
      <ProviderComposer contexts={baseContexts}>
        <ModalStackProvider>{children}</ModalStackProvider>
        <Toaster />

        {/* <DebugProvider key="debugProvider" /> */}
        {/* <ScriptInjectProvider /> */}
      </ProviderComposer>
    </>
  )
}
