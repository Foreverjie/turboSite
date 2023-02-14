import '../styles/globals.css'

import { QueryClient, QueryClientProvider } from 'react-query'
import { useState } from 'react'
import { trpc } from '../utils/trpc'
import { SessionProvider } from 'next-auth/react'
import { CustomAppProps } from '@/lib/types/page.types'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </SessionProvider>
  )
}

// export default MyApp

export default trpc.withTRPC(MyApp)
