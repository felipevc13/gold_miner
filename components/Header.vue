<!-- components/Header.vue -->
<template>
  <header
    class="text-white py-4 px-6 flex items-center justify-between w-full z-10 h-[72px]"
  >
    <!-- Logo -->
    <div class="flex items-center">
      <h1 class="text-xl font-semibold">Gold Miner</h1>
    </div>

    <!-- Menu Hamburger -->
    <div class="relative" ref="dropdownRef">
      <button
        @click.stop="isOpen = !isOpen"
        class="p-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
      >
        <Bars3Icon class="h-6 w-6 text-white" />
      </button>

      <!-- Dropdown Menu -->
      <div
        v-if="isOpen"
        class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-[#2d2d2f] ring-1 ring-black ring-opacity-5 focus:outline-none"
        role="menu"
        aria-orientation="vertical"
        tabindex="-1"
      >
        <div class="py-1" role="none">
          <button
            @click="handleLogout"
            class="text-gray-200 hover:bg-gray-700 block w-full text-left px-4 py-2 text-sm"
            role="menuitem"
          >
            Sair
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { Bars3Icon } from "@heroicons/vue/24/outline";

const isOpen = ref(false);
const dropdownRef = ref(null);
const router = useRouter();

const closeMenu = () => {
  isOpen.value = false;
};

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    closeMenu();
  }
};

const handleLogout = async () => {
  try {
    // Aqui você pode adicionar a lógica de logout se estiver usando autenticação
    // Por exemplo: await supabase.auth.signOut();

    // Redireciona para a página inicial
    await router.push("/");
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
  } finally {
    closeMenu();
  }
};

// Configura o event listener para clique fora após a montagem do componente
onMounted(() => {
  // Usamos setTimeout para garantir que o event listener só seja adicionado
  // após o clique que abriu o menu ser processado
  setTimeout(() => {
    document.addEventListener("click", handleClickOutside);
  }, 0);
});

// Remove o event listener quando o componente é desmontado
onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
