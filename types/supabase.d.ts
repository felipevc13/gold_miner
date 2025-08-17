import type { SupabaseClient } from '@supabase/supabase-js'

type Tables = {
  // Define your database tables here
  // Example:
  // todos: {
  //   Row: { id: string; created_at: string; title: string; completed: boolean }
  //   Insert: { id?: string; created_at?: string; title: string; completed?: boolean }
  //   Update: { id?: string; created_at?: string; title?: string; completed?: boolean }
  // }
}

type Database = Tables

declare module '#app' {
  interface NuxtApp {
    $supabase: SupabaseClient<Database>
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $supabase: SupabaseClient<Database>
  }
}

export {}
