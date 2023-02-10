import '../styles/globals.css'

import { QueryClient, QueryClientProvider } from 'react-query'
import { useState } from 'react'
import { trpc } from '../utils/trpc'
import { SessionProvider } from 'next-auth/react'
import { CustomAppProps } from '@/lib/types/page.types'

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: CustomAppProps) {
  const AnyComponent = Component as any
  const [queryClient] = useState(() => new QueryClient())
  const getLayout = Component.getLayout || (page => page)

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        {getLayout(<AnyComponent {...pageProps} />)}
      </QueryClientProvider>
    </SessionProvider>
  )
}

// export default MyApp

export default trpc.withTRPC(MyApp)
