<template>
  <div class="min-h-screen w-screen overflow-x-hidden">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
/* Import Tailwind CSS */
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

/* Import Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');

/* Estilos globais */
html, body {
  width: 100%;
  max-width: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

body {
  @apply bg-gray-50 text-gray-900 font-sans;
  width: 100%;
  min-height: 100vh;
  position: relative;
}

/* Garante que elementos não ultrapassem a largura da tela */
*, *::before, *::after {
  box-sizing: border-box;
}

/* Previne que imagens e elementos de mídia causem overflow */
img, video, iframe, svg {
  max-width: 100%;
  height: auto;
}

/* Garante que elementos com largura fixa não causem scroll horizontal */
.container, .container-fluid {
  width: 100%;
  padding-right: 1rem;
  padding-left: 1rem;
  margin-right: auto;
  margin-left: auto;
}
</style>
