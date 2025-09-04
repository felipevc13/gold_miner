import { defineNuxtConfig } from "nuxt/config";
import svgLoader from "vite-svg-loader";

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

  // App configuration
  app: {
    head: {
      title: "Gold Miner — Descubra Oportunidades Reais",
      titleTemplate: "%s · Gold Miner",
      htmlAttrs: { lang: "pt-BR" },
      meta: [
        { name: "charset", content: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "Encontre nichos de mercado com um Score de Oportunidade claro. Analise métricas, dores e ideias para validar sua próxima grande aposta.",
        },
        { name: "robots", content: "index,follow" },
        { name: "theme-color", content: "#0F0F12" },
        // Open Graph
        { property: "og:site_name", content: "Gold Miner" },
        { property: "og:type", content: "website" },
        { property: "og:locale", content: "pt_BR" },
        {
          property: "og:title",
          content: "Gold Miner — Descubra Oportunidades Reais",
        },
        {
          property: "og:description",
          content:
            "Encontre nichos de mercado com um Score de Oportunidade claro. Analise métricas, dores e ideias para validar sua próxima grande aposta.",
        },
        {
          property: "og:url",
          content: process.env.NUXT_PUBLIC_SITE_URL || "http://localhost:3000",
        },
        { property: "og:image", content: "/og.jpg" },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        // Twitter
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content: "Gold Miner — Descubra Oportunidades Reais",
        },
        {
          name: "twitter:description",
          content:
            "Encontre nichos de mercado com um Score de Oportunidade claro. Analise métricas, dores e ideias para validar sua próxima grande aposta.",
        },
        { name: "twitter:image", content: "/og.jpg" },
      ],
      link: [
        {
          rel: "canonical",
          href: process.env.NUXT_PUBLIC_SITE_URL || "http://localhost:3000",
        },
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      ],
    },
  },

  // Static assets configuration
  nitro: {
    static: true,
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

  // Build configuration
  build: {
    transpile: [],
  },

  // Vite configuration
  vite: {
    define: {
      "process.env.DEBUG": JSON.stringify(process.env.DEBUG || "false"),
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "development"
      ),
    },
    plugins: [
      svgLoader({ defaultImport: "url" }), // Configured to treat as URL for static <img>
    ],
    // Removed unnecessary alias for ~/public
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
  },

  // Global CSS
  css: ["~/assets/css/tailwind.css", "~/assets/css/global.css"],

  // Modules
  modules: [
    "@nuxtjs/tailwindcss",
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", "storeToRefs", "acceptHMRUpdate"],
      },
    ],
    "@nuxtjs/supabase",
    "@vueuse/nuxt",
    "@nuxtjs/google-fonts",
  ],

  // Google Fonts configuration
  googleFonts: {
    families: {
      Roboto: [300, 400, 500, 700],
      "JetBrains+Mono": [400, 600, 700],
    },
    display: "swap",
    download: true,
    inject: true,
    preload: true,
    prefetch: true,
  },

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
