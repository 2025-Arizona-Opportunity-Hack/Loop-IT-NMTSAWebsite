import { createBrowserClient } from '@supabase/ssr'
import { Database } from './database.types'

/**
 * Creates a Supabase client for use in Client Components
 * This client automatically handles cookie management
 */
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
