import { createClient as createBrowserClient } from '@/utils/supabase/client'

// For server-side usage, we'll create the client dynamically
export function getSupabaseClient() {
  if (typeof window !== 'undefined') {
    // Client-side
    return createBrowserClient()
  } else {
    // Server-side - use direct client creation
    const { createClient } = require('@supabase/supabase-js')
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase environment variables')
    }
    
    return createClient(supabaseUrl, supabaseKey)
  }
}

export const supabase = getSupabaseClient()

// Database types
export interface WaitlistEntry {
  id?: number
  email: string
  created_at?: string
  source?: string
  user_agent?: string
}
