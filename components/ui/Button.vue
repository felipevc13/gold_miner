<template>
  <button
    class="inline-flex items-center justify-center px-3 py-1.5 w-[130px] h-[40px] bg-[#8E6CE4] border-t-2 border-t-[#AB8FF1] rounded-sm text-white font-sans font-semibold text-normal leading-none tracking-[-0.12px] hover:opacity-90 transition-opacity"
    :class="[fullWidth ? 'w-full' : '']"
    :disabled="disabled"
    :type="type"
    @click="$emit('click', $event)"
  >
    <slot>Pesquisar nicho</slot>
  </button>
</template>

<script setup lang="ts">
const {
  type = "button",
  disabled = false,
  fullWidth = false,
} = defineProps<{
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  fullWidth?: boolean;
}>();

defineEmits<{
  (e: "click", event: MouseEvent): void;
}>();
</script>
