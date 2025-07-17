import type { Config } from 'drizzle-kit'

export interface DrizzleConfig {
  schema: string
  out: string
  dialect: 'postgresql' | 'mysql' | 'sqlite'
  dbCredentials: {
    url: string
  }
  casing?: 'snake_case' | 'camelCase'
}

export function createDrizzleConfig(config: Partial<DrizzleConfig> = {}): Config {
  const defaultConfig: DrizzleConfig = {
    schema: './database/schema.ts',
    out: './database/migrations',
    dialect: 'postgresql',
    dbCredentials: { 
      url: process.env.POSTGRES_URL || ''
    },
    casing: 'snake_case',
  }

  return {
    ...defaultConfig,
    ...config,
    dbCredentials: {
      ...defaultConfig.dbCredentials,
      ...config.dbCredentials,
    }
  } satisfies Config
}

export function createWebDrizzleConfig(): Config {
  if (!process.env.POSTGRES_URL) {
    throw new Error('Missing POSTGRES_URL')
  }

  const nonPoolingUrl = process.env.POSTGRES_URL.replace(':6543', ':5432')

  return createDrizzleConfig({
    dbCredentials: { url: nonPoolingUrl }
  })
}

export default createWebDrizzleConfig()
