// Type definitions for @vue-flow/controls

declare module '@vue-flow/controls' {
  import { DefineComponent } from 'vue';
  
  export const Controls: DefineComponent<{
    showZoom?: boolean;
    showFitView?: boolean;
    showInteractive?: boolean;
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  }>;
  
  export const ControlButton: DefineComponent<{
    class?: string;
    style?: string | Record<string, any>;
    title?: string;
    disabled?: boolean;
  }>;
}
