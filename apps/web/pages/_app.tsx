import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { QueryClient, QueryClientProvider } from 'react-query'
import { useState } from 'react'
import { withTRPC } from '@trpc/next'
import { SessionProvider } from 'next-auth/react'
import type { AppRouter } from 'server/src/routes/router'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const AnyComponent = Component as any
  const [queryClient] = useState(() => new QueryClient())

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <AnyComponent {...pageProps} />
      </QueryClientProvider>
    </SessionProvider>
  )
}

// export default MyApp

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/trpc`
      : 'http://localhost:8080/trpc'

    return {
      url,
      headers: {
        'x-ssr': '1',
      },
      fetch(url: string, options: any) {
        return fetch(url, {
          ...options,
          credentials: 'include',
        })
      },
    }
  },
  ssr: true,
})(MyApp)
