'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import { useState } from 'react'
import { mockedTRPC, trpc, trpcMsw } from './trpc'
import SuperJSON from 'superjson'
import { httpLink } from '@trpc/react-query'
import { setupServer } from 'msw/node'
import { setupWorker } from 'msw'

export const TrpcProvider: React.FC<{ children: React.ReactNode }> = p => {
  function getBaseUrl() {
    if (typeof window !== 'undefined') {
      // browser should use relative path
      return ''
    }
    if (process.env.VERCEL_URL) {
      // reference for vercel.com
      return `https://${process.env.VERCEL_URL}`
    }

    if (process.env.RENDER_INTERNAL_HOSTNAME) {
      // reference for render.com
      return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`
    }
    // assume localhost
    return `http://localhost:${process.env.PORT ?? 9797}`
  }

  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
      transformer: SuperJSON,
    }),
  )
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {p.children}
      </QueryClientProvider>
    </trpc.Provider>
  )
}

const mockedTRPCClient = mockedTRPC.createClient({
  transformer: SuperJSON,
  links: [httpLink({ url: 'http://localhost:8080/api/trpc' })],
})

const mockedQueryClient = new QueryClient()

export const TrpcMockProvider: React.FC<{ children: React.ReactNode }> = p => {
  return (
    <mockedTRPC.Provider
      client={mockedTRPCClient}
      queryClient={mockedQueryClient}
    >
      <QueryClientProvider client={mockedQueryClient}>
        {p.children}
      </QueryClientProvider>
    </mockedTRPC.Provider>
  )
}

export const server = setupServer(
  trpcMsw.post.all.query((req, res, ctx) => {
    // TODO:
    // either have `getInput` return `json` because it knows our transformer (preferred)
    // or at least type `getInput` correctly (might require a PR to msw-trpc)
    // const request = req.getInput().json;
    return res(
      ctx.status(200),
      // TODO: fix type issues here
      ctx.data([]),
    )
  }),
)

export const worker = setupWorker(
  trpcMsw.post.all.query((req, res, ctx) => {
    // TODO:
    // either have `getInput` return `json` because it knows our transformer (preferred)
    // or at least type `getInput` correctly (might require a PR to msw-trpc)
    // const request = req.getInput().json;
    return res(
      ctx.status(200),
      // TODO: fix type issues here
      ctx.data([]),
    )
  }),
)
