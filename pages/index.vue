<template>
  <div class="min-h-screen bg-[#0D0D12] text-white">
    <LandingHeader />
    <main class="w-full mx-auto pt-20">
      <HeroSection />
      <PainPointsSection />
      <ValuePropositionSection />
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
