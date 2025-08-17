<template>
  <div class="min-h-screen bg-[#18181B] text-white">
    <LandingHeader />
    <main class="w-full mx-auto px-4 py-10">
      <HeroSection
        headline="Pare de procurar por ideias. Comece a minerar ouro."
        subheadline="O Gold Miner é um framework visual que usa IA para descobrir nichos de mercado promissores, validar a demanda e gerar sua primeira landing page. Tudo em menos de uma hora."
        ctaText="Encontre sua ideia de ouro de graça"
      />
      <FeaturesSection :features="productFeatures" />
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

const productFeatures: Feature[] = [
  {
    title: "Análise de Mercado",
    description:
      "Identifique oportunidades de mercado com base em dados reais de busca e concorrência.",
    icon: "📊",
  },
  {
    title: "Validação de Ideias",
    description:
      "Teste a viabilidade do seu negócio antes de investir tempo e dinheiro.",
    icon: "✅",
  },
  {
    title: "Geração de Conteúdo",
    description:
      "Crie conteúdo otimizado para seu público-alvo com a ajuda de IA.",
    icon: "✍️",
  },
];

// Page metadata
definePageMeta({
  layout: "default",
});
</script>
