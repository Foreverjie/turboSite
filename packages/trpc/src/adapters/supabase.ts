/**
 * Supabase adapter for authentication
 */

import { createServerClient } from '@supabase/ssr'
import { User } from '@supabase/supabase-js'
import { TRPCError } from '@trpc/server'
import { AuthAdapter } from './index'

export interface SupabaseAuthAdapterConfig {
  supabaseUrl: string
  supabaseAnonKey: string
  cookieHandler?: {
    getAll(): { name: string; value: string; [key: string]: any }[]
    setAll(cookies: { name: string; value: string; options?: any }[]): void
  }
}

export class SupabaseAuthAdapter implements AuthAdapter {
  private client: any

  constructor(private config: SupabaseAuthAdapterConfig) {
    this.client = createServerClient(
      config.supabaseUrl,
      config.supabaseAnonKey,
      {
        cookies: config.cookieHandler ? {
          getAll() {
            return config.cookieHandler!.getAll()
          },
          setAll(cookiesToSet) {
            try {
              config.cookieHandler!.setAll(cookiesToSet)
            } catch (error) {
              console.error('Error setting cookies:', error)
            }
          },
        } : undefined,
      },
    )
  }

  async getUser(): Promise<User | null> {
    const { data, error } = await this.client.auth.getUser()
    if (error) {
      throw new TRPCError({ code: 'UNAUTHORIZED', message: error.message })
    }
    return data.user
  }

  async signUp(email: string, password: string, metadata?: Record<string, any>): Promise<User> {
    const { data, error } = await this.client.auth.signUp({
      email,
      password,
      options: { data: metadata }
    })
    if (error) {
      throw new TRPCError({ code: 'BAD_REQUEST', message: error.message })
    }
    if (!data.user) {
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to create user' })
    }
    return data.user
  }

  async signIn(email: string, password: string): Promise<User> {
    const { data, error } = await this.client.auth.signInWithPassword({
      email,
      password,
    })
    if (error) {
      throw new TRPCError({ code: 'UNAUTHORIZED', message: error.message })
    }
    if (!data.user) {
      throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid credentials' })
    }
    return data.user
  }

  async signOut(): Promise<void> {
    const { error } = await this.client.auth.signOut()
    if (error) {
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: error.message })
    }
  }

  async updateUser(userData: Partial<User>): Promise<User> {
    const { data, error } = await this.client.auth.updateUser(userData)
    if (error) {
      throw new TRPCError({ code: 'BAD_REQUEST', message: error.message })
    }
    if (!data.user) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found' })
    }
    return data.user
  }

  async sendOtp(email: string): Promise<void> {
    const { error } = await this.client.auth.signInWithOtp({ email })
    if (error) {
      throw new TRPCError({ code: 'BAD_REQUEST', message: error.message })
    }
  }

  async verifyOtp(email: string, token: string): Promise<User> {
    const { data, error } = await this.client.auth.verifyOtp({
      email,
      token,
      type: 'email'
    })
    if (error) {
      throw new TRPCError({ code: 'UNAUTHORIZED', message: error.message })
    }
    if (!data.user) {
      throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid OTP' })
    }
    return data.user
  }
}
