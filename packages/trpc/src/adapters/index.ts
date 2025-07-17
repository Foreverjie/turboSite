/**
 * Database and Authentication adapters
 * These provide a consistent interface for data access across different environments
 */

import { User } from '@supabase/supabase-js'
import { TRPCError } from '@trpc/server'

/**
 * Authentication adapter interface
 */
export interface AuthAdapter {
  getUser(): Promise<User | null>
  signUp(email: string, password: string, metadata?: Record<string, any>): Promise<User>
  signIn(email: string, password: string): Promise<User>
  signOut(): Promise<void>
  updateUser(data: Partial<User>): Promise<User>
  sendOtp(email: string): Promise<void>
  verifyOtp(email: string, token: string): Promise<User>
}

/**
 * Database adapter interface
 */
export interface DatabaseAdapter {
  // User operations
  users: {
    findMany(args?: any): Promise<any[]>
    findUnique(args: any): Promise<any>
    create(args: any): Promise<any>
    update(args: any): Promise<any>
    delete(args: any): Promise<any>
  }
  
  // Post operations
  posts: {
    findMany(args?: any): Promise<any[]>
    findUnique(args: any): Promise<any>
    create(args: any): Promise<any>
    update(args: any): Promise<any>
    delete(args: any): Promise<any>
  }
  
  // Cat operations
  cats: {
    findMany(args?: any): Promise<any[]>
    findUnique(args: any): Promise<any>
    create(args: any): Promise<any>
    update(args: any): Promise<any>
    delete(args: any): Promise<any>
  }
  
  // Generic query interface
  query: (sql: string, params?: any[]) => Promise<any>
  
  // Raw Prisma client access (if needed)
  $raw?: any
}

/**
 * Base context interface that includes adapters
 */
export interface AdapterContext {
  auth: AuthAdapter
  db: DatabaseAdapter
  user?: User | null
  [key: string]: any
}

/**
 * Factory function type for creating adapters
 */
export type AdapterFactory = {
  createAuthAdapter: (context?: any) => AuthAdapter
  createDatabaseAdapter: (context?: any) => DatabaseAdapter
}

/**
 * Default auth adapter that throws not implemented errors
 */
export class DefaultAuthAdapter implements AuthAdapter {
  async getUser(): Promise<User | null> {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED', message: 'Auth adapter not implemented' })
  }

  async signUp(email: string, password: string, metadata?: Record<string, any>): Promise<User> {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED', message: 'Auth adapter not implemented' })
  }

  async signIn(email: string, password: string): Promise<User> {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED', message: 'Auth adapter not implemented' })
  }

  async signOut(): Promise<void> {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED', message: 'Auth adapter not implemented' })
  }

  async updateUser(data: Partial<User>): Promise<User> {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED', message: 'Auth adapter not implemented' })
  }

  async sendOtp(email: string): Promise<void> {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED', message: 'Auth adapter not implemented' })
  }

  async verifyOtp(email: string, token: string): Promise<User> {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED', message: 'Auth adapter not implemented' })
  }
}

/**
 * Default database adapter
 */
export class DefaultDatabaseAdapter implements DatabaseAdapter {
  [key: string]: any
}
