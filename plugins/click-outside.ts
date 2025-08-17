// @ts-nocheck
import type { NuxtApp } from 'nuxt/app';
import vClickOutside from 'v-click-outside';

export default defineNuxtPlugin((nuxtApp: NuxtApp) => {
  nuxtApp.vueApp.use(vClickOutside);
});
