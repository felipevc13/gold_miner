<template>
  <!-- Card overlay for non-root nodes -->
  <div
    ref="cardRef"
    class="w-full h-full p-3 rounded-lg bg-[#1d1d1f] border-t border-t-[#47464B] shadow-lg transition-all duration-200 flex items-start gap-2 transform hover:scale-[1.02] hover:shadow-xl hover:z-20 relative group"
    :data-node-id="nodeId"
    :data-visible="isVisible"
    style="
      backface-visibility: hidden;
      transform-style: preserve-3d;
      will-change: transform, box-shadow;
      pointer-events: auto;
    "
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <!-- Toggle button for children -->
    <div
      v-if="hasChildren"
      class="absolute right-[-48px] top-1/2 -translate-y-1/2 flex items-center w-12 h-10 group-hover:opacity-100 transition-opacity"
      @mousedown.stop
      @pointerdown.stop
      @wheel.stop.prevent
      @touchstart.stop
      @dblclick.stop.prevent
    >
      <div class="h-[2px] bg-[#5A5A60] flex-grow"></div>
      <button
        type="button"
        @click.stop="$emit('toggle')"
        aria-label="Expandir/contrair"
        class="z-10 w-8 h-8 rounded-full border-2 border-[#5A5A60] bg-[#0d0d12] shadow-sm transition-all hover:border-[#8E6CE4] group-hover:border-[#8E6CE4] flex items-center justify-center"
      >
        <div class="relative w-3 h-3">
          <div class="absolute top-1/2 left-0 w-full h-[2px] bg-[#5A5A60] -translate-y-1/2 group-hover:bg-[#8E6CE4]"></div>
          <div 
            v-if="!isExpanded"
            class="absolute top-1/2 left-0 w-full h-[2px] bg-[#5A5A60] -translate-y-1/2 rotate-90 group-hover:bg-[#8E6CE4]"
          ></div>
        </div>
      </button>
    </div>
    <!-- Ícone opcional -->
    <div class="mt-0.5" v-if="$slots.icon">
      <slot name="icon" />
    </div>

    <!-- Conteúdo principal -->
    <div class="flex-1 min-w-0">
      <div class="font-semibold text-lg text-white truncate">
        {{ label }}
      </div>
      <div v-if="description" class="text-xs text-white/80 mt-1 line-clamp-3">
        {{ description }}
      </div>

      <!-- Slot extra opcional (tags, métricas, etc.) -->
      <div v-if="$slots.default" class="mt-2">
        <slot />
      </div>

      <!-- Ações -->
      <div class="mt-3 flex gap-2">
        <slot name="actions">
          <UiButton v-if="ctaText" @click.stop="onPrimary()">
            {{ ctaText }}
          </UiButton>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Vue Composition API functions are auto-imported by Nuxt

// Component props with TypeScript interface
interface Props {
  label: string;
  description?: string;
  ctaText?: string;
  nodeId?: string;
  isVisible?: boolean;
  hasChildren?: boolean;
  isExpanded?: boolean;
  selected?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  description: "",
  ctaText: "Pesquisar categoria",
  nodeId: "",
  isVisible: true,
  hasChildren: false,
  isExpanded: false,
  selected: false,
});

// Emit events
const emit = defineEmits<{
  (e: 'primary'): void;
  (e: 'toggle'): void;
  (e: 'mouseenter', event: MouseEvent): void;
  (e: 'mouseleave', event: MouseEvent): void;
}>()

const cardRef = ref<HTMLElement | null>(null);

// Component mounted
onMounted(() => {
  // Component initialization if needed
});

// Watch for visibility changes
watch(
  () => props.isVisible,
  (newVal: boolean) => {
    console.log(`[CardOverlay] Visibility changed: ${newVal}`, {
      nodeId: props.nodeId,
      label: props.label,
      timestamp: new Date().toISOString(),
    });
  }
);

function onMouseEnter(event: MouseEvent) {
  console.log("[CardOverlay] Mouse enter:", {
    nodeId: props.nodeId,
    label: props.label,
    target: event.target,
    currentTarget: event.currentTarget,
    timestamp: new Date().toISOString(),
  });
}

function onMouseLeave(event: MouseEvent) {
  console.log("[CardOverlay] Mouse leave:", {
    nodeId: props.nodeId,
    label: props.label,
    target: event.target,
    currentTarget: event.currentTarget,
    timestamp: new Date().toISOString(),
  });
}

function onPrimary() {
  console.log("[CardOverlay] Primary action triggered:", {
    nodeId: props.nodeId,
    label: props.label,
    timestamp: new Date().toISOString(),
  });
  emit("primary");
}
</script>
