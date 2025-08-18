<template>
  <div class="vue-flow-wrapper h-full w-full relative flex flex-col">
    <Header class="mb-[-72px] z-11" />

    <!-- Search Bar -->
    <div class="absolute top-20 left-4 z-10 flex items-center gap-4">
      <div class="relative">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Busque por um mercado ou nicho"
          class="w-80 bg-[#2C2B30] border border-[#47464B] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          @keyup.enter="handleSearch"
        />
        <div
          v-if="searchResults.length > 0"
          class="absolute mt-1 w-full bg-[#2C2B30] border border-[#47464B] rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto"
        >
          <div
            v-for="result in searchResults"
            :key="result.id"
            class="px-4 py-2 hover:bg-[#3a393e] cursor-pointer"
            @click="selectSearchResult(result)"
          >
            {{ result.label }}
          </div>
        </div>
      </div>
    </div>

    <!-- Main Canvas Area -->
    <div class="flex-1 relative">
      <ClientOnly>
        <div ref="flowContainerRef" class="vue-flow-container absolute inset-0">
          <VueFlow
            v-model="elements"
            :node-types="nodeTypes"
            :default-viewport="{ zoom: 0.8 }"
            :min-zoom="0.1"
            :max-zoom="4"
            :snap-to-grid="false"
            :elevate-nodes-on-select="true"
            :nodes-draggable="false"
            :default-edge-options="{
              type: 'smoothstep',
              animated: false,
              style: { stroke: '#4B5563', strokeWidth: 2 },
            }"
            fit-view-on-init
            class="basicflow"
            style="background-color: #0d0d12"
            @node-click="onNodeClick"
            @pane-click="onPaneClick"
          >
            <Background
              pattern-color="#393939"
              color="#292932"
              :gap="40"
              :size="3"
            />
            <Controls :show-interactive="false" />
          </VueFlow>
        </div>
        <template #fallback>
          <div class="flex items-center justify-center h-full w-full">
            <div class="loading loading-spinner loading-lg text-blue-500"></div>
          </div>
        </template>
      </ClientOnly>
    </div>
  </div>
</template>

<script setup lang="ts">
import { VueFlow } from "@vue-flow/core";
import { Background } from "@vue-flow/background";
import { Controls } from "@vue-flow/controls";
import "@vue-flow/core/dist/style.css";
import "@vue-flow/core/dist/theme-default.css";
import "@vue-flow/controls/dist/style.css";
import { useRouter } from "vue-router";
import { useSupabaseUser } from "#imports";
import Header from "~/components/Header.vue";
import { useMindMapStore } from "~/stores/mindMapStore";
import MindMapNode from "~/components/canvas/MindMapNode.vue";

// Define node types for Vue Flow
const nodeTypes = {
  custom: MindMapNode,
};

// Initialize store
const store = useMindMapStore();
const elements = computed(() => store.visibleElements);

// Search functionality
interface SearchResult {
  id: string;
  label: string;
}

const searchQuery = ref("");
const searchResults = ref<SearchResult[]>([]);

// Handle search input
const handleSearch = () => {
  if (!searchQuery.value.trim()) {
    searchResults.value = [];
    return;
  }

  const query = searchQuery.value.toLowerCase();
  const results: SearchResult[] = [];

  // Simple search implementation
  const searchNodes = (nodes: any[]) => {
    nodes.forEach((node) => {
      if (node.data?.label?.toLowerCase().includes(query)) {
        results.push({ id: node.id, label: node.data.label });
      }
      if (node.data?.children) {
        searchNodes(node.data.children);
      }
    });
  };

  searchNodes(store.nodes);
  searchResults.value = results;
};

// Handle node click
const onNodeClick = (_event: Event, node: any) => {
  console.log("Node clicked:", node);
};

// Handle pane click (background click)
const onPaneClick = () => {
  searchResults.value = [];
};

// Handle search result selection
const selectSearchResult = (result: SearchResult) => {
  console.log("Selected result:", result);
  searchQuery.value = "";
  searchResults.value = [];
};

// User authentication
const user = useSupabaseUser();
const router = useRouter();

// Redirect to login if not authenticated
if (process.client && !user.value) {
  await router.push("/login");
}
</script>

<style scoped>
.vue-flow-wrapper {
  width: 100%;
  height: 100%;
  background-color: #0d0d12;
}

.vue-flow-container {
  width: 100%;
  height: 100%;
}

:deep(.vue-flow__node) {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  cursor: grab;
}

:deep(.vue-flow__node.dragging) {
  cursor: grabbing;
  z-index: 1000;
  transform: scale(1.02);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

:deep(.vue-flow) {
  background-color: #0d0d12;
}
</style>
