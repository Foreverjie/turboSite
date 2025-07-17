/**
 * Web application specific adapter that integrates with existing Supabase setup
 */

import { SupabaseAuthAdapter, SupabaseAuthAdapterConfig } from './supabase'
import { DefaultDatabaseAdapter, AdapterContext } from './index'

/**
 * Create context factory for web application
 */
export async function createWebContext(baseContext: any = {}): Promise<AdapterContext> {
  const adapters = await createWebAdapters()
  
  // Get current user
  let user = null
  try {
    user = await adapters.auth.getUser()
  } catch (error) {
    // User not authenticated, which is fine for public procedures
    console.debug('User not authenticated:', error)
  }

  return {
    ...baseContext,
    ...adapters,
    user,
  }
}
