declare module 'v-click-outside' {
  import { DirectiveFunction } from 'vue';
  
  const vClickOutside: {
    install: (app: any) => void;
  };
  
  export default vClickOutside;
}
