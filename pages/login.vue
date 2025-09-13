<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-[#0D0D12]"
  >
    <div
      class="bg-[#1C1C21] border border-[#292932] p-8 rounded-lg shadow-md w-full max-w-sm"
    >
      <div class="flex items-center justify-center mb-6">
        <Logo class="h-10" />
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
        <div class="mt-4">
          <Button type="submit" fullWidth :disabled="isLoading" class="w-full">
            <template v-if="!isLoading">Entrar</template>
            <template v-else>
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
            </template>
          </Button>

          <!-- Separador OU -->
          <div class="flex items-center gap-4 my-6">
            <div class="h-px bg-[#2C2B30] flex-1"></div>
            <span class="text-[#A6A6A6] text-sm">OU</span>
            <div class="h-px bg-[#2C2B30] flex-1"></div>
          </div>

          <!-- Botão Google -->
          <button
            type="button"
            @click="handleGoogleLogin"
            :disabled="isLoading || isLoadingGoogle"
            class="w-full flex items-center justify-center gap-3 border border-[#47464B] rounded px-4 py-3 bg-transparent hover:bg-[#2C2B30] disabled:opacity-60"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              class="w-5 h-5"
              aria-hidden="true"
            >
              <path
                fill="#FFC107"
                d="M43.611 20.083H42V20H24v8h11.303C33.837 32.329 29.28 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.156 7.961 3.039l5.657-5.657C34.676 6.053 29.583 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.651-.389-3.917z"
              />
              <path
                fill="#FF3D00"
                d="M6.306 14.691l6.571 4.817C14.297 16.108 18.777 12 24 12c3.059 0 5.842 1.156 7.961 3.039l5.657-5.657C34.676 6.053 29.583 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
              />
              <path
                fill="#4CAF50"
                d="M24 44c5.217 0 10.26-1.986 14.016-5.59l-6.465-5.469C29.522 34.316 26.937 35.2 24 35.2c-5.247 0-9.716-3.35-11.329-8.005l-6.54 5.036C8.452 39.554 15.676 44 24 44z"
              />
              <path
                fill="#1976D2"
                d="M43.611 20.083H42V20H24v8h11.303C34.797 31.241 29.83 35.2 24 35.2c-5.247 0-9.716-3.35-11.329-8.005l-6.54 5.036C8.452 39.554 15.676 44 24 44c9.941 0 19.2-7.2 19.2-20 0-1.341-.138-2.651-.389-3.917z"
              />
            </svg>
            <span class="text-white">Entrar com o Google</span>
          </button>
        </div>
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

<script setup lang="ts">
// Components
import Button from "~/components/ui/Button.vue";
import Logo from "~/components/icon/Logo.vue";

// State
const email = ref("");
const password = ref("");
const error = ref("");
const isLoading = ref(false);
const isLoadingGoogle = ref(false);

const handleGoogleLogin = async () => {
  error.value = "";
  try {
    isLoadingGoogle.value = true;
    const { error: googleError } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (googleError) throw googleError;
    // O Supabase redireciona automaticamente
  } catch (err: any) {
    error.value =
      err?.message || "Não foi possível iniciar o login com o Google.";
  } finally {
    isLoadingGoogle.value = false;
  }
};

// Composable
const router = useRouter();
const supabase = useSupabaseClient();

// Nuxt 3 auto-imports these:
// - ref, useRouter, useSupabaseClient, NuxtLink

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
  -webkit-box-shadow: 0 0 0 30px #2c2b30 inset !important;
  -webkit-text-fill-color: white !important;
  transition: background-color 5000s ease-in-out 0s;
}

body {
  background: #f9fafb;
}
</style>
