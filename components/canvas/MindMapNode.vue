<template>
  <div class="mind-map-node bg-[#2C2B30] border border-[#47464B] rounded-lg p-3 text-white flex items-center shadow-lg">
    <Handle type="target" :position="Position.Left" />
    <span class="flex-grow text-center px-2">{{ data.label }}</span>
    <button 
      v-if="hasChildren" 
      @click="toggle" 
      class="w-6 h-6 border border-white rounded flex items-center justify-center text-lg font-bold ml-2 hover:bg-white/10 transition-colors"
      :class="{ 'bg-white/10': isExpanded }"
    >
      {{ isExpanded ? '-' : '+' }}
    </button>
    <Handle type="source" :position="Position.Right" />
  </div>
</template>

<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core';
import { useMindMapStore } from '~/stores/mindMapStore';

interface NodeProps {
  id: string;
  data: {
    label: string;
    children?: any[];
    isExpanded?: boolean;
  };
  type: string;
  selected?: boolean;
  isConnectable?: boolean;
  xPos: number;
  yPos: number;
  dragging?: boolean;
  targetPosition?: string;
  sourcePosition?: string;
}

const props = withDefaults(defineProps<NodeProps>(), {
  selected: false,
  isConnectable: true,
  dragging: false,
  targetPosition: 'top',
  sourcePosition: 'bottom'
});

const store = useMindMapStore();

const hasChildren = computed(() => props.data.children && props.data.children.length > 0);
const isExpanded = computed(() => props.data.isExpanded);

function toggle() {
  store.toggleNode(props.id);
}
</script>

<style scoped>
.mind-map-node {
  min-width: 180px;
  transition: all 0.2s ease;
}

.mind-map-node:hover {
  box-shadow: 0 0 0 1px #3b82f6;
}
</style>
