<template>
  <section
    id="pain-points"
    aria-labelledby="pain-points-title"
    class="w-full bg-[#0f0f13]"
  >
    <div
      class="w-full max-w-[1200px] mx-auto px-6 md:px-8 lg:px-10 py-16 md:py-24"
    >
      <!-- Heading -->
      <header class="text-center mb-12 md:mb-16">
        <h2
          id="pain-points-title"
          class="text-3xl md:text-5xl font-extrabold tracking-tight text-white"
        >
          Parece
          <span
            class="bg-clip-text text-transparent bg-gradient-to-r from-[#a78bfa] to-[#8b5cf6]"
          >
            familiar?
          </span>
        </h2>
      </header>

      <!-- Cards -->
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
      >
        <!-- Card 1 -->
        <article
          class="rounded-2xl bg-[#17171d] border border-[#24242c] shadow-xl/20 shadow-black/30 p-6 md:p-7"
        >
          <div
            class="w-12 h-12 rounded-full bg-[#231f33] flex items-center justify-center mb-4"
          >
            <Cemiterio class="w-12 h-12" />
          </div>
          <h3 class="text-lg md:text-xl font-semibold text-white mb-3">
            O Cemitério de Ideias
          </h3>
          <p class="text-sm leading-6 text-[#b9b9c6]">
            Você tem dezenas de projetos no GitHub que nunca saíram do
            <code class="px-1 py-0.5 rounded bg-black/30 text-[#cfcfe8]"
              >localhost</code
            >. A paralisia por análise te impede de escolher uma ideia e o medo
            de "construir algo que já existe" te faz desistir antes mesmo de
            começar. A sensação é que todo dia surgem 50 novos projetos no
            Product Hunt e você ficou para trás.
          </p>
        </article>

        <!-- Card 2 -->
        <article
          class="rounded-2xl bg-[#17171d] border border-[#24242c] shadow-xl/20 shadow-black/30 p-6 md:p-7"
        >
          <div
            class="w-12 h-12 rounded-full bg-[#231f33] flex items-center justify-center text-[#a78bfa] mb-4"
          >
            <Marketing class="w-12 h-12" />
          </div>
          <h3 class="text-lg md:text-xl font-semibold text-white mb-3">
            O Abismo do Marketing
          </h3>
          <p class="text-sm leading-6 text-[#b9b9c6]">
            Você constrói um MVP robusto, mas na hora de criar uma landing page,
            escrever um post ou encontrar os primeiros clientes, você trava.
            Marketing e vendas parecem um universo à parte, e você se sente
            esgotado por ter que ser programador, copywriter e estrategista ao
            mesmo tempo.
          </p>
        </article>

        <!-- Card 3 -->
        <article
          class="rounded-2xl bg-[#17171d] border border-[#24242c] shadow-xl/20 shadow-black/30 p-6 md:p-7"
        >
          <div
            class="w-12 h-12 rounded-full bg-[#231f33] flex items-center justify-center text-[#a78bfa] mb-4"
          >
            <Vazio class="w-12 h-12" />
          </div>
          <h3 class="text-lg md:text-xl font-semibold text-white mb-3">
            Lançamento no Vazio
          </h3>
          <p class="text-sm leading-6 text-[#b9b9c6]">
            Você passa meses construindo um SaaS que parece genial, lança com
            orgulho e... silêncio. A dura verdade é que você construiu uma
            solução incrível para um problema que ninguém tinha, porque a
            validação foi baseada em intuição, não em dados de clientes reais.
          </p>
        </article>
      </div>

      <!-- Callout -->
      <div class="mt-10 md:mt-14">
        <div
          class="rounded-2xl bg-[#1a1a22] border border-[#2a2a34] shadow-xl/20 shadow-black/30 p-6 md:p-8 text-center"
        >
          <h4 class="text-white text-xl md:text-2xl font-extrabold mb-2">
            O problema nunca foi sua capacidade técnica. É o ponto de partida.
          </h4>
          <p class="text-sm md:text-base text-[#b9b9c6]">
            Tentar "ter uma ideia" do nada é o caminho mais rápido para o
            fracasso. Os melhores negócios não nascem de ideias geniais, mas da
            solução de
            <span class="text-[#a78bfa]">dores profundas e urgentes</span>.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Cemiterio from "~/components/icon/Cemiterio.vue";
import Marketing from "~/components/icon/Marketing.vue";
import Vazio from "~/components/icon/Vazio.vue";
// Componente de apresentação simples, sem props por enquanto.
</script>
