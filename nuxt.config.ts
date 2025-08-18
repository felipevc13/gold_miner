// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  // TypeScript configuration
  typescript: {
    strict: true,
    typeCheck: true,
    tsConfig: {
      compilerOptions: {
        // Enable Vue 3 composition API reactivity transform
        jsx: 'preserve',
        // Improve type checking for Vue components
        jsxImportSource: 'vue',
        // Enable strictest type checking
        strict: true,
        // Better support for Vue's reactivity system
        skipLibCheck: true,
        // Support for modern JavaScript features
        target: 'ESNext',
        module: 'ESNext',
        moduleResolution: 'node',
        // Support for path aliases
        baseUrl: '.',
        paths: {
          '~/*': ['./*']
        },
        // Type checking for Vue files
        types: [
          '@nuxt/types',
          '@pinia/nuxt',
          '@vue/runtime-dom',
          '@vue/compiler-sfc',
          'vite/client'
        ]
      },
      include: [
        '**/*.ts',
        '**/*.d.ts',
        '**/*.tsx',
        '**/*.vue'
      ]
    }
  },
  
  // Core configuration
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  srcDir: ".",
  
  // Build configuration
  build: {
    transpile: ["@vue-flow/core"],
  },
  
  // Global CSS
  css: [
    '~/assets/css/tailwind.css'
  ],

  // Modules
  modules: [
    "@nuxtjs/supabase", 
    "@vueuse/nuxt", 
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss"
  ],
  
  // Tailwind CSS configuration
  // @ts-ignore - Tailwind types will be available after module is loaded
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config',
    exposeConfig: false,
    injectPosition: 0,
    viewer: true,
  } as any,


  // Supabase module configuration
  // @ts-ignore - Supabase types are not properly recognized
  supabase: {
    // Use environment variables directly
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_ANON_KEY,
    
    // Disable built-in redirects
    redirect: false,
    
    // Client options
    clientOptions: {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    }
  },

  // TypeScript configuration is now at the top of the file

  // Components configuration
  components: ["~/components", "~/components/landing"],

  // Auto-imports
  imports: {
    autoImport: true,
  },

  // Vite configuration
  vite: {
    vue: {
      script: {
        defineModel: true,
        propsDestructure: true,
      },
    },
    plugins: [
      {
        name: "disable-vue-tsc",
        config: () => ({
          build: {
            rollupOptions: {
              external: ["vite-plugin-checker"],
            },
          },
        }),
      },
    ],
  },

  // Runtime config
  runtimeConfig: {
    public: {
      // Will be available on both server and client
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
      supabaseUrl: process.env.SUPABASE_URL || '',
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY || ''
    }
  },
});