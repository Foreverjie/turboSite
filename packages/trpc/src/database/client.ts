import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import * as schema from './schema'

export interface DatabaseConfig {
  url: string
  schema?: any
}

export function createDrizzleClient(config: DatabaseConfig) {
  if (!config.url) {
    throw new Error('Database URL is required')
  }
  
  const client = postgres(config.url)
  return drizzle({ 
    client, 
    schema: config.schema || schema 
  })
}

export function createDefaultDrizzleClient() {
  if (!process.env.POSTGRES_URL) {
    throw new Error('POSTGRES_URL environment variable is not set')
  }
  
  return createDrizzleClient({
    url: process.env.POSTGRES_URL,
    schema
  })
}

export const db = createDefaultDrizzleClient()

export * from './schema'
