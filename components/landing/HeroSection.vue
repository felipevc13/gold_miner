<template>
  <section class="relative w-full min-h-screen bg-[#0D0D12] overflow-hidden flex flex-col font-sans">
    <div class="flex-1 flex flex-col">
      <div class="relative max-w-[1200px] mx-auto w-full flex-1 flex flex-col px-4 py-20">
        <!-- Main Content -->
        <div class="w-full max-w-[1200px] flex flex-col items-center gap-8 z-10">
          <!-- Headline -->
          <h1 
            class="text-5xl md:text-7xl font-bold text-white text-center leading-[72px] max-w-[1200px]"
            v-html="
              headline ||
              'A programação é a parte<br><span class=\'text-[#8E6CE4]\'>mais fácil</span>.<br>O problema é <span class=\'text-[#8E6CE4]\'>vender</span>.'
            "
          ></h1>

          <!-- Subheadline -->
          <p
            class="text-xl md:text-2xl text-[#A6A6A6] text-center max-w-[1200px] leading-8"
          >
            {{
              subheadline ||
              "Gold Miner é a plataforma de IA que transforma sua habilidade técnica no seu próximo SaaS de sucesso. Guiamos você desde a descoberta de um nicho lucrativo até a validação da ideia, usando dados reais de dores de clientes."
            }}
          </p>

          <!-- CTA Button -->
          <Button
            to="/register"
            class="h-[40px] flex items-center justify-center text-base font-semibold mt-4"
          >
            {{
              ctaText || "Participe da Criação e Garanta seu Acesso Antecipado"
            }}
          </Button>
        </div>
      </div>

      <!-- Dashboard Preview Image -->
      <div class="w-full mt-auto flex justify-center">
        <div class="w-full max-w-[1024px]">
          <img 
            src="~/assets/images/ui.svg" 
            alt="Gold Miner Dashboard Preview" 
            class="w-full h-auto"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Button from "~/components/ui/Button.vue";

defineProps<{
  headline?: string;
  subheadline?: string;
  ctaText?: string;
}>();
</script>
