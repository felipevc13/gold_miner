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
            v-html="
              headline ||
              'A programação é a parte<br><span class=\'text-[#8E6CE4]\'>mais fácil</span>.<br>O problema é <span class=\'text-[#8E6CE4]\'>vender</span>.'
            "
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
            <Button class="w-full sm:!w-auto justify-center" @click="openModal">
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
          <NuxtImg
            src="/images/explorerhero.svg"
            alt="Gold Miner Dashboard Mobile Preview"
            class="w-full h-auto block md:hidden"
            loading="lazy"
            format="webp"
            quality="80"
            sizes="sm:100vw md:100vw lg:100vw"
          />
          <NuxtImg
            src="/images/ui.svg"
            alt="Gold Miner Dashboard Preview"
            class="w-full h-auto hidden md:block"
            loading="lazy"
            format="webp"
            quality="80"
            sizes="sm:100vw md:100vw lg:100vw"
          />
        </div>
      </div>
    </div>

    <UsabilityTestInviteModal
      v-model:open="isInviteOpen"
      @accept="onAcceptInvite"
      @cancel="isInviteOpen = false"
    />
  </section>
</template>

<script setup lang="ts">
import Button from "~/components/ui/Button.vue";
import UsabilityTestInviteModal from "~/components/modals/UsabilityTestInviteModal.vue";

defineProps<{
  headline?: string;
  subheadline?: string;
  ctaText?: string;
}>();

const isInviteOpen = useState<boolean>("usabilityInviteOpen", () => false);

function openModal() {
  isInviteOpen.value = true;
}

function onAcceptInvite() {
  // custom logic, e.g., redirect or analytics
  isInviteOpen.value = false;
}
</script>
