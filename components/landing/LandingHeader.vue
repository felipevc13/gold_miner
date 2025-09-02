<template>
  <header
    class="w-full bg-[#0D0D12] px-6 py-4 flex items-center justify-between shadow-sm border-b border-[#232323]"
  >
    <NuxtLink to="/" class="flex items-center gap-2">
      <!-- Substitua pelo componente/logo real caso exista -->
      <Logo class="w-8 h-8" />
      <span class="text-xl font-light text-white">Gold Miner</span>
    </NuxtLink>
    <Button to="/register" class="!w-auto !px-4 text-sm">
      Participe da Criação e Garanta seu Acesso Antecipado
    </Button>
  </header>
</template>

<script setup>
import Logo from "~/components/icon/Logo.vue";
import Button from "~/components/ui/Button.vue";
</script>
