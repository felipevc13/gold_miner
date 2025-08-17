<!-- layouts/default.vue -->
<template>
  <div class="flex min-h-screen">
    <!-- Futuramente, o <SideNav /> entrará aqui -->
    <main class="flex-1">
      <!-- Mude de <NuxtPage /> para <slot /> -->
      <slot />
    </main>
  </div>
</template>
