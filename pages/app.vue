<template>
  <div class="vue-flow-wrapper h-full w-full relative flex flex-col">
    <Header class="mb-[-72px] z-11" />

    <!-- Search Card -->
    <div class="absolute top-16 left-4 z-10">
      <SearchCard
        v-model="searchQuery"
        placeholder="ex: 'saúde para idosos', 'produtividade'"
        @search="handleSearch"
        class="w-[300px]"
      >
        <template #results>
          <div
            v-if="searchResults.length > 0"
            class="mt-2 w-full bg-[#2C2B30] border border-[#47464B] rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto"
          >
            <div
              v-for="result in searchResults"
              :key="result.id"
              class="px-4 py-2 hover:bg-[#3a393e] cursor-pointer text-white text-sm"
              @click="selectSearchResult(result)"
            >
              {{ result.label }}
            </div>
          </div>
        </template>
      </SearchCard>
    </div>

    <!-- Main Canvas Area -->
    <div class="flex-1 relative">
      <ClientOnly>
        <div ref="flowContainerRef" class="vue-flow-container absolute inset-0">
          <VueFlow
            v-model:nodes="modelNodes"
            v-model:edges="modelEdges"
            :node-types="nodeTypes"
            :default-viewport="{ zoom: 0.8 }"
            :min-zoom="0.5"
            :max-zoom="4"
            :snap-to-grid="false"
            :elevate-nodes-on-select="true"
            :nodes-draggable="false"
            :nodes-connectable="false"
            :edges-updatable="false"
            :elements-selectable="false"
            :default-edge-options="{
              type: 'smoothstep',
              style: { stroke: '#6b7280', strokeWidth: 1.5 },
              animated: false,
            }"
            :node-extent="[
              [0, 0],
              [Infinity, Infinity],
            ]"
            fit-view-on-init
            class="basicflow"
            style="background-color: #0d0d12"
            @node-click="onNodeClick"
            @pane-click="onPaneClick"
            @init="onFlowInit"
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

<script setup>
import { markRaw } from "vue";
import { VueFlow, useVueFlow } from "@vue-flow/core";
import { Background } from "@vue-flow/background";
import { Controls } from "@vue-flow/controls";
import "@vue-flow/core/dist/style.css";
import "@vue-flow/core/dist/theme-default.css";
import "@vue-flow/controls/dist/style.css";

// Components
import Header from "~/components/Header.vue";
import SearchCard from "~/components/SearchCard.vue";
import MindMapNode from "~/components/canvas/MindMapNode.vue";

// Store
import { useMindMapStore } from "~/stores/mindMapStore";

// Composable
const router = useRouter();
const user = useSupabaseUser();
const mindMapStore = useMindMapStore();

// Reactive state
const searchQuery = ref("");
const searchResults = ref([]);
const flowContainerRef = ref(null);

const modelNodes = ref([]);
const modelEdges = ref([]);

const { fitView, viewportInitialized } = useVueFlow();

const flowReady = ref(false);
const onFlowInit = () => {
  flowReady.value = true;
  // wait next tick to ensure DOM nodes are measured
  nextTick(() => {
    try {
      fitView({ padding: 0.2 });
    } catch (e) {
      /* ignore */
    }
  });
};

watch(
  modelNodes,
  async () => {
    await nextTick();
    if (!flowReady.value || !viewportInitialized?.value) return;
    try {
      fitView({ padding: 0.2 });
    } catch (e) {
      /* ignore */
    }
  },
  { immediate: true }
);

watch(
  () => mindMapStore.flowNodes,
  (val) => {
    // Always replace array reference so VueFlow receives updates
    modelNodes.value = Array.isArray(val) ? [...val] : [];
  },
  { immediate: true }
);

watch(
  () => mindMapStore.flowEdges,
  (val) => {
    modelEdges.value = Array.isArray(val) ? [...val] : [];
  },
  { immediate: true }
);

// Computed properties

const nodeTypes = {
  custom: markRaw(MindMapNode),
};

// Handle node click (supports both (event, node) and (node) signatures)
const onNodeClick = (arg1, arg2) => {
  const node = arg2 && arg2.id ? arg2 : arg1 && arg1.id ? arg1 : null;
  if (!node || !node.data) return;

  // Use data.level semantics; fallback to old data.type if present
  const level = node.data.level ?? node.data.type ?? null;
  const isRoot = !!node.data.isRoot;

  // Toggle expand/collapse when root or when node has children
  if (isRoot || (node.data.children && node.data.children.length)) {
    try {
      mindMapStore.toggleNode(node.id);
    } catch (e) {
      console.warn("onNodeClick toggle failed:", e);
    }
  }
};

// Handle pane click (background click)
const onPaneClick = () => {
  searchResults.value = [];
};

// Search functionality
const handleSearch = () => {
  if (!searchQuery.value.trim()) {
    searchResults.value = [];
    return;
  }

  const query = searchQuery.value.toLowerCase();
  const results = [];

  // Simple search implementation
  const searchNodes = (nodes) => {
    nodes.forEach((node) => {
      if (node.data?.label?.toLowerCase().includes(query)) {
        results.push({ id: node.id, label: node.data.label });
      }
      if (node.data?.children) {
        searchNodes(node.data.children);
      }
    });
  };

  searchNodes(mindMapStore.nodes);
  searchResults.value = results;
};

// Handle search result selection
const selectSearchResult = (result) => {
  // TODO: Implement search result selection
  searchQuery.value = "";
  searchResults.value = [];
};

// Redirect to login if not authenticated
onMounted(() => {
  if (process.client && !user.value) {
    router.push("/login");
  }
});
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

:deep(.vue-flow__edge-path) {
  pointer-events: none;
}
</style>
