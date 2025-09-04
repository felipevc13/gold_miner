<template>
  <section
    id="value-proposition"
    aria-labelledby="value-proposition-title"
    class="w-full bg-[#1C1C21]"
  >
    <div
      class="w-full max-w-[1200px] mx-auto px-6 md:px-8 lg:px-10 py-16 md:py-24"
    >
      <!-- Heading -->
      <header class="text-center mb-12 md:mb-16">
        <h2
          id="value-proposition-title"
          class="text-3xl md:text-5xl font-extrabold tracking-tight text-white"
        >
          Imagine lançar seu próximo SaaS com
          <span
            class="bg-clip-text text-transparent bg-gradient-to-r from-[#a78bfa] to-[#8b5cf6]"
          >
            total confiança.</span
          >
        </h2>
      </header>

      <!-- Benefits -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Benefit 1 -->
        <article class="text-center px-2">
          <div
            class="mx-auto mb-5 w-12 h-12 rounded-full bg-[#231f33] text-[#a78bfa] flex items-center justify-center"
          >
            <img
              :src="aim"
              alt="Ícone de mira"
              class="w-12 h-12"
              aria-hidden="true"
              @error="handleImageError"
            />
          </div>
          <h3 class="text-lg md:text-xl font-semibold text-white mb-3">
            Clareza Estratégica Absoluta
          </h3>
          <p class="text-sm leading-6 text-[#b9b9c6] max-w-[320px] mx-auto">
            Você não apenas sabe <em>o que</em> construir, mas
            <em>por que</em> e <em>para quem</em>. Cada feature do seu MVP é
            justificada por uma dor real extraída de conversas públicas. Zero
            desperdício de código.
          </p>
        </article>

        <!-- Benefit 2 -->
        <article class="text-center px-2">
          <div
            class="mx-auto mb-5 w-12 h-12 rounded-full bg-[#231f33] text-[#a78bfa] flex items-center justify-center"
          >
            <img
              :src="code"
              alt="Ícone de código"
              class="w-12 h-12"
              aria-hidden="true"
              @error="handleImageError"
            />
          </div>
          <h3 class="text-lg md:text-xl font-semibold text-white mb-3">
            Foco no que Você Ama
          </h3>
          <p class="text-sm leading-6 text-[#b9b9c6] max-w-[320px] mx-auto">
            Dedique 90% do seu tempo ao que você faz de melhor: codificar e
            construir um produto incrível. Pesquisa de mercado, análise de dores
            e estratégia de lançamento: já vêm desenhadas pela IA.
          </p>
        </article>

        <!-- Benefit 3 -->
        <article class="text-center px-2">
          <div
            class="mx-auto mb-5 w-12 h-12 rounded-full bg-[#231f33] text-[#a78bfa] flex items-center justify-center"
          >
            <img
              :src="launch"
              alt="Ícone de foguete"
              class="w-12 h-12"
              aria-hidden="true"
              @error="handleImageError"
            />
          </div>
          <h3 class="text-lg md:text-xl font-semibold text-white mb-3">
            Lançamento em Dias, Não Meses
          </h3>
          <p class="text-sm leading-6 text-[#b9b9c6] max-w-[320px] mx-auto">
            Em vez de meses de incerteza, você vai da ideia a uma landing page
            de alta conversão em poucos dias — com a certeza de que está
            construindo algo que o mercado realmente precisa.
          </p>
        </article>
      </div>

      <!-- Callout with glow -->
      <div class="mt-12 md:mt-16">
        <div class="relative">
          <div
            class="absolute inset-0 rounded-2xl blur-2xl bg-gradient-to-r from-[#7c3aed33] via-[#8b5cf633] to-[#7c3aed33]"
          ></div>
          <div
            class="relative rounded-2xl bg-[#17171d] border border-[#292935] p-6 md:p-10 text-center"
          >
            <h4 class="text-white text-2xl md:text-3xl font-extrabold mb-3">
              Chega de "build and pray"
            </h4>
            <p class="text-[#b9b9c6] max-w-[780px] mx-auto mb-3">
              A nova forma de empreender para desenvolvedores é
            </p>
            <p
              class="text-2xl md:text-[28px] font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#a78bfa] to-[#8b5cf6] mb-3"
            >
              "Listen, Validate, then Build"
            </p>
            <p class="text-[#b9b9c6] max-w-[780px] mx-auto">
              Gold Miner automatiza as duas primeiras e mais arriscadas etapas
              para você.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Image paths
const aim = '/images/aim.svg';
const code = '/images/code.svg';
const launch = '/images/launch.svg';
// Componente de apresentação sem props por enquanto
</script>
