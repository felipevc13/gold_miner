<template>
  <button
    v-if="!to"
    class="inline-flex items-center justify-center whitespace-normal px-5 py-3 w-auto min-h-[40px] rounded-sm font-sans font-semibold text-sm md:text-base leading-normal tracking-[-0.12px] hover:opacity-90 transition-opacity text-center"
    :class="[
      fullWidth ? 'w-full' : '',
      variant === 'secondary'
        ? 'border border-white text-white bg-transparent'
        : 'bg-[#8E6CE4] border-t-2 border-t-[#AB8FF1] text-white',
    ]"
    :disabled="disabled"
    :type="type"
    @click="$emit('click', $event)"
  >
    <slot>Pesquisar nicho</slot>
  </button>
  <NuxtLink
    v-else
    :to="to"
    class="inline-flex items-center justify-center whitespace-normal px-5 py-3 w-auto min-h-[40px] rounded-sm font-sans font-semibold text-sm md:text-base leading-normal tracking-[-0.12px] hover:opacity-90 transition-opacity text-center"
    :class="[
      fullWidth ? 'w-full' : '',
      variant === 'secondary'
        ? 'border border-white text-white bg-transparent'
        : 'bg-[#8E6CE4] border-t-2 border-t-[#AB8FF1] text-white',
    ]"
  >
    <slot>Pesquisar nicho</slot>
  </NuxtLink>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    fullWidth?: boolean;
    to?: string;
    variant?: "primary" | "secondary";
  }>(),
  {
    type: "button",
    disabled: false,
    fullWidth: false,
    to: "",
    variant: "primary",
  }
);

defineEmits<{
  (e: "click", event: MouseEvent): void;
}>();
</script>
