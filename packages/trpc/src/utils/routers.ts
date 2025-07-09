/**
 * Router factory utilities
 */
import { z } from 'zod'

/**
 * Create a health check router
 */
export function createHealthRouter(routerFactory: any) {
  return routerFactory({
    health: routerFactory.publicProcedure
      .meta({
        description: 'Health check endpoint',
        openapi: {
          method: 'GET',
          path: '/health',
          tags: ['health'],
          summary: 'Health check',
        },
      })
      .input(z.void())
      .output(z.object({
        status: z.string(),
        timestamp: z.string(),
        uptime: z.number(),
      }))
      .query(() => ({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
      })),
  })
}

/**
 * Create a greeting router
 */
export function createGreetingRouter(routerFactory: any) {
  return routerFactory({
    sayHello: routerFactory.publicProcedure
      .meta({
        description: 'Say hello',
        openapi: {
          method: 'POST',
          path: '/hello',
          tags: ['greeting'],
          summary: 'Say hello',
        },
      })
      .input(z.object({ 
        name: z.string().min(1).max(100),
        language: z.enum(['en', 'es', 'fr', 'de']).default('en').optional(),
      }))
      .output(z.object({ 
        greeting: z.string(),
        language: z.string(),
      }))
      .query(({ input }) => {
        const greetings = {
          en: 'Hello',
          es: 'Hola',
          fr: 'Bonjour',
          de: 'Hallo',
        }
        
        const greeting = greetings[input.language || 'en'] || greetings.en
        
        return { 
          greeting: `${greeting} ${input.name}!`,
          language: input.language || 'en',
        }
      }),
  })
}

/**
 * Create a base router with common endpoints
 */
export function createBaseRouter(routerFactory: any) {
  return routerFactory({
    ...createHealthRouter(routerFactory),
    ...createGreetingRouter(routerFactory),
  })
}
