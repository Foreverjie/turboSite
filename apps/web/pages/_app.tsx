import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { trpc } from '../utils/trpc'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useState } from 'react'
import { SessionProvider } from 'next-auth/react'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
      url: 'http://localhost:8080/trpc',
    }),
  )

  return (
    <SessionProvider session={session}>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </trpc.Provider>
    </SessionProvider>
  )
}

export default MyApp
