<template>
  <div class="min-h-screen bg-[#17171C] text-white">
    <LandingHeader />
    <main class="w-full mx-auto">
      <HeroSection />
    </main>
  </div>
</template>

<script setup lang="ts">
// Define features data with TypeScript type
interface Feature {
  title: string;
  description: string;
  icon?: string;
}

// Page metadata
definePageMeta({
  layout: "default",
});
</script>
