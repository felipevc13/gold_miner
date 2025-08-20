// nuxt-app/types/nuxt-tailwindcss.d.ts
declare module "nuxt/schema" {
  interface NuxtConfig {
    tailwindcss?: {
      viewer?: boolean;
      cssPath?: string | false;
      configPath?: string;
      exposeConfig?: boolean;
      editorSupport?: boolean;
      // permite chaves extras do módulo
    } & Record<string, any>;
  }
  interface NuxtOptions extends NuxtConfig {}
}
export {};
