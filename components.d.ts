// Type definitions for Vue components
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// Component type declarations
declare module '#app' {
  interface NuxtApp {
    // App-level types
  }
  
  interface PageMeta {
    layout?: string
  }
}

// Global component types
declare module 'vue' {
  interface GlobalComponents {
    LandingHeader: typeof import('./components/landing/LandingHeader.vue')['default']
    HeroSection: typeof import('./components/landing/HeroSection.vue')['default']
    FeaturesSection: typeof import('./components/landing/FeaturesSection.vue')['default']
  }
}

// Type declarations for Nuxt auto-imports
declare module '#imports' {
  export const useSeoMeta: typeof import('@unhead/vue')['useSeoMeta']
  export const ref: typeof import('vue')['ref']
}

declare module '#app' {
  interface PageMeta {
    layout?: string
  }
  
  function definePageMeta(meta: PageMeta): void
}

export {}
