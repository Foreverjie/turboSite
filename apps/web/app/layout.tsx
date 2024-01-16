import './globals.css'
import { TrpcProvider } from '~/utils'
import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import { cookies } from 'next/headers'
import { dark } from '@clerk/themes'
import { Toaster } from 'ui'
import { Header } from '~/components/layout/header/Header'

import PKG from '~/package.json'

const { version } = PKG

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
        <head>
          <SayHi />
        </head>
        <body className={inter.className}>
          <TrpcProvider>
            <Header />
            <div>{children}</div>
            {/* <Footer /> */}
            <Toaster />
          </TrpcProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}

const SayHi = () => {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `var version = "${version}";
    (${function () {
      console.log(
        `%c Flash ${window.version} %c https://jie1203.com `,
        'color: #fff; margin: 1em 0; padding: 5px 0; background: #39C5BB;',
        'margin: 1em 0; padding: 5px 0; background: #efefef;',
      )
    }.toString()})();`,
      }}
    />
  )
}

declare global {
  interface Window {
    version: string
  }
}
