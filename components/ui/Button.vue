<template>
  <component
    :is="componentType"
    :to="to"
    :disabled="disabled"
    :type="type"
    class="inline-flex items-center justify-center font-semibold text-center transition-opacity whitespace-nowrap min-h-[40px] rounded-sm hover:opacity-90 leading-normal"
    :class="[buttonClasses, fullWidth ? 'w-full' : isIconOnly ? '' : 'w-auto']"
    @click="$emit('click', $event)"
  >
    <!-- Slot para ícone à esquerda -->
    <span v-if="$slots.iconLeft" :class="{ 'mr-2': hasText }">
      <slot name="iconLeft" />
    </span>

    <!-- Slot padrão para o texto -->
    <span v-if="$slots.default?.().every((v: SlotVNode) => v.type !== Comment)">
      <slot />
    </span>

    <!-- Slot para ícone à direita -->
    <span v-if="$slots.iconRight" :class="{ 'ml-2': hasText }">
      <slot name="iconRight" />
    </span>
  </component>
</template>

<script setup lang="ts">
// Simple type for slot VNodes
type SlotVNode = {
  type: any;
};

const Comment = Symbol.for("v-cmt");
const slots = useSlots();
const NuxtLink = resolveComponent("NuxtLink");

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<{
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    fullWidth?: boolean;
    to?: string;
    variant?: "primary" | "secondary";
    size?: "normal" | "icon";
  }>(),
  {
    type: "button",
    disabled: false,
    fullWidth: false,
    to: undefined,
    variant: "primary",
    size: "normal",
  }
);

defineEmits<{
  (e: "click", event: MouseEvent): void;
}>();

// Determina se o componente deve ser um <button> ou um <NuxtLink>
const componentType = computed(() => (props.to ? NuxtLink : "button"));

const hasText = computed(
  () =>
    !!slots.default &&
    slots.default().some((v: SlotVNode) => v.type !== Comment)
);
const isIconOnly = computed(() => props.size === "icon" || !hasText.value);

const buttonClasses = computed(() => {
  const classes = [];

  // Variantes de estilo
  if (props.variant === "secondary") {
    classes.push("border border-white text-white bg-transparent");
  } else {
    classes.push("bg-[#8E6CE4] border-t-2 border-t-[#AB8FF1] text-white");
  }

  // --- CORREÇÃO AQUI ---
  // Tamanhos (padding)
  if (isIconOnly.value) {
    classes.push("h-10 w-10 flex items-center justify-center");
  } else {
    classes.push("px-5 py-3");
  }

  return classes.join(" ");
});
</script>
