import '../styles/index.css'

import { init } from './init'

import { TrpcProvider } from '~/utils'
import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import { cookies } from 'next/headers'
import { ToastContainer } from 'react-toastify'

import PKG from '~/package.json'
import { Root } from '~/components/layout/root/Root'
import { AppProviders } from '~/providers/root'

const { version } = PKG

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Flash',
  description: 'The fastest web online',
}

init()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // TODO theme type annotation
  const theme = cookies().get('theme')

  return (
    <ClerkProvider
    // appearance={{
    //   baseTheme: theme?.value === 'dark' ? dark : undefined,
    // }}
    >
      <html lang="en" className={theme?.value} suppressHydrationWarning>
        <head>
          <SayHi />
        </head>
        <body className={`${inter.className} m-0 h-full p-0 font-sans`}>
          <AppProviders>
            <TrpcProvider>
              {/* <AggregationProvider
              aggregationData={data}
              appConfig={data.themeConfig.config}
            > */}
              <div data-theme>
                <Root>{children}</Root>
              </div>
              {/* <Footer /> */}
              <ToastContainer />
              {/* </AggregationProvider> */}
            </TrpcProvider>
          </AppProviders>
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
