<template>
  <section
    id="how-it-works"
    aria-labelledby="how-it-works-title"
    class="w-full bg-[#0f0f13]"
  >
    <div
      class="w-full max-w-[1200px] mx-auto px-6 md:px-8 lg:px-10 py-16 md:py-24"
    >
      <!-- Heading -->
      <header class="text-center mb-10 md:mb-14">
        <h2
          id="how-it-works-title"
          class="text-3xl md:text-5xl font-extrabold tracking-tight text-white"
        >
          Seu
          <span
            class="bg-clip-text text-transparent bg-gradient-to-r from-[#a78bfa] to-[#8b5cf6]"
            >Co-piloto Estratégico</span
          >
          de IA
        </h2>
        <p
          class="mt-4 text-[#b9b9c6] max-w-[860px] mx-auto text-sm md:text-base"
        >
          O Gold Miner é um workflow guiado que usa IA para encontrar “pepitas
          de ouro”: problemas não resolvidos em nichos específicos. Ele analisa
          milhares de conversas para te entregar um plano de ação completo.
        </p>
      </header>

      <!-- Step 1 -->
      <div
        class="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center mb-10 md:mb-14"
      >
        <div class="md:col-span-7 relative order-1">
          <div
            class="absolute inset-0 rounded-2xl blur-2xl bg-gradient-to-r from-[#7c3aed22] via-[#8b5cf622] to-[#7c3aed22] pointer-events-none"
          ></div>
          <div class="relative rounded-2xl overflow-hidden">
            <Explorer class="w-full h-auto block" />
          </div>
        </div>
        <div class="md:col-span-5 order-2 md:pl-4">
          <div class="flex items-center gap-3 mb-3">
            <div
              class="w-10 h-10 rounded-full bg-[#231f33] text-[#a78bfa] flex items-center justify-center"
            >
              <!-- search icon -->
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="6.5"
                  stroke="currentColor"
                  stroke-width="1.5"
                />
                <path
                  d="M18 18l3.5 3.5"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>
            </div>
            <h3 class="text-white font-semibold text-lg md:text-xl">
              Explore Mercados
            </h3>
          </div>
          <p class="text-[#b9b9c6] text-sm md:text-base">
            Navegue por uma tabela de nichos, cada um com um “Score de
            Oportunidade” baseado em volume de busca e potencial comercial.
          </p>
        </div>
      </div>

      <!-- Step 2 -->
      <div
        class="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center mb-10 md:mb-14"
      >
        <div class="md:col-span-7 relative order-1">
          <div
            class="absolute inset-0 rounded-2xl blur-2xl bg-gradient-to-r from-[#7c3aed22] via-[#8b5cf622] to-[#7c3aed22] pointer-events-none"
          ></div>
          <div class="relative rounded-2xl overflow-hidden">
            <PainUi class="w-full h-auto block" />
          </div>
        </div>
        <div class="md:col-span-5 order-2 md:pl-4">
          <div class="flex items-center gap-3 mb-3">
            <div
              class="w-10 h-10 rounded-full bg-[#231f33] text-[#a78bfa] flex items-center justify-center"
            >
              <!-- bar icon -->
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M6 14v4M12 10v8M18 6v12"
                  stroke="currentColor"
                  stroke-width="1.6"
                  stroke-linecap="round"
                />
              </svg>
            </div>
            <h3 class="text-white font-semibold text-lg md:text-xl">
              Analise Dores Reais
            </h3>
          </div>
          <p class="text-[#b9b9c6] text-sm md:text-base">
            Com um clique, nossa IA vasculha Reddit, X e YouTube para encontrar
            os problemas, desejos e queixas mais comuns do seu público‑alvo.
          </p>
        </div>
      </div>

      <!-- Step 3 -->
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
        <div class="md:col-span-7 relative order-1">
          <div
            class="absolute inset-0 rounded-2xl blur-2xl bg-gradient-to-r from-[#7c3aed22] via-[#8b5cf622] to-[#7c3aed22] pointer-events-none"
          ></div>
          <div class="relative rounded-2xl overflow-hidden">
            <Product class="w-full h-auto block" />
          </div>
        </div>
        <div class="md:col-span-5 order-2 md:pl-4">
          <div class="flex items-center gap-3 mb-3">
            <div
              class="w-10 h-10 rounded-full bg-[#231f33] text-[#a78bfa] flex items-center justify-center"
            >
              <!-- doc icon -->
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M8 4h6l4 4v12H8z"
                  stroke="currentColor"
                  stroke-width="1.5"
                />
                <path d="M14 4v4h4" stroke="currentColor" stroke-width="1.5" />
              </svg>
            </div>
            <h3 class="text-white font-semibold text-lg md:text-xl">
              Gere Seu Dossiê de Negócio
            </h3>
          </div>
          <p class="text-[#b9b9c6] text-sm md:text-base">
            Receba ideias de negócio completas, com proposta de valor, sugestão
            de features e a copy pronta para sua landing page.
          </p>
        </div>
      </div>

      <!-- Callout CTA -->
      <div class="mt-12 md:mt-16">
        <div class="relative">
          <div
            class="absolute inset-0 rounded-2xl blur-2xl bg-gradient-to-r from-[#7c3aed33] via-[#8b5cf633] to-[#7c3aed33] pointer-events-none"
          ></div>
          <div
            class="relative rounded-2xl bg-[#17171d] border border-[#292935] p-6 md:p-10 text-center"
          >
            <div
              class="mx-auto mb-3 w-10 h-10 text-[#a78bfa] flex items-center justify-center"
            >
              <Ai class="w-12 h-12" />
            </div>
            <h4 class="text-white text-2xl md:text-3xl font-extrabold mb-2">
              Pare de construir no escuro.
            </h4>
            <p class="text-[#b9b9c6] max-w-[760px] mx-auto mb-5">
              Junte‑se a um grupo exclusivo de co‑criadores e seja o primeiro a
              validar sua próxima grande ideia com o poder dos dados. O risco é
              menor, a chance de sucesso é maior.
            </p>
            <Button
              data-test="cta-open-modal-how"
              class="pointer-events-auto"
              @click.stop="openInvite"
              @keydown.enter.prevent="openInvite"
              @keydown.space.prevent="openInvite"
              role="button"
              tabindex="0"
              aria-haspopup="dialog"
              :aria-expanded="isInviteOpen"
            >
              Participe da Criação e Garanta seu Acesso Antecipado
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>
  <ClientOnly>
    <UsabilityTestInviteModal
      v-model:open="isInviteOpen"
      @accept="onAcceptInvite"
      @cancel="isInviteOpen = false"
      data-test="usability-modal-how"
    />
  </ClientOnly>
</template>

<script setup lang="ts">
// ref and onMounted are auto-imported by Nuxt 3
import Button from "../ui/Button.vue";
import UsabilityTestInviteModal from "~/components/modals/UsabilityTestInviteModal.vue";
import Explorer from "~/components/images/explorer.vue";
import PainUi from "~/components/images/painui.vue";
import Product from "~/components/images/product.vue";
import Ai from "~/components/icon/Ai.vue";

// Use ref for client-side state
const isInviteOpen = ref(false);
const isMounted = ref(false);

// Only render modal after mount
onMounted(() => {
  isMounted.value = true;

  // Debug helper
  if (process.client) {
    (window as any).__howItWorksOpenModal = () => {
      isInviteOpen.value = true;
      return "Modal opened";
    };
    console.log("HowItWorksSection mounted, modal can be opened");
  }
});

function openInvite(event: Event) {
  if (process.client) {
    event?.preventDefault();
    event?.stopPropagation();
    console.log("Opening modal, isMounted:", isMounted.value);
    isInviteOpen.value = true;
  }
}

function onAcceptInvite() {
  if (process.client) {
    // Open Useberry test in a new tab
    window.open("https://app.useberry.com/t/8p6kNDLt1N86VD/", "_blank");
    isInviteOpen.value = false;
  }
}
</script>
