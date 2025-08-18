<script setup>
definePageMeta({ layout: "blank" });
import { ref } from "vue";
import { useRouter } from "vue-router";
import Logo from "~/components/icon/Logo.vue";

const supabase = useSupabaseClient();
const router = useRouter();

const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const errorMessage = ref("");
const successMessage = ref("");
const loading = ref(false);

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
    class="flex flex-col items-center justify-center min-h-screen bg-[#17171C]"
  >
    <div
      class="bg-[#17171C] border border-[#47464B] p-8 rounded-lg shadow-md w-full max-w-sm"
    >
      <div class="flex items-center justify-center mb-6">
        <Logo class="w-8 h-8" />
        <h2 class="text-xl ml-1 font-light text-white">Gold Miner</h2>
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
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition flex items-center justify-center"
          :disabled="loading"
        >
          <svg
            v-if="loading"
            class="animate-spin h-5 w-5 mr-2 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          <span>
            {{ loading ? "Cadastrando..." : "Cadastrar" }}
          </span>
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
