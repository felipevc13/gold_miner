<template>
  <div
    class="group relative w-auto select-none"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
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

    <!-- NÃO-ROOT: lightweight por padrão, card no hover/focus -->
    <div v-if="data.level !== 'CoreMarket'" class="w-64">
      <!-- Lightweight (texto simples) -->
      <span
        class="block text-sm text-white leading-snug truncate group-hover:hidden group-focus-visible:hidden"
      >
        {{ data.label || label }}
      </span>

      <!-- Card no hover/focus -->
      <div
        class="hidden group-hover:flex group-focus-visible:flex p-3 rounded-lg bg-[#1d1d1f] border border-gray-800 shadow-lg transition-all duration-200 items-start gap-2"
        :class="{
          'border-blue-500 border-2': selected,
          'hover:border-blue-400': !selected,
        }"
      >
        <!-- Node content -->
        <div class="flex-1 min-w-0">
          <div class="flex items-center mb-1">
            <div class="mr-2 flex items-center" v-if="data.iconName">
              <component
                :is="ICONS[data.iconName]"
                v-if="ICONS[data.iconName]"
              />
            </div>
            <div class="font-semibold text-lg flex-grow text-white">
              {{ data.label || label }}
            </div>
          </div>
          <div class="text-xs opacity-90 mt-1" v-if="data.description">
            {{ data.description }}
          </div>
          <div class="mt-2 flex gap-2">
            <button
              v-if="data.onPrimary"
              class="rounded-md bg-white/10 px-2 py-1 text-xs hover:bg-white/20 text-white"
              @click.stop="data.onPrimary?.()"
            >
              Pesquisar categoria
            </button>
          </div>
        </div>
      </div>

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
            'after:content-[\'\'] after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-[2px] after:h-2.5 after:bg-[#5A5A60] after:rounded':
              !isExpanded,
          }"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Auto-imported in Nuxt 3: ref, computed, nextTick, defineAsyncComponent
import HeartIcon from "~/components/icon/HeartIcon.vue";

// Use Vue Flow and store
const { useVueFlow } = await import("@vue-flow/core");
const { useMindMapStore } = await import("~/stores/mindMapStore");
const { Handle, Position } = await import("@vue-flow/core");

const isHovered = ref(false);
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
const hasChildren = computed(() => {
  return props.data?.children?.length > 0;
});

const isExpanded = computed(() => {
  return !!props.data?.isExpanded;
});

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
