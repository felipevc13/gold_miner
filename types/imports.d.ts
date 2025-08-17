// Type definitions for Nuxt auto-imports
declare module '#imports' {
  export * from '@nuxt/schema';
  export * from 'nuxt/app';
  export * from 'vue';
  export * from 'vue-router';
  export * from '#app';
  
  // Add Supabase client type
  export function useSupabaseClient(): any;
}

declare module '#app' {
  // Add navigateTo type
  export function navigateTo(route: string): Promise<void>;
  
  // Add defineNuxtRouteMiddleware type
  export function defineNuxtRouteMiddleware(middleware: (to: any, from: any) => any): any;
  interface NuxtApp {
    $supabase: any;
  }
}
