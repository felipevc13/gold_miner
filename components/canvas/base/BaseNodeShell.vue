<template>
  <!-- Base shell with fixed size and slots for content and overlay -->
  <div
    class="relative"
    :style="{
      width: width + 'px',
      height: height + 'px',
      contain: 'layout style',
    }"
    v-bind="$attrs"
    :data-debug-overlay="showOverlay ? 'visible' : 'hidden'"
  >
    <!-- Base content (lightweight) - always present, just changes opacity -->
    <div
      class="absolute inset-0 flex items-center justify-center transition-opacity duration-150"
      :class="{ 'opacity-0': showOverlay, 'opacity-100': !showOverlay }"
      style="pointer-events: none; will-change: opacity"
    >
      <slot />
    </div>

    <!-- Overlay content - conditionally rendered -->
    <div
      v-if="showOverlay"
      class="absolute inset-0 z-10 transition-opacity duration-150"
      style="will-change: transform, opacity; pointer-events: auto;"
      @click="handleOverlayClick"
    >
      <div
        v-if="!slots.overlay"
        class="w-full h-full flex items-center justify-center bg-red-500/10"
      >
        <div class="text-xs text-red-500 p-2 bg-white/90 rounded">
          No overlay slot content provided
        </div>
      </div>
      <slot v-else name="overlay" />
    </div>
  </div>
</template>

<script setup lang="ts">
import * as Vue from "vue";

// Component props with TypeScript interface
interface Props {
  width: number;
  height: number;
  showOverlay: boolean;
  debug?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  debug: false,
});

const slots = (Vue as unknown as { useSlots: () => any }).useSlots();

const handleOverlayClick = (e: MouseEvent) => {
  if (props.debug) {
    console.log("Overlay - click", {
      target: e.target,
      currentTarget: e.currentTarget,
      hasOverlaySlot: !!slots.overlay,
      timestamp: new Date().toISOString(),
    });
  }
  e.stopPropagation();
};

/**
 * BaseNodeShell
 * - Garante footprint fixo do nó no canvas.
 * - Usa slots: padrão (conteúdo lightweight) e `overlay` (card absoluto).
 * - Não aplica estilos visuais (cor/borda/sombra) — só tamanho e posicionamento.
 */

// Log component lifecycle and props changes
const logState = (context: string): void => {
  if (!props.debug) return;

  console.log(`[BaseNodeShell] ${context}:`, {
    width: props.width,
    height: props.height,
    showOverlay: props.showOverlay,
    hasDefaultSlot: !!slots?.default,
    hasOverlaySlot: !!slots?.overlay,
    timestamp: new Date().toISOString(),
  });
};

// Component lifecycle hooks
(Vue as unknown as { onMounted: (cb: () => void) => void }).onMounted(() =>
  logState("Mounted")
);
(Vue as unknown as { onUpdated: (cb: () => void) => void }).onUpdated(() =>
  logState("Updated")
);

type VueWatch = (
  source: () => any,
  cb: (newVal: any, oldVal: any) => void,
  options?: { immediate?: boolean; flush?: "pre" | "post" | "sync" }
) => any;
// Watch for showOverlay changes
(Vue as unknown as { watch: VueWatch }).watch(
  () => props.showOverlay,
  (newVal: boolean, oldVal: boolean) => {
    if (!props.debug) return;

    console.log("[BaseNodeShell] showOverlay changed:", {
      from: oldVal,
      to: newVal,
      timestamp: new Date().toISOString(),
    });
  },
  { immediate: true, flush: "post" }
);
</script>
