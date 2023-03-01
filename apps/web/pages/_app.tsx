import '../styles/globals.css'

import { useEffect, useState } from 'react'
import { trpc } from '../utils/trpc'
import { SessionProvider } from 'next-auth/react'
import { CustomAppProps } from '@/lib/types/page.types'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { AuthModal } from '@/components/AuthModal'
import { useModal } from 'ui'

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: CustomAppProps) {
  const AnyComponent = Component as any

  const onError = (error: any) => {
    toast.error(`Something went wrong : ${error?.message}`)
    if (error.data.code === 'UNAUTHORIZED') {
      setVisible(true)
    }
  }
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({ onError }),
        mutationCache: new MutationCache({ onError }),
      }),
  )
  const getLayout = Component.getLayout || (page => page)
  const { visible, setVisible } = useModal()

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
      <AuthModal
        visible={visible}
        onClose={() => {
          setVisible(false)
        }}
      />
    </SessionProvider>
  )
}

export default trpc.withTRPC(MyApp)
