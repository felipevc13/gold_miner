<!-- layouts/default.vue -->
<template>
  <div class="w-full min-h-screen flex flex-col">
    <!-- Futuramente, o <SideNav /> entrará aqui -->
    <main class="flex-1 w-full">
      <slot />
    </main>
  </div>
</template>
