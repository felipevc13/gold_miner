<template>
  <div class="tally-container">
    <iframe
      data-tally-src="https://tally.so/r/w5J6oP"
      width="100%"
      height="100%"
      frameborder="0"
      marginheight="0"
      marginwidth="0"
      title="Me ajude a validar uma ideia (para validadores de ideias!)"
    ></iframe>
  </div>
</template>

<script setup>
// Adiciona o script do Tally ao cabeçalho da página de forma programática
useHead({
  script: [
    {
      src: "https://tally.so/widgets/embed.js",
      async: true,
    },
  ],
});

// Define um layout "blank" para esta página específica, se necessário
// para que ela ocupe a tela inteira sem o header/footer do seu site principal.
// Certifique-se de que você tem um arquivo layouts/blank.vue
definePageMeta({
  layout: "blank",
});
</script>

<style scoped>
/* Estilo para garantir que o iframe ocupe a tela inteira */
.tally-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

iframe {
  width: 100%;
  height: 100%;
  border: 0;
}
</style>
