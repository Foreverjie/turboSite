/**
 * Mobile tRPC Provider component
 * This wraps the app with tRPC React Query functionality for React Native
 */

import React, { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import superjson from 'superjson'
import { trpc } from './trpc'
import config from '../config/api'
import { supabase } from '../../lib/supabase'

interface TRPCProviderProps {
  children: React.ReactNode
}

export function TRPCProvider({ children }: TRPCProviderProps) {
  const [queryClient] = useState(() => new QueryClient(config.reactQuery))

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${config.api.getBaseUrl()}${config.trpc.endpoint}`,
          // headers: config.trpc.headers,
          async headers() {
            const headers = new Map<string, string>()
            headers.set('x-trpc-source', 'expo-react')

            const { data } = await supabase.auth.getSession()
            console.log('Supabase session data:', data)
            const token = data.session?.access_token
            if (token) headers.set('authorization', token)

            return Object.fromEntries(headers)
          },
          // For React Native, we might need to handle fetch differently
          fetch: async (input: any, init?: any) => {
            // Use the global fetch that's available in React Native
            console.log('Fetching with input:', input, 'and init:', init)
            return fetch(input, {
              ...init,
              // You might need to add additional headers for authentication
              // headers: {
              //   ...init?.headers,
              //   'Authorization': `Bearer ${await getAuthToken()}`,
              // },
            })
          },
        }),
      ],
      transformer: superjson,
    }),
  )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  )
}

export { trpc }
