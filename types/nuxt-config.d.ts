// Type definitions for Nuxt config
declare module '@nuxt/schema' {
  interface NuxtConfig {
    // Nuxt Supabase module configuration
    supabase?: {
      url?: string
      key?: string
      serviceKey?: string
      redirect?: boolean
      redirectOptions?: {
        login: string
        callback: string
        exclude?: string[]
        cookieRedirect?: boolean
      }
      cookieOptions?: {
        name?: string
        lifetime?: number
        domain?: string
        path?: string
        sameSite?: 'lax' | 'strict' | 'none'
      }
      clientOptions?: {
        auth?: {
          flowType?: 'implicit' | 'pkce'
          detectSessionInUrl?: boolean
          persistSession?: boolean
          autoRefreshToken?: boolean
        }
      }
    }
  }
}

export {}
