import { defineNuxtPlugin } from "#imports";

// This plugin is intentionally left empty as we're using @nuxtjs/supabase module
// which provides the Supabase client automatically
// This prevents duplicate Supabase client initialization

export default defineNuxtPlugin(() => {
  // The @nuxtjs/supabase module automatically provides $supabase
  // No need to create another instance here
});
