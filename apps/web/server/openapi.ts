import { generateOpenApiDocument } from 'trpc-openapi'

import { appRouter } from './routers'

console.log('appRouter', appRouter._def.procedures)
// Generate OpenAPI schema document
export const openApiDocument: any = generateOpenApiDocument(appRouter, {
  title: 'TurboSite CRUD API',
  description: 'OpenAPI compliant REST API built using tRPC with Next.js',
  version: '1.0.0',
  baseUrl: 'http://localhost:3000/api',
  docsUrl: 'https://jie1203.com/apiDoc',
  tags: ['cat', 'user'],
})
