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
    $hello(msg: string): string
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $supabase: any; // You can replace 'any' with your Supabase client type
    $hello: (msg: string) => string
  }
}

// Add type for modal debug logs
interface ModalDebugLog {
  time: string;
  message: string;
  data: any[];
}

declare global {
  interface Window {
    __modalDebugLogs?: ModalDebugLog[];
  }
  const defineNuxtRouteMiddleware: typeof import('nuxt/app')['defineNuxtRouteMiddleware'];
  const navigateTo: typeof import('nuxt/app')['navigateTo'];
  const useSupabaseClient: () => any; // Replace 'any' with your Supabase client type
  const useSupabaseUser: () => Ref<User | null>;
}
