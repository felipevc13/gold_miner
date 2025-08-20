// Faz o TS tratar 'vue/dist/vue' como 'vue' (reexporta tudo).
declare module "vue/dist/vue" {
  export * from "vue";
  export { default } from "vue";
}
