import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import { createTRPCNext } from '@trpc/next'
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server'
import { toast } from 'react-toastify'
// ℹ️ Type-only import:
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html#type-only-imports-and-export
import type { AppRouter } from 'server/src/routes/router'

function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_VERCEL_URL)
    // reference for vercel.com
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  if (process.env.RENDER_INTERNAL_HOSTNAME)
    // reference for render.com
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`
  // assume localhost
  return `http://localhost:9797`
}

const onError = (error: any) => {
  toast.error(`Something went wrong : ${error?.message}`)
  // if (error.data.code === 'UNAUTHORIZED') {
  //   setVisible(true)
  // }
}

export const trpc = createTRPCNext<AppRouter>({
  config({ ctx }) {
    return {
      links: [
        httpBatchLink({
          /**
           * If you want to use SSR, you need to use the server's full URL
           * @link https://trpc.io/docs/ssr
           **/
          url: typeof window !== undefined ? '/trpc' : `${getBaseUrl()}/trpc`,
          fetch(url, options) {
            return fetch(url, {
              ...options,
              credentials: 'include',
            } as RequestInit)
          },
        }),
      ],
      /**
       * @link https://tanstack.com/query/v4/docs/reference/QueryClient
       **/
      queryClient: new QueryClient({
        queryCache: new QueryCache({ onError }),
        mutationCache: new MutationCache({ onError }),
      }),
    }
  },
  /**
   * @link https://trpc.io/docs/ssr
   **/
  ssr: false,
})

export type RouterInput = inferRouterInputs<AppRouter>
export type RouterOutput = inferRouterOutputs<AppRouter>
