// Type definitions for components
declare module '#components' {
  const LandingHeader: typeof import('../components/landing/LandingHeader.vue')['default']
  const HeroSection: typeof import('../components/landing/HeroSection.vue')['default']
  const FeaturesSection: typeof import('../components/landing/FeaturesSection.vue')['default']
  
  export {
    LandingHeader,
    HeroSection,
    FeaturesSection
  }
}

// Global component types
declare module 'vue' {
  interface GlobalComponents {
    LandingHeader: typeof import('../components/landing/LandingHeader.vue')['default']
    HeroSection: typeof import('../components/landing/HeroSection.vue')['default']
    FeaturesSection: typeof import('../components/landing/FeaturesSection.vue')['default']
  }
}

export {}
