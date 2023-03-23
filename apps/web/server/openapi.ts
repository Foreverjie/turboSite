import { generateOpenApiDocument } from 'trpc-openapi'

import { appRouter } from './routers'

// Generate OpenAPI schema document
export const openApiDocument: any = generateOpenApiDocument(appRouter, {
  title: 'TurboSite CRUD API',
  description: 'OpenAPI compliant REST API built using tRPC with Next.js',
  version: '1.0.0',
  baseUrl: 'http://localhost:3000/api',
  docsUrl: 'https://github.com/jlalmes/trpc-openapi',
  tags: ['auth', 'users', 'posts', 'cat'],
})
