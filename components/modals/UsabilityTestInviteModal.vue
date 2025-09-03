<template>
  <!-- Wrapper over BaseModal; supports multiple common v-model patterns -->
  <BaseModal
    :isOpen="open"
    :modelValue="open"
    size="lg"
    :bodyClass="'p-6 md:p-8 space-y-4 leading-relaxed text-gray-200'"
    @close="onCancel"
  >
    <!-- HEADER -->
    <template #header>
      <div
        class="flex items-start justify-between gap-4 px-6 md:px-8 py-4 border-b border-[#2a2a2a]"
      >
        <h3 class="text-xl md:text-2xl font-semibold tracking-[-0.01em]">
          Você foi selecionado para o Teste de Usabilidade!
        </h3>
        <button
          type="button"
          class="btn btn-ghost btn-sm"
          aria-label="Fechar"
          @click="onCancel"
        >
          ✕
        </button>
      </div>
    </template>

    <!-- BODY (default slot) -->
    <div class="space-y-4 text-[15px]">
      <p>
        Para garantir que estamos construindo a melhor ferramenta possível,
        preparamos um teste rápido e interativo (leva cerca de
        <strong>5–7 minutos</strong>).
      </p>
      <p>
        Você poderá interagir com o protótipo do <strong>Gold Miner</strong> e
        nos dar sua opinião sincera. Em troca, você receberá
        <strong>acesso prioritário</strong> e nosso
        <strong>maior desconto de fundador</strong>.
      </p>
      <div class="space-y-2">
        <p class="font-semibold">Sua missão, caso decida aceitar:</p>
        <ol class="list-decimal pl-5 space-y-1">
          <li>Responda a algumas perguntas iniciais.</li>
          <li>Complete uma tarefa simples no nosso protótipo.</li>
        </ol>
      </div>
      <p>Pronto para começar a minerar?</p>
    </div>

    <!-- FOOTER -->
    <template #footer>
      <div
        class="flex items-center justify-end gap-3 px-6 md:px-8 py-4 border-t border-[#2a2a2a]"
      >
        <Button
          type="button"
          variant="secondary"
          data-testid="usability-invite-cancel"
          @click="onCancel"
        >
          Cancelar
        </Button>
        <Button
          type="button"
          color="primary"
          data-testid="usability-invite-accept"
          @click="onAccept"
        >
          Sim, Quero Participar do Teste!
        </Button>
      </div>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
// NOTE: Ajuste o import abaixo conforme o caminho real do seu BaseModal
import Button from "~/components/ui/Button.vue";
import BaseModal from "~/components/modals/BaseModal.vue";

/**
 * Props & Emits
 * - `open`: controla a visibilidade a partir do pai (v-model:open)
 * - Emite: `update:open`, `accept`, `cancel`
 */
const props = defineProps<{ open: boolean }>();
const emit = defineEmits<{
  (e: "update:open", value: boolean): void;
  (e: "accept"): void;
  (e: "cancel"): void;
}>();

function onAccept() {
  emit("accept");
}

function onCancel() {
  emit("cancel");
  emit("update:open", false);
}
</script>

<style scoped>
/* Garanta consistência visual caso o BaseModal não defina espaçamentos internos */
</style>
