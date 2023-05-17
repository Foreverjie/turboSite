import '../styles/globals.css'
import { trpc } from '../utils/trpc'
import { SessionProvider } from 'next-auth/react'
import { CustomAppProps } from '@/lib/types/page.types'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AuthModal } from '@/components/AuthModal'
import { useModal } from 'ui'
import { ProtectedLayout } from '@/layouts/protectedLayout'
import { Analytics } from '@vercel/analytics/react'

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: CustomAppProps) {
  const AnyComponent = Component as any

  // const onError = (error: any) => {
  //   toast.error(`Something went wrong : ${error?.message}`)
  //   if (error.data.code === 'UNAUTHORIZED') {
  //     setVisible(true)
  //   }
  // }
  const requireAuth = Component.requireAuth || false
  const getLayout = Component.getLayout || (page => page)
  const { visible, setVisible } = useModal()

  return (
    <>
      <SessionProvider session={session}>
        {requireAuth ? (
          <ProtectedLayout>
            {getLayout(<AnyComponent {...pageProps} />)}
          </ProtectedLayout>
        ) : (
          getLayout(<AnyComponent {...pageProps} />)
        )}
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
      <Analytics />
    </>
  )
}

export default trpc.withTRPC(MyApp)
