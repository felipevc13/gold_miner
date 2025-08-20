import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // TypeScript configuration
  typescript: {
    strict: true,
    typeCheck: "build",
    shim: false, // Disable shim as we're using takeOver mode
    tsConfig: {
      compilerOptions: {
        target: "ESNext",
        module: "ESNext",
        moduleResolution: "bundler",
        strict: true,
        jsx: "preserve",
        sourceMap: true,
        resolveJsonModule: true,
        isolatedModules: true,
        esModuleInterop: true,
        lib: ["ESNext", "DOM", "DOM.Iterable"],
        skipLibCheck: true,
        noEmit: true,
        baseUrl: ".",
        paths: {
          "~/*": ["./*"],
          "@/*": ["./*"],
        },
        types: ["@pinia/nuxt", "vite/client", "vue", "nuxt/schema"],
      },
      include: [
        "**/*.ts",
        "**/*.d.ts",
        "**/*.tsx",
        "**/*.vue",
        ".nuxt/types/**/*.ts",
        "types/**/*.d.ts",
        "types/**/*.ts",
        "composables/**/*",
        "utils/**/*",
      ],
      exclude: ["node_modules", ".nuxt", ".output", "dist"],
    },
  },

  // Vue configuration
  vue: {
    compilerOptions: {
      isCustomElement: (tag: string) => tag.startsWith("v-"),
      whitespace: "condense",
      comments: false,
    },
  },

  // Pinia configuration is handled by @pinia/nuxt module

  // Vite configuration
  vite: {
    define: {
      "process.env.DEBUG": JSON.stringify(process.env.DEBUG || "false"),
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "development"
      ),
    },
    optimizeDeps: {
      include: [
        "vue",
        "@vueuse/core",
        "pinia",
        "vue-router",
        "ofetch",
        "defu",
        "h3",
        "unhead",
      ],
    },
    server: {
      watch: {
        usePolling: true,
        interval: 100,
      },
      hmr: {
        protocol: "ws",
        host: "localhost",
        port: 3000,
        overlay: true,
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "sass:color";
            @use "sass:list";
            @use "sass:map";
            @use "sass:math";
            @use "sass:meta";
            @use "sass:selector";
            @use "sass:string";
            @use "sass:color" as *;
            @import "@/assets/styles/variables";
            @import "@/assets/styles/mixins";
          `,
        },
      },
    },
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

  // Global CSS
  css: ["~/assets/css/tailwind.css"],

  // Modules
  modules: [
    "@nuxtjs/supabase",
    "@vueuse/nuxt",
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", "storeToRefs", "acceptHMRUpdate"],
      },
    ],
    "@nuxtjs/tailwindcss",
  ],

  // Tailwind CSS configuration
  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
    configPath: "tailwind.config",
    exposeConfig: false,
    injectPosition: 0,
    viewer: true,
  },

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
        detectSessionInUrl: true,
      },
    },
  },

  // Components configuration
  components: ["~/components", "~/components/landing"],

  // Auto-imports
  imports: {
    autoImport: true,
  },

  // Runtime config
  runtimeConfig: {
    public: {
      // Will be available on both server and client
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "http://localhost:3000",
      supabaseUrl: process.env.SUPABASE_URL || "",
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY || "",
    },
  },
});
