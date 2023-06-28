import Footer from '~/components/Footer'
import './globals.css'
import { TrpcProvider } from '~/utils/trpcProvider'

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
    <html lang="en">
      <body>
        <TrpcProvider>{children}</TrpcProvider>
        <Footer />
      </body>
    </html>
  )
}
