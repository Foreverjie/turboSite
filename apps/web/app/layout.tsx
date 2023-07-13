import Footer from '~/components/Footer'
import './globals.css'
import { TrpcProvider, ThemeProvider } from '~/utils'
import Sidebar from '~/components/Sidebar'
import Header from '~/components/Header'
import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider>
            <TrpcProvider>
              <div className="">
                <Sidebar />
                <div className="">
                  <Header />
                  {children}
                  <Footer />
                </div>
              </div>
            </TrpcProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
