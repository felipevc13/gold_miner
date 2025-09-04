<template>
  <div class="min-h-screen bg-[#0D0D12] text-white">
    <!-- <LandingHeader /> -->
    <main class="w-full mx-auto pt-20">
      <div class="flex items-center w-full justify-center gap-2">
        <!-- Substitua pelo componente/logo real caso exista -->
        <Logo class="h-14" />
      </div>
      <HeroSection />
      <PainPointsSection />
      <ValuePropositionSection />
      <HowItWorksSection />
    </main>
  </div>
</template>

<script setup lang="ts">
// Usando require para garantir que o caminho seja resolvido corretamente

import Logo from "~/components/icon/Logo.vue";

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
