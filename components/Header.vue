<template>
  <header
    class="absolute top-0 left-0 w-full px-8 py-4 border-b border-b-[#1C1C21] z-50"
  >
    <div class="flex items-center justify-between">
      <!-- Lado Esquerdo: Logo e Nome -->
      <NuxtLink to="/" class="flex items-center gap-x-3">
        <Logo class="h-8" />
      </NuxtLink>

      <!-- Lado Direito: Botão de Login -->
      <NuxtLink to="/login" custom v-slot="{ navigate }">
        <Button @click="navigate"> Logar </Button>
      </NuxtLink>
    </div>
  </header>
</template>

<script setup>
import Logo from "~/components/icon/Logo.vue";
import Button from "~/components/ui/Button.vue";
</script>
