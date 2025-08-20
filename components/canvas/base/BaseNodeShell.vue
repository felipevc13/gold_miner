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
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <!-- Base content (lightweight). Maintains footprint, centered. -->
    <div
      class="absolute inset-0 flex items-center justify-center transition-opacity duration-150"
      :class="showOverlay ? 'opacity-0' : 'opacity-100'"
      style="pointer-events: none; will-change: opacity"
    >
      <slot />
    </div>

    <!-- Overlay for the card, controlled externally. Doesn't change node size. -->
    <transition
      name="fade"
      mode="out-in"
      @before-enter="onBeforeEnter"
      @enter="onEnter"
      @after-enter="onAfterEnter"
      @before-leave="onBeforeLeave"
      @leave="onLeave"
      @after-leave="onAfterLeave"
      :css="false"
    >
      <div
        v-if="showOverlay"
        class="absolute inset-0 z-10"
        style="will-change: transform, opacity; pointer-events: auto"
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
    </transition>
  </div>
</template>

<script setup lang="ts">
import * as Vue from "vue";
const onMouseEnter = () => {
  console.log("BaseNodeShell - mouseenter", {
    showOverlay: props.showOverlay,
    timestamp: new Date().toISOString(),
  });
};
const onMouseLeave = () => {
  console.log("BaseNodeShell - mouseleave", {
    showOverlay: props.showOverlay,
    timestamp: new Date().toISOString(),
  });
};
const onBeforeEnter = () =>
  console.log("Overlay - before enter", {
    timestamp: new Date().toISOString(),
  });
const onEnter = (el: Element, done: () => void) => {
  console.log("Overlay - enter", { timestamp: new Date().toISOString() });
  requestAnimationFrame(() => {
    (el as HTMLElement).style.opacity = "1";
    done();
  });
};
const onAfterEnter = () =>
  console.log("Overlay - after enter", { timestamp: new Date().toISOString() });
const onBeforeLeave = () =>
  console.log("Overlay - before leave", {
    timestamp: new Date().toISOString(),
  });
const onLeave = (el: Element, done: () => void) => {
  console.log("Overlay - leave", { timestamp: new Date().toISOString() });
  requestAnimationFrame(() => {
    (el as HTMLElement).style.opacity = "0";
    setTimeout(done, 150); // Match this with the transition duration
  });
};
const onAfterLeave = () =>
  console.log("Overlay - after leave", { timestamp: new Date().toISOString() });
const handleOverlayClick = (e: MouseEvent) => {
  console.log("Overlay - click", {
    target: e.target,
    currentTarget: e.currentTarget,
    hasOverlaySlot: !!slots.overlay,
    timestamp: new Date().toISOString(),
  });
  e.stopPropagation();
};

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
