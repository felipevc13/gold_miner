<template>
  <!-- Conteúdo lightweight SEM casco: deve ser usado DENTRO do BaseNodeShell -->
  <div
    class="w-full h-full flex items-center justify-center px-3"
    :class="{ 'pr-8': reserveRight }"
  >
    <span
      class="block text-sm leading-none truncate"
      :class="textClass"
      :title="label"
    >
      {{ label }}
    </span>
  </div>
</template>

<script setup lang="ts">
/**
 * LightweightText
 * - Apenas o conteúdo visual do estado "leve".
 * - Deve ser renderizado DENTRO do BaseNodeShell (no slot padrão).
 * - `reserveRight` deixa espaço à direita para o botão externo (+/-) quando existir.
 */
const props = withDefaults(
  defineProps<{
    label: string;
    /** Classe extra para o texto (ex.: 'text-white/90') */
    textClass?: string;
    /** Reserva espaço à direita para o conector externo */
    reserveRight?: boolean;
  }>(),
  {
    textClass: "text-white",
    reserveRight: false,
  }
);

const { label, textClass, reserveRight } = props;
</script>
