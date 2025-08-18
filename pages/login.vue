<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-[#17171C]"
  >
    <div
      class="bg-[#17171C] border border-[#47464B] p-8 rounded-lg shadow-md w-full max-w-sm"
    >
      <div class="flex items-center justify-center mb-6">
        <Logo class="w-8 h-8" />
        <h2 class="text-xl ml-1 font-light text-white">Gold Miner</h2>
      </div>

      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label class="block text-white mb-2 font-light" for="email"
            >E-mail</label
          >
          <input
            v-model="email"
            id="email"
            type="email"
            autocomplete="email"
            required
            class="w-full px-3 py-2 border border-[#47464B] rounded text-white bg-[#2C2B30] autofill-bg"
          />
        </div>
        <div class="mb-6">
          <label class="block text-white mb-2 font-light" for="password"
            >Senha</label
          >
          <input
            v-model="password"
            id="password"
            type="password"
            autocomplete="current-password"
            required
            class="w-full px-3 py-2 border border-[#47464B] rounded text-white bg-[#2C2B30] autofill-bg"
          />
        </div>
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          :disabled="isLoading"
        >
          <span v-if="!isLoading">Entrar</span>
          <span v-else class="flex items-center justify-center">
            <svg
              class="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                class="opacity-75"
                fill="currentColor"
                d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 18V4a8 8 0 010 16z"
              />
            </svg>
            <span class="ml-2">Entrando...</span>
          </span>
        </button>
        <p v-if="error" class="mt-4 text-red-600 text-center">{{ error }}</p>
      </form>
      <p class="block mt-6 text-sm text-center text-white">
        Não tem uma conta?
        <NuxtLink
          to="/register"
          class="mt-6 text-sm text-blue-600 hover:underline text-center"
        >
          Cadastre-se
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: "blank" });
import { ref } from "vue";
import { useRouter } from "vue-router";
const email = ref("");
const password = ref("");
const error = ref("");
const isLoading = ref(false);
const router = useRouter();
const supabase = useSupabaseClient();
import Logo from "~/components/icon/Logo.vue";
import { NuxtLink } from "#components";

async function handleLogin() {
  isLoading.value = true;
  error.value = "";
  const { error: loginError } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });

  if (loginError) {
    error.value = "E-mail ou senha inválidos.";
    isLoading.value = false;
    return;
  } else {
    // Aguarda tarefas carregarem, passando o client
    await router.replace("/app");

    isLoading.value = false;
  }
}
</script>

<style scoped>
/* Autofill styles */
:deep(input.autofill-bg:-webkit-autofill),
:deep(input.autofill-bg:-webkit-autofill:hover), 
:deep(input.autofill-bg:-webkit-autofill:focus), 
:deep(input.autofill-bg:-webkit-autofill:active) {
  -webkit-box-shadow: 0 0 0 30px #2C2B30 inset !important;
  -webkit-text-fill-color: white !important;
  transition: background-color 5000s ease-in-out 0s;
}

body {
  background: #f9fafb;
}
</style>
