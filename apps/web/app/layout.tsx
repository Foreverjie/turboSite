import Footer from '~/components/Footer'
import './globals.css'
import { TrpcProvider } from '~/utils'
import Sidebar from '~/components/Sidebar'
import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import { cookies } from 'next/headers'
import { dark } from '@clerk/themes'
import dynamic from 'next/dynamic'
import { Toaster } from 'ui'

const Header = dynamic(() => import('~/components/Header'), { ssr: false })

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Flash',
  description: 'The fastest web online',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // TODO theme type annotation
  const theme = cookies().get('theme')

  return (
    <ClerkProvider
      appearance={{
        baseTheme: theme?.value === 'dark' ? dark : undefined,
      }}
    >
      <html lang="en" className={theme?.value}>
        <body className={inter.className}>
          <TrpcProvider>
            <Header />
            <div className="pt-[80px]">{children}</div>
            {/* <Footer /> */}
            <Toaster />
          </TrpcProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
