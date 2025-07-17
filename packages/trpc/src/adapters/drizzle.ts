import { DrizzleAdapter } from 'drizzle-orm'
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import { DatabaseAdapter } from './index'
import { createDrizzleClient, DatabaseConfig } from '../database'
import * as schema from '../database/schema'

/**
 * Drizzle database adapter implementation
 */
export class DrizzleDatabaseAdapter implements DatabaseAdapter {
  private db: PostgresJsDatabase<typeof schema>

  constructor(config?: DatabaseConfig) {
    this.db = config ? createDrizzleClient(config) : createDrizzleClient({
      url: process.env.POSTGRES_URL || '',
      schema
    })
  }

  users = {
    findMany: async (args?: any) => {
      return this.db.query.usersTable.findMany(args)
    },
    findUnique: async (args: any) => {
      return this.db.query.usersTable.findFirst(args)
    },
    create: async (args: any) => {
      const [result] = await this.db.insert(schema.usersTable).values(args.data).returning()
      return result
    },
    update: async (args: any) => {
      const [result] = await this.db
        .update(schema.usersTable)
        .set(args.data)
        .where(args.where)
        .returning()
      return result
    },
    delete: async (args: any) => {
      const [result] = await this.db
        .delete(schema.usersTable)
        .where(args.where)
        .returning()
      return result
    }
  }

  posts = {
    findMany: async (args?: any) => {
      // Add post table operations when schema is available
      throw new Error('Posts not implemented in current schema')
    },
    findUnique: async (args: any) => {
      throw new Error('Posts not implemented in current schema')
    },
    create: async (args: any) => {
      throw new Error('Posts not implemented in current schema')
    },
    update: async (args: any) => {
      throw new Error('Posts not implemented in current schema')
    },
    delete: async (args: any) => {
      throw new Error('Posts not implemented in current schema')
    }
  }

  cats = {
    findMany: async (args?: any) => {
      // Add cat table operations when schema is available
      throw new Error('Cats not implemented in current schema')
    },
    findUnique: async (args: any) => {
      throw new Error('Cats not implemented in current schema')
    },
    create: async (args: any) => {
      throw new Error('Cats not implemented in current schema')
    },
    update: async (args: any) => {
      throw new Error('Cats not implemented in current schema')
    },
    delete: async (args: any) => {
      throw new Error('Cats not implemented in current schema')
    }
  }

  rssItems = {
    findMany: async (args?: any) => {
      return this.db.query.rssItemsTable.findMany(args)
    },
    findUnique: async (args: any) => {
      return this.db.query.rssItemsTable.findFirst(args)
    },
    create: async (args: any) => {
      const [result] = await this.db.insert(schema.rssItemsTable).values(args.data).returning()
      return result
    },
    update: async (args: any) => {
      const [result] = await this.db
        .update(schema.rssItemsTable)
        .set(args.data)
        .where(args.where)
        .returning()
      return result
    },
    delete: async (args: any) => {
      const [result] = await this.db
        .delete(schema.rssItemsTable)
        .where(args.where)
        .returning()
      return result
    }
  }

  async query(sql: string, params?: any[]) {
    return this.db.execute(sql)
  }

  get $raw() {
    return this.db
  }
}

/**
 * Factory function to create a Drizzle database adapter
 */
export function createDrizzleDatabaseAdapter(config?: DatabaseConfig): DrizzleDatabaseAdapter {
  return new DrizzleDatabaseAdapter(config)
}
