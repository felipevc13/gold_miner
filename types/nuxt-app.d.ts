// Type definitions for Nuxt 3 app
declare module '#app' {
  interface NuxtApp {
    $supabase: any;
  }

  // Global middleware type
  function defineNuxtRouteMiddleware(
    middleware: (to: any, from: any) => Promise<void> | void
  );

  // Navigation helper
  function navigateTo(route: string, options?: { replace?: boolean }): Promise<void>;
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $supabase: any;
  }
}

// Type definitions for auto-imports
declare module '#imports' {
  export * from 'vue';
  export * from 'vue-router';
  export * from '@nuxt/kit';
  export * from '@nuxt/schema';
  
  // Supabase
  export function useSupabaseClient(): any;
  export function useSupabaseUser(): any;
  
  // Nuxt composables
  export function useNuxtApp(): any;
  export function useRuntimeConfig(): any;
  export function useRoute(): any;
  export function useRouter(): any;
  export function useHead(meta: any): void;
  export function useSeoMeta(meta: any): void;
  
  // Other common composables
  export function ref<T>(value: T): { value: T };
  export function reactive<T extends object>(target: T): T;
  export function computed<T>(getter: () => T): { readonly value: T };
  export function watch<T>(source: () => T, callback: (newValue: T, oldValue: T) => void): () => void;
}
