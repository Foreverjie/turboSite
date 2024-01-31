import { TrpcProvider } from '~/utils'
import { Inter } from 'next/font/google'
import { cookies } from 'next/headers'
import { Toaster } from 'ui'

import PKG from '~/package.json'
import { Root } from '../../components/layout/root/Root'
import { AppProviders } from '../../providers/root'

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
    <html lang="en" className={theme?.value}>
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

            <Root>{children}</Root>
            {/* <Footer /> */}
            <Toaster />
            {/* </AggregationProvider> */}
          </TrpcProvider>
        </AppProviders>
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
