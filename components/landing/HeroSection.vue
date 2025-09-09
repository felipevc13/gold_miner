<template>
  <section
    class="relative w-full md:min-h-screen bg-[#0D0D12] overflow-hidden flex flex-col font-sans"
  >
    <div class="flex flex-col md:flex-1">
      <div
        class="relative max-w-[1200px] mx-auto w-full flex flex-col md:flex-1 px-4 sm:px-6 md:px-8 lg:px-10 pt-20 md:pt-24 pb-10 md:pb-16"
      >
        <!-- Main Content -->
        <div
          class="w-full max-w-[1100px] flex flex-col items-center gap-6 md:gap-8 z-10"
        >
          <!-- Headline -->
          <h1
            class="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white text-center leading-tight md:leading-[80px] max-w-[950px]"
            v-html="headline || `Nós amamos <span class=\'text-[#8E6CE4]\'>construir</span>. O desafio é <span class=\'text-[#8E6CE4]\'>encontrar</span> quem precisa.`"
          ></h1>

          <!-- Subheadline -->
          <p
            class="text-base sm:text-lg md:text-2xl text-[#A6A6A6] text-center max-w-[900px] leading-relaxed md:leading-8 px-1"
          >
            {{
              subheadline ||
              "Gold Miner é a plataforma de IA que transforma sua habilidade técnica no seu próximo SaaS de sucesso. Guiamos você desde a descoberta de um nicho lucrativo até a validação da ideia, usando dados reais de dores de clientes."
            }}
          </p>

          <!-- CTA Button -->
          <div class="w-full max-w-[520px] mx-auto sm:w-auto sm:self-center">
            <Button
              data-test="cta-open-modal"
              class="w-full sm:!w-auto justify-center pointer-events-auto"
              @click.stop="openModal"
              @keydown.enter.prevent="openModal"
              @keydown.space.prevent="openModal"
              role="button"
              tabindex="0"
              aria-haspopup="dialog"
              :aria-expanded="isInviteOpen"
            >
              {{
                ctaText ||
                "Participe da Criação e Garanta seu Acesso Antecipado"
              }}
            </Button>
          </div>
        </div>
      </div>

      <!-- Dashboard Preview Image -->
      <div
        class="w-full mt-4 md:mt-auto flex justify-center px-4 sm:px-6 md:px-0"
      >
        <div class="w-full max-w-[1024px]">
          <ExplorerHero class="w-full h-auto block md:hidden" />
          <Ui class="w-full h-auto hidden md:block" />
        </div>
      </div>
    </div>
  </section>
  <ClientOnly>
    <UsabilityTestInviteModal
      v-model:open="isInviteOpen"
      @accept="onAcceptInvite"
      @cancel="isInviteOpen = false"
      data-test="usability-modal"
    />
  </ClientOnly>
</template>

<script setup lang="ts">
// ref and onMounted are auto-imported by Nuxt 3
import Button from "~/components/ui/Button.vue";
import UsabilityTestInviteModal from "~/components/modals/UsabilityTestInviteModal.vue";
import Ui from "~/components/images/ui.vue";
import ExplorerHero from "~/components/images/explorerhero.vue";

defineProps<{
  headline?: string;
  subheadline?: string;
  ctaText?: string;
}>();

// Use ref for client-side state
const isInviteOpen = ref(false);
// Debug helper for development
onMounted(() => {
  if (process.dev) {
    (window as any).__heroOpenModal = () => {
      isInviteOpen.value = true;
      return "Modal opened";
    };
  }
});

function openModal() {
  isInviteOpen.value = true;
}

function onAcceptInvite() {
  window.open("https://app.useberry.com/t/8p6kNDLt1N86VD/", "_blank");
  isInviteOpen.value = false;
}
</script>
