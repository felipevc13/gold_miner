<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 w-full bg-[#0D0D12] px-6 py-4 flex items-center justify-between shadow-sm border-b border-[#232323]"
  >
    <div
      class="w-full max-w-[1200px] mx-auto flex items-center justify-between"
    >
      <NuxtLink to="/" class="flex items-center gap-2">
        <!-- Substitua pelo componente/logo real caso exista -->
        <Logo class="w-8 h-8" />
        <span class="text-xl font-light text-white">Gold Miner</span>
      </NuxtLink>
      <Button to="/register" class="!w-auto !px-4 text-sm">
        Participe da Criação e Garanta seu Acesso Antecipado
      </Button>
    </div>
  </header>
</template>

<script setup>
import Logo from "~/components/icon/Logo.vue";
import Button from "~/components/ui/Button.vue";
</script>
