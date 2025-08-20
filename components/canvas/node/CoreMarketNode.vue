<template>
  <div class="relative">
    <!-- Main card -->
    <div
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
    </div>

    <!-- External connector + button (root) -->
    <div
      v-if="hasChildren"
      class="absolute right-[-48px] top-1/2 -translate-y-1/2 flex items-center w-12 h-10 group"
      @mousedown.stop
      @pointerdown.stop
      @wheel.stop.prevent
      @touchstart.stop
      @dblclick.stop.prevent
    >
      <!-- connector line -->
      <div class="h-[2px] bg-[#5A5A60] flex-grow"></div>
      <!-- toggle button -->
      <button
        type="button"
        @click.stop="$emit('toggle')"
        aria-label="Expandir/contrair"
        class="z-10 w-8 h-8 rounded-full border-2 border-[#5A5A60] bg-[#0d0d12] shadow-sm transition-all hover:border-[#8E6CE4] group-hover:border-[#8E6CE4] flex items-center justify-center"
      >
        <div class="relative w-3 h-3">
          <div
            class="absolute top-1/2 left-0 w-full h-[2px] bg-[#5A5A60] -translate-y-1/2 group-hover:bg-[#8E6CE4]"
          ></div>
          <div
            v-if="!isExpanded"
            class="absolute top-1/2 left-0 w-full h-[2px] bg-[#5A5A60] -translate-y-1/2 rotate-90 group-hover:bg-[#8E6CE4]"
          ></div>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import HeartIcon from "~/components/icon/HeartIcon.vue";

// Non-reactive icon registry
const ICONS: Record<string, any> = {
  heart: HeartIcon,
};

// Types
interface NodeData {
  label?: string;
  description?: string;
  iconName?: string;
  children?: any[];
  isExpanded?: boolean;
  [key: string]: any;
}

// Props
const props = defineProps<{
  data: NodeData;
  label?: string;
}>();

// Emits
defineEmits<{
  (e: "toggle"): void;
}>();

// Computed properties
const hasChildren = computed(
  (): boolean => (props.data?.children?.length ?? 0) > 0
);

const isExpanded = computed(() => {
  return !!props.data?.isExpanded;
});

// Icons are defined at the top of the file
</script>
