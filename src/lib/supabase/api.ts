import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { Database } from './database.types'

/**
 * Creates a Supabase client for API routes that accepts Bearer tokens
 * Use this for testing with Postman/external API calls
 */
export function createClientWithAuth(authToken?: string) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  // If auth token is provided, use it
  if (authToken) {
    return createSupabaseClient<Database>(supabaseUrl, supabaseKey, {
      global: {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    })
  }

  // Otherwise, use anonymous client
  return createSupabaseClient<Database>(supabaseUrl, supabaseKey)
}

/**
 * Extract bearer token from request headers
 */
export function getBearerToken(request: Request): string | null {
  const authHeader = request.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }
  return authHeader.substring(7) // Remove 'Bearer ' prefix
}
