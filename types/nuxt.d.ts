import type { SupabaseClient, User } from '@supabase/supabase-js';
import type { Config } from 'tailwindcss';
import type { H3Event } from 'h3';
import type { RouteLocationNormalized } from 'vue-router';

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
  
  // Add global middleware types
  function defineNuxtRouteMiddleware(
    middleware: (to: RouteLocationNormalized, from: RouteLocationNormalized) => Promise<void> | void
  ): void
  
  function navigateTo(
    to: string,
    options?: { replace?: boolean; redirectCode?: number }
  ): Promise<void> | void
  
  function useSupabaseClient(): SupabaseClient<Database>
  function useSupabaseUser(): any // Adjust the type according to your user type
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $supabase: SupabaseClient<Database>
  }
}

// Extend Nuxt configuration with Tailwind CSS module
declare module 'nuxt/schema' {
  interface NuxtConfig {
    tailwindcss?: {
      config?: Partial<Config>
      cssPath?: string
      configPath?: string
      exposeConfig?: boolean
      injectPosition?: number
      viewer?: boolean
    }
  }
}

// This is needed for the $tailwind property
declare module '@nuxt/schema' {
  interface NuxtConfig {
    tailwindcss?: {
      config?: Partial<Config>
      cssPath?: string
      configPath?: string
      exposeConfig?: boolean
      injectPosition?: number
      viewer?: boolean
    }
  }
}

// Type definitions for Nuxt auto-imports
declare global {
  // Nuxt auto-imports
  const definePageMeta: typeof import('nuxt/app')['definePageMeta']
  const useHead: typeof import('@unhead/vue')['useHead']
  const useSeoMeta: typeof import('@unhead/vue')['useSeoMeta']
  const useNuxtApp: typeof import('nuxt/app')['useNuxtApp']
  const ref: typeof import('vue')['ref']
  const computed: typeof import('vue')['computed']
  const onMounted: typeof import('vue')['onMounted']
  const onUnmounted: typeof import('vue')['onUnmounted']
  const watch: typeof import('vue')['watch']
  const useRouter: typeof import('vue-router')['useRouter']
  const useRoute: typeof import('vue-router')['useRoute']
  
  // Supabase
  const useSupabaseClient: () => SupabaseClient<Database>
  const useSupabaseUser: () => any // You can type this more specifically if needed
}

export {}
