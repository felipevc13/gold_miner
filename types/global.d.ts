// Global type definitions for your project

// Type for the user from Supabase Auth
type User = {
  id: string;
  email?: string;
  // Add other user properties as needed
};

declare module '#app' {
  interface NuxtApp {
    $supabase: any; // You can replace 'any' with your Supabase client type
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $supabase: any; // You can replace 'any' with your Supabase client type
  }
}

// This tells TypeScript about the auto-imported functions
declare global {
  const defineNuxtRouteMiddleware: typeof import('nuxt/app')['defineNuxtRouteMiddleware'];
  const navigateTo: typeof import('nuxt/app')['navigateTo'];
  const useSupabaseClient: () => any; // Replace 'any' with your Supabase client type
  const useSupabaseUser: () => Ref<User | null>;
}
