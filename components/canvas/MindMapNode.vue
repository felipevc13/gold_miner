<template>
  <div class="group relative w-auto select-none" tabindex="0">
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
    <!-- ROOT: Core Market Node -->
    <CoreMarketNode
      v-if="data.level === 'CoreMarket'"
      :data="data"
      :label="label"
      @toggle="toggle"
    />

    <!-- Non-root nodes with BaseNodeShell -->
    <div v-if="data.level !== 'CoreMarket'" class="relative w-full h-full">
      <BaseNodeShell
        :width="192"
        :height="100"
        class="block relative"
        :data-node-id="props.id"
        :showOverlay="isActive"
        @mouseenter="onRootMouseEnter"
        @mouseleave="onRootMouseLeave"
      >
        <!-- Lightweight text (always in DOM, toggles opacity) -->
        <LightweightText
          :label="data.label || label"
          :reserveRight="hasChildren"
          :class="{ 'opacity-0': isActive, 'opacity-100': !isActive }"
          :aria-hidden="isActive ? 'true' : 'false'"
        />

        <!-- Card overlay (conditionally rendered) -->
        <template #overlay>
          <div
            class="absolute inset-0 z-10 w-full h-full"
            style="pointer-events: auto"
          >
            <CardOverlay
              :label="data.label || label"
              :description="data.description"
              :selected="selected"
              :has-children="hasChildren"
              :is-expanded="isExpanded"
              @primary="data.onPrimary?.()"
              @toggle="toggle"
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
    </div>
  </div>
</template>

<script setup lang="ts">
import HeartIcon from "~/components/icon/HeartIcon.vue";
// Simple nextTick implementation as a fallback
const nextTick = () => new Promise((resolve) => setTimeout(resolve, 0));
import LightweightText from "~/components/canvas/node/LightweightText.vue";
import BaseNodeShell from "~/components/canvas/base/BaseNodeShell.vue";
import CardOverlay from "~/components/canvas/node/CardOverlay.vue";
import CoreMarketNode from "./node/CoreMarketNode.vue";

// Use Vue Flow and store
const { useVueFlow } = await import("@vue-flow/core");
const { useMindMapStore } = await import("~/stores/mindMapStore");
const { Handle, Position } = await import("@vue-flow/core");

const store = useMindMapStore();
const { updateNodeInternals } = useVueFlow();

// Computed to check if this node is the active one
const isActive = computed(() => store.activeNodeId === props.id);

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
    timestamp: new Date().toISOString(),
  });
});

// Show overlay based on local hover state
const showOverlay = computed<boolean>(() => {
  const shouldShow = isHovered.value;
  console.log(`[MindMapNode] showOverlay: ${shouldShow}`, {
    nodeId: props.id,
    label: props.data?.label || props.label,
    timestamp: new Date().toISOString(),
  });
  return shouldShow;
});

// Update node internals when overlay visibility changes
watch(
  () => showOverlay.value,
  async (isShowing: boolean) => {
    if (isShowing && typeof window !== "undefined") {
      await nextTick();
      await new Promise((resolve) => requestAnimationFrame(resolve));
      updateNodeInternals(props.id);
    }
  }
);

function onRootMouseEnter(event: MouseEvent) {
  if (props.data?.level === "CoreMarket") return;

  event.stopPropagation();
  event.stopImmediatePropagation();

  console.log("[MindMapNode] Mouse enter:", {
    nodeId: props.id,
    label: props.data?.label || props.label,
    target: event.target,
    currentTarget: event.currentTarget,
    timestamp: new Date().toISOString(),
  });

  // Set this node as active in the store
  store.setActiveNode(props.id);

  // Force Vue Flow to update the node
  if (typeof window !== "undefined") {
    requestAnimationFrame(() => {
      console.log("[MindMapNode] Updating node internals after mouse enter");
      updateNodeInternals(props.id);
    });
  }
}

function onRootMouseLeave(event: MouseEvent) {
  // Don't clear the active node here - it will be updated when entering another node
  // This creates the behavior where the overlay stays until another node is hovered

  // Still log for debugging
  console.log("[MindMapNode] Mouse leave:", {
    nodeId: props.id,
    label: props.data?.label || props.label,
    target: event.target,
    currentTarget: event.currentTarget,
    timestamp: new Date().toISOString(),
  });
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
