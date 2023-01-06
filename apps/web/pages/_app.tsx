import '../styles/globals.css'

import { QueryClient, QueryClientProvider } from 'react-query'
import { useState } from 'react'
import { withTRPC } from '@trpc/next'
import { SessionProvider } from 'next-auth/react'
import type { AppRouter } from 'server/src/routes/router'
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

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const url = process.env.NEXT_PUBLIC_BACKEND_API_URL
      ? `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/trpc`
      : 'http://localhost:9797/trpc'

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
