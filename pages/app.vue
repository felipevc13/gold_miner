<!-- components/TaskFlow.vue -->
<template>
  <div class="vue-flow-wrapper h-full w-full relative flex flex-col">
    <Header class="mb-[-72px] z-10" />
    <div class="flex-1 relative">
      <ClientOnly>
        <div ref="flowContainerRef" class="vue-flow-container absolute inset-0">
          <VueFlow
            :default-viewport="{ zoom: 1 }"
            :min-zoom="0.2"
            :max-zoom="4"
            :snap-to-grid="true"
            :snap-grid="[15, 15]"
            :elevate-nodes-on-select="true"
            class="basicflow"
          >
            <Background
              pattern-color="#393939"
              color="#393939"
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
import "@vue-flow/core/dist/style.css";
import "@vue-flow/core/dist/theme-default.css";
import { useRouter } from 'vue-router';
import { useSupabaseUser } from '#imports';
import Header from "~/components/Header.vue";

// Usando composable do Nuxt para acessar o usuário e navegação
const user = useSupabaseUser();
const router = useRouter();

// Redireciona para a página de login se o usuário não estiver autenticado
if (process.client && !user.value) {
  await router.push('/login');
}

// Se precisar de mais dados do usuário, você pode usar:
// const { data: userData } = await useAsyncData('user', () => $fetch('/api/auth/user'));
</script>

<style scoped>
.vue-flow-wrapper {
  width: 100%;
  height: 100%;
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
  background-color: #1d1d1f;
}
</style>

<style scoped>
.vue-flow-wrapper {
  width: 100%;
  height: 100%;
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
  background-color: #1d1d1f;
}
</style>
