import '../styles/index.css'

import { init } from './init'

import { TrpcProvider } from '~/utils'
import { Inter } from 'next/font/google'
import { ToastContainer } from 'react-toastify'

import PKG from '~/package.json'
import { Root } from '~/components/layout/root/Root'
import { AppProviders } from '~/providers/root'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { sansFont, serifFont } from '~/lib/fonts'

const { version } = PKG

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Flash',
  description: 'The fastest web online',
}

init()

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="noise themed" suppressHydrationWarning>
      <head>
        <SayHi />
      </head>
      <body
        className={`${sansFont.variable} ${serifFont.variable} m-0 h-full p-0 font-sans`}
      >
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
          <div className="fixed inset-y-0 right-0 w-[var(--removed-body-scroll-bar-size)]" />
        </AppProviders>
        <SpeedInsights />
      </body>
    </html>
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
