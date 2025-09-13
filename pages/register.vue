<script setup lang="ts">
definePageMeta({ layout: "blank" });
import { useRouter } from "vue-router";
import Logo from "~/components/icon/Logo.vue";
import Button from "~/components/ui/Button.vue";

const supabase = useSupabaseClient();
const router = useRouter();

const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const errorMessage = ref("");
const successMessage = ref("");
const loading = ref(false);
const loadingGoogle = ref(false);

const handleGoogleRegister = async () => {
  errorMessage.value = "";
  successMessage.value = "";
  try {
    loadingGoogle.value = true;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) throw error;
    // O Supabase vai redirecionar automaticamente após o OAuth.
  } catch (err: any) {
    errorMessage.value =
      err?.message || "Não foi possível iniciar o login com o Google.";
  } finally {
    loadingGoogle.value = false;
  }
};

const handleRegister = async () => {
  errorMessage.value = "";
  successMessage.value = "";
  if (password.value !== confirmPassword.value) {
    errorMessage.value = "As senhas não coincidem.";
    return;
  }
  loading.value = true;
  const { error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
  });
  loading.value = false;
  if (error) {
    errorMessage.value = error.message;
  } else {
    successMessage.value =
      "Cadastro realizado com sucesso! Verifique seu email.";
    setTimeout(() => {
      router.push("/login");
    }, 2000);
  }
};
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
</style>

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
      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <label class="block text-white mb-2 font-light" for="email"
            >Email</label
          >
          <input
            id="email"
            v-model="email"
            type="email"
            autocomplete="email"
            class="w-full px-3 py-2 border border-[#47464B] rounded text-white bg-[#2C2B30] focus:bg-[#2C2B30] autofill-bg"
            required
          />
        </div>
        <div>
          <label class="block text-white mb-2 font-light" for="password"
            >Senha</label
          >
          <input
            id="password"
            v-model="password"
            type="password"
            autocomplete="new-password"
            class="w-full px-3 py-2 border border-[#47464B] rounded text-white bg-[#2C2B30] autofill-bg"
            required
          />
        </div>
        <div>
          <label class="block text-white mb-2 font-light" for="confirmPassword"
            >Confirmar senha</label
          >
          <input
            id="confirmPassword"
            v-model="confirmPassword"
            type="password"
            autocomplete="new-password"
            class="w-full px-3 py-2 border border-[#47464B] rounded text-white bg-[#2C2B30] autofill-bg"
            required
          />
        </div>
        <div v-if="errorMessage" class="mt-4 text-red-600 text-center">
          {{ errorMessage }}
        </div>
        <div v-if="successMessage" class="mt-4 text-green-500 text-center">
          {{ successMessage }}
        </div>
        <Button type="submit" :disabled="loading" fullWidth class="w-full">
          {{ loading ? "Cadastrando..." : "Cadastrar" }}
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
          @click="handleGoogleRegister"
          :disabled="loading || loadingGoogle"
          class="w-full flex items-center justify-center gap-3 border border-[#47464B] rounded px-4 py-3 bg-transparent hover:bg-[#2C2B30] disabled:opacity-60"
        >
          <!-- Ícone Google SVG -->
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
          <span class="text-white">Cadastre com o Google</span>
        </button>
      </form>
      <p class="block mt-6 text-sm text-center text-white">
        Já tem uma conta?
        <NuxtLink to="/login" class="text-blue-600 hover:underline"
          >Entrar</NuxtLink
        >
      </p>
    </div>
  </div>
</template>
