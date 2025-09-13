<template>
  <div class="bg-[#0D0D12] min-h-screen text-neutral-100">
    <!-- Nosso novo header já está aqui -->
    <Header />

    <!-- Conteúdo Principal da Página -->
    <main
      class="flex flex-col items-center justify-center min-h-screen px-4 text-center"
    >
      <div class="max-w-3xl w-full">
        <!-- Tag de Contexto -->
        <div
          class="inline-block bg-[#8e6ce446] text-sm px-4 py-1 rounded-full mb-4 text-[#C4B3F1]"
        >
          Transforme sua ideia em confiança
        </div>

        <!-- Headline -->
        <h1 class="text-5xl md:text-6xl font-bold leading-tight">
          Valide sua <span class="text-[#8E6CE4]">paixão</span> em minutos, com
          <span class="text-[#8E6CE4]">dados reais</span> e insights de IA.
        </h1>

        <!-- Formulário de Input -->
        <div class="mt-12 relative">
          <textarea
            id="idea-textarea"
            v-model="ideaInput"
            rows="3"
            class="w-full bg-[#1C1C21] border border-neutral-700 rounded-xl p-4 pr-16 pb-14 text-lg placeholder:text-[#A6A6A6] focus:ring-2 focus:ring-primary-500 focus:outline-none transition"
          ></textarea>
          <div class="absolute bottom-6 right-4 z-10">
            <Button
              size="icon"
              @click="validateIdea"
              aria-label="Validar ideia"
            >
              <template #iconLeft>
                <ArrowUp />
              </template>
            </Button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Typed from "typed.js";
import Header from "~/components/Header.vue";
import ArrowUp from "~/components/icon/ArrowUp.vue";
import Button from "~/components/ui/Button.vue";

const ideaInput = ref("");

function validateIdea() {
  // Aqui virá a lógica para o próximo passo (abrir o modal de cadastro/login)
  console.log("Ideia a ser validada:", ideaInput.value);
  alert("Próximo passo: Abrir o modal de cadastro!");
}

onMounted(() => {
  const element = document.getElementById("idea-textarea");
  if (element) {
    new Typed(element, {
      attr: "placeholder",
      strings: [
        "Um app de yoga com IA que corrige a postura em tempo real",
        "Uma plataforma de estudos com IA que cria quizzes personalizados",
        "Um assistente virtual que ajuda a organizar tarefas diárias",
      ],
      typeSpeed: 60,
      backSpeed: 30,
      loop: true,
      showCursor: false,
    });
  }
});
</script>
