/**
 * Common tRPC utilities and helpers
 */
import { z } from 'zod'

/**
 * Common pagination schema
 */
export const paginationSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
  sort: z.string().optional(),
  order: z.enum(['asc', 'desc']).default('desc'),
})

export type PaginationInput = z.infer<typeof paginationSchema>

/**
 * Common response wrapper for paginated data
 */
export const paginatedResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    data: z.array(dataSchema),
    pagination: z.object({
      page: z.number(),
      limit: z.number(),
      total: z.number(),
      totalPages: z.number(),
      hasNext: z.boolean(),
      hasPrev: z.boolean(),
    }),
  })

/**
 * Common ID parameter schema
 */
export const idSchema = z.object({
  id: z.union([z.string(), z.number()]).transform(val => 
    typeof val === 'string' ? parseInt(val, 10) : val
  ),
})

/**
 * Common success response schema
 */
export const successResponseSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
})

/**
 * Common error schema
 */
export const errorSchema = z.object({
  code: z.string(),
  message: z.string(),
  details: z.any().optional(),
})

/**
 * Helper to create a procedure with common metadata
 */
export function createProcedureWithMeta(meta: {
  description?: string
  summary?: string
  tags?: string[]
}) {
  return {
    meta: {
      description: meta.description,
      summary: meta.summary,
      tags: meta.tags,
      openapi: {
        summary: meta.summary || meta.description,
        description: meta.description,
        tags: meta.tags,
      },
    },
  }
}

/**
 * Utility to generate router metadata
 */
export function createRouterMeta(name: string, description?: string) {
  return {
    name,
    description,
    tag: name,
  }
}

// Re-export other utilities
export * from './context'
export * from './routers'
