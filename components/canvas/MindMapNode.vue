<template>
  <div
    class="group relative w-auto select-none"
    tabindex="0"
  >
    <Handle
      type="source"
      :position="Position.Right"
      :style="{ opacity: 0, pointerEvents: 'none' }"
    />
    <Handle
      type="target"
      :position="Position.Left"
      :style="{ opacity: 0, pointerEvents: 'none' }"
    />
    <!-- ROOT: sempre card -->
    <div
      v-if="data.level === 'CoreMarket'"
      class="p-4 rounded-lg bg-[#17171C] shadow-lg transition-all duration-200 flex items-start gap-3 border-t border-t-[#47464B]"
    >
      <!-- Node content -->
      <div class="flex-1 min-w-0">
        <div class="flex items-center mb-1">
          <div class="mr-2 flex items-center" v-if="data.iconName">
            <component :is="ICONS[data.iconName]" v-if="ICONS[data.iconName]" />
          </div>
          <div class="font-semibold text-sm flex-grow text-white">
            {{ data.label || label }}
          </div>
        </div>
        <div class="text-xs opacity-90 mt-1" v-if="data.description">
          {{ data.description }}
        </div>
      </div>

      <!-- Output connection point (right) -->
    </div>

    <!-- External connector + button (root) -->
    <div
      v-if="hasChildren && data.level === 'CoreMarket'"
      class="absolute right-[-64px] top-1/2 -translate-y-1/2 flex items-center w-16 h-10 group nodrag nowheel nopan"
      @mousedown.stop
      @pointerdown.stop
      @wheel.stop.prevent
      @touchstart.stop
      @dblclick.stop.prevent
    >
      <!-- connector line (fixed, ends before the button) -->
      <div class="h-[2px] bg-[#5A5A60] flex-grow"></div>
      <!-- outlined circle button drawing +/- with CSS -->
      <button
        type="button"
        @mousedown.stop
        @pointerdown.stop
        @wheel.stop.prevent
        @touchstart.stop
        @click.stop="toggle"
        @dblclick.stop.prevent
        aria-label="Expandir/contrair"
        class="z-10 w-8 h-8 rounded-full border-2 border-[#5A5A60] bg-[#0d0d12] shadow-sm transition-transform hover:scale-[1.03] relative before:content-[''] before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-2.5 before:h-[2px] before:bg-[#5A5A60] before:rounded hover:border-[#8E6CE4] hover:before:bg-[#8E6CE4] hover:after:bg-[#8E6CE4] nodrag nowheel nopan"
        style="touch-action: manipulation"
        :class="{
          // show vertical bar only when collapsed (plus)
          'after:content-[\'\'] after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-[2px] after:h-2.5 after:bg-[#5A5A60] after:rounded':
            !isExpanded,
        }"
      />
    </div>

    <!-- Non-root nodes with BaseNodeShell -->
    <div v-if="data.level !== 'CoreMarket'" class="relative w-full h-full">
      <BaseNodeShell
        :width="192"
        :height="100"
        class="block relative"
        :data-node-id="props.id"
        :showOverlay="showOverlay"
        @mouseenter="onRootMouseEnter"
        @mouseleave="onRootMouseLeave"
      >
        <!-- Lightweight text (always in DOM, toggles opacity) -->
        <LightweightText
          :label="data.label || label"
          :reserveRight="hasChildren"
          :class="showOverlay ? 'opacity-0' : 'opacity-100'"
          :aria-hidden="showOverlay ? 'true' : 'false'"
        />

        <!-- Card overlay (conditionally rendered) -->
        <template #overlay>
          <div class="absolute inset-0 z-10 w-full h-full" style="pointer-events: auto;">
            <CardOverlay
              :label="data.label || label"
              :description="data.description"
              :selected="selected"
              @primary="data.onPrimary?.()"
            >
              <template #icon>
                <component
                  :is="ICONS[data.iconName]"
                  v-if="data.iconName && ICONS[data.iconName]"
                />
              </template>
            </CardOverlay>
          </div>
        </template>
      </BaseNodeShell>

      <!-- External connector + button (non-root, shows on hover) -->
      <div
        v-if="hasChildren && data.level !== 'CoreMarket'"
        class="absolute right-[-64px] top-1/2 -translate-y-1/2 flex items-center w-16 h-10 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity group nodrag nowheel nopan"
        @mousedown.stop
        @pointerdown.stop
        @wheel.stop.prevent
        @touchstart.stop
        @dblclick.stop.prevent
      >
        <div class="h-[2px] bg-[#5A5A60]"></div>
        <button
          type="button"
          @mousedown.stop
          @pointerdown.stop
          @wheel.stop.prevent
          @touchstart.stop
          @click.stop="toggle"
          @dblclick.stop.prevent
          aria-label="Expandir/contrair"
          class="z-10 w-8 h-8 rounded-full border-2 border-[#5A5A60] bg-[#0d0d12] shadow-sm transition-transform hover:scale-[1.03] relative before:content-[''] before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-2.5 before:h-[2px] before:bg-[#5A5A60] before:rounded hover:border-[#8E6CE4] hover:before:bg-[#8E6CE4] hover:after:bg-[#8E6CE4] nodrag nowheel nopan"
          style="touch-action: manipulation"
          :class="{
            'after:content-[\'\'\'] after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-[2px] after:h-2.5 after:bg-[#5A5A60] after:rounded':
              !isExpanded,
          }"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import HeartIcon from "~/components/icon/HeartIcon.vue";
// Simple nextTick implementation as a fallback
const nextTick = () => new Promise(resolve => setTimeout(resolve, 0));
import LightweightText from "~/components/canvas/node/LightweightText.vue";
import BaseNodeShell from "~/components/canvas/base/BaseNodeShell.vue";
import CardOverlay from "~/components/canvas/node/CardOverlay.vue";

// Use Vue Flow and store
const { useVueFlow } = await import("@vue-flow/core");
const { useMindMapStore } = await import("~/stores/mindMapStore");
const { Handle, Position } = await import("@vue-flow/core");

// const isHovered = ref(false);  // Removed as per instructions
const store = useMindMapStore();
const { updateNodeInternals } = useVueFlow();

// Non-reactive icon registry
const ICONS: Record<string, any> = {
  heart: HeartIcon,
};

// Component props
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
    required: true,
    default: () => ({
      level: "Category",
      isExpanded: false,
      children: [],
    }),
  },
  label: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "default",
  },
  selected: {
    type: Boolean,
    default: false,
  },
  isConnectable: {
    type: Boolean,
    default: true,
  },
  position: {
    type: Object,
    required: true,
    default: () => ({ x: 0, y: 0 }),
  },
  // Vue Flow connection points
  sourcePosition: {
    type: String,
    default: "right",
  },
  targetPosition: {
    type: String,
    default: "left",
  },
});

// Computed properties
const hasChildren = computed(
  (): boolean => (props.data?.children?.length ?? 0) > 0
);

const isExpanded = computed(() => {
  return !!props.data?.isExpanded;
});


// Track hover state for the node locally
const isHovered = ref(false);

// Debug logging for hover state changes
watch(isHovered, (newVal: boolean) => {
  console.log(`[MindMapNode] Hover state changed: ${newVal}`, {
    nodeId: props.id,
    label: props.data?.label || props.label,
    timestamp: new Date().toISOString()
  });
});

// Show overlay based on local hover state
const showOverlay = computed<boolean>(() => {
  const shouldShow = isHovered.value;
  console.log(`[MindMapNode] showOverlay: ${shouldShow}`, {
    nodeId: props.id,
    label: props.data?.label || props.label,
    timestamp: new Date().toISOString()
  });
  return shouldShow;
});

// Update node internals when overlay visibility changes
watch(() => showOverlay.value, async (isShowing: boolean) => {
  if (isShowing && typeof window !== "undefined") {
    await nextTick();
    await new Promise(resolve => requestAnimationFrame(resolve));
    updateNodeInternals(props.id);
  }
});

function onRootMouseEnter(event: MouseEvent) {
  if (props.data?.level === "CoreMarket") return;
  
  event.stopPropagation();
  event.stopImmediatePropagation();
  
  console.log('[MindMapNode] Mouse enter:', {
    nodeId: props.id,
    label: props.data?.label || props.label,
    target: event.target,
    currentTarget: event.currentTarget,
    timestamp: new Date().toISOString()
  });
  
  isHovered.value = true;
  
  // Force Vue Flow to update the node
  if (typeof window !== 'undefined') {
    requestAnimationFrame(() => {
      console.log('[MindMapNode] Updating node internals after mouse enter');
      updateNodeInternals(props.id);
    });
  }
}

function onRootMouseLeave(event: MouseEvent) {
  if (props.data?.level === "CoreMarket") return;
  
  event.stopPropagation();
  event.stopImmediatePropagation();
  
  console.log('[MindMapNode] Mouse leave:', {
    nodeId: props.id,
    label: props.data?.label || props.label,
    target: event.target,
    currentTarget: event.currentTarget,
    timestamp: new Date().toISOString()
  });
  
  isHovered.value = false;
  
  // Force Vue Flow to update the node
  if (typeof window !== 'undefined') {
    requestAnimationFrame(() => {
      console.log('[MindMapNode] Updating node internals after mouse leave');
      updateNodeInternals(props.id);
    });
  }
}


// Toggle node expansion
const toggle = () => {
  store.toggleNode(props.id);
  // Force Vue Flow to recalculate after state change on the next frame
  if (typeof window !== "undefined") {
    requestAnimationFrame(() => {
      updateNodeInternals();
    });
  }
};

// Expose connection points for Vue Flow
const connectionPoints = {
  source: "right",
  target: "left",
};

defineExpose({
  connectionPoints,
});
</script>

<style scoped>
.vue-flow__edge-path {
  pointer-events: none;
}
</style>
