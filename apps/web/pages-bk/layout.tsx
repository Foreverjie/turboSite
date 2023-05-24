'use client'

import './globals.css'
import { trpc } from '../utils/trpc'
import { SessionProvider } from 'next-auth/react'
import { CustomAppProps } from '~/lib/types/page.types'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AuthModal } from '~/components/AuthModal'
import { useModal } from 'ui'
import { ProtectedLayout } from '~/layouts/protectedLayout'
import { Analytics } from '@vercel/analytics/react'

function RootLayout({
  Component,
  pageProps: { session, ...pageProps },
}: CustomAppProps) {
  const requireAuth = Component.requireAuth || false
  const getLayout = Component.getLayout || (page => page)
  const { visible, setVisible } = useModal()

  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          {requireAuth ? (
            <ProtectedLayout>
              {getLayout(<Component {...pageProps} />)}
            </ProtectedLayout>
          ) : (
            getLayout(<Component {...pageProps} />)
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
      </body>
    </html>
  )
}

// export const metadata = {
//   title: 'TurboSite',
//   description: 'Welcome to TurboSite!',
// }

export default trpc.withTRPC(RootLayout)
