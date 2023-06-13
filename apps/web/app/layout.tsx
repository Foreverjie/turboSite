import { TrpcProvider } from '~/utils/trpcProvider'
import { CustomAppProps } from '~/lib/types/page.types'
import { SessionProvider } from 'next-auth/react'
import { ProtectedLayout } from '~/layouts/protectedLayout'
import { getServerSession } from 'next-auth/next'
import { AuthOptions } from '~/pages/api/auth/[...nextauth]'
// import { useModal } from 'ui'

export default async function Layout({ Component }: CustomAppProps) {
  const requireAuth = Component.requireAuth || false
  const getLayout = Component.getLayout || (page => page)
  // const { visible, setVisible } = useModal()
  const session = await getServerSession(AuthOptions)

  return (
    <TrpcProvider>
      <SessionProvider session={session}>
        <html>
          <head>{/* snip */}</head>
          <body>
            {requireAuth ? (
              <ProtectedLayout>{getLayout(<Component />)}</ProtectedLayout>
            ) : (
              getLayout(<Component />)
            )}
          </body>
        </html>
      </SessionProvider>
    </TrpcProvider>
  )
}
