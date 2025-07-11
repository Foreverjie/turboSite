/**
 * Mobile app configuration
 */

export const config = {
  api: {
    // Development URLs
    development: {
      // Update this with your local machine's IP address when testing on device
      // You can find this by running `ipconfig getifaddr en0` on macOS
      baseUrl: 'http://localhost:9797',
      // For testing on device, use your computer's IP:
      // baseUrl: 'http://192.168.1.100:9797',
    },

    // Production URLs
    production: {
      baseUrl: 'https://your-production-api.com',
    },

    // Get the appropriate base URL
    getBaseUrl: () => {
      return __DEV__
        ? config.api.development.baseUrl
        : config.api.production.baseUrl
    },
  },

  trpc: {
    endpoint: '/api/trpc',
    headers: {
      'x-trpc-source': 'mobile',
    },
  },

  // React Query configuration
  reactQuery: {
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes (renamed from cacheTime in v5)
        retry: (failureCount: number, error: any) => {
          // Don't retry on 4xx errors
          if (error?.status >= 400 && error?.status < 500) {
            return false
          }
          return failureCount < 3
        },
      },
    },
  },
}

export default config
