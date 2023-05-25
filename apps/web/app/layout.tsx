import { TrpcProvider } from '~/utils/trpcProvider'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <TrpcProvider>
      <html>
        <head>{/* snip */}</head>
        <body>{children}</body>
      </html>
    </TrpcProvider>
  )
}
