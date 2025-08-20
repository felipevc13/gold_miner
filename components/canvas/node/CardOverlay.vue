<template>
  <!-- Card overlay for non-root nodes -->
  <div
    ref="cardRef"
    class="w-full h-full p-3 rounded-lg bg-[#1d1d1f] border-t border-t-[#47464B] shadow-lg transition-all duration-200 flex items-start gap-2 transform hover:scale-[1.02] hover:shadow-xl hover:z-20"
    :data-node-id="nodeId"
    :data-visible="isVisible"
    style="backface-visibility: hidden; transform-style: preserve-3d; will-change: transform, box-shadow; pointer-events: auto;"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
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
// Explicitly import Vue Composition API functions
import { useSlots, onMounted, watch, ref } from 'vue';
import type { Ref } from 'vue';

// Component props with TypeScript interface
interface Props {
  label: string;
  description?: string;
  ctaText?: string;
  nodeId?: string;
  isVisible?: boolean;
  selected?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  description: '',
  ctaText: 'Pesquisar categoria',
  nodeId: '',
  isVisible: false,
  selected: false
});

const emit = defineEmits<{ (e: 'primary'): void }>();
const slots = useSlots();
const cardRef: Ref<HTMLElement | null> = ref(null);

// Debug logging
onMounted(() => {
  console.log(`[CardOverlay] Mounted for node: ${props.nodeId}`, {
    label: props.label,
    isVisible: props.isVisible,
    hasIcon: !!slots.icon,
    hasDefaultSlot: !!slots.default,
    hasActionsSlot: !!slots.actions,
    timestamp: new Date().toISOString()
  });
});

// Watch for visibility changes
watch(() => props.isVisible, (newVal: boolean) => {
  console.log(`[CardOverlay] Visibility changed: ${newVal}`, {
    nodeId: props.nodeId,
    label: props.label,
    timestamp: new Date().toISOString()
  });
});

function onMouseEnter(event: MouseEvent) {
  console.log('[CardOverlay] Mouse enter:', {
    nodeId: props.nodeId,
    label: props.label,
    target: event.target,
    currentTarget: event.currentTarget,
    timestamp: new Date().toISOString()
  });
}

function onMouseLeave(event: MouseEvent) {
  console.log('[CardOverlay] Mouse leave:', {
    nodeId: props.nodeId,
    label: props.label,
    target: event.target,
    currentTarget: event.currentTarget,
    timestamp: new Date().toISOString()
  });
}

function onPrimary() {
  console.log('[CardOverlay] Primary action triggered:', {
    nodeId: props.nodeId,
    label: props.label,
    timestamp: new Date().toISOString()
  });
  emit('primary');
}
</script>
