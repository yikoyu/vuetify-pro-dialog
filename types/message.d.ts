import Vue from 'vue'

export type MessageType = 'success' | 'warning' | 'info' | 'error' | 'loading'

export type MessagePosition = 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

export declare class VuetifyProMessageComponent extends Vue {
  close (): void
}

export interface CloseEventHandler {
  (instance: VuetifyProMessageComponent): void
}

export interface VuetifyProMessageOptions {
  type?: MessageType
  key?: string
  showClose?: boolean
  showIcon?: boolean
  color?: string
  timeout?: number
  position?: MessagePosition
  multiLine?: boolean
  vertical?: boolean
  elevation?: number | string
  flat?: boolean
  centered?: boolean
  rounded?: boolean | string
  outlined?: boolean
  shaped?: boolean
  onClose?: CloseEventHandler
}

export interface VuetifyProMessageLoadingOptions {
  key?: string
  color?: string
  elevation?: number | string
  flat?: boolean
  centered?: boolean
  rounded?: boolean | string
  outlined?: boolean
  shaped?: boolean
  onClose?: CloseEventHandler
}

export interface VuetifyProMessageLoading {
  (text: string, options?: VuetifyProMessageLoadingOptions): VuetifyProMessageComponent
}

export interface VuetifyProMessage {
  (text: string, options?: VuetifyProMessageOptions): VuetifyProMessageComponent

  success(text: string, options?: VuetifyProMessageOptions): VuetifyProMessageComponent

  warning(text: string, options?: VuetifyProMessageOptions): VuetifyProMessageComponent

  info(text: string, options?: VuetifyProMessageOptions): VuetifyProMessageComponent

  error(text: string, options?: VuetifyProMessageOptions): VuetifyProMessageComponent

  notify: {
    (text: string, options?: VuetifyProMessageOptions): VuetifyProMessageComponent

    success(text: string, options?: VuetifyProMessageOptions): VuetifyProMessageComponent

    warning(text: string, options?: VuetifyProMessageOptions): VuetifyProMessageComponent
  
    info(text: string, options?: VuetifyProMessageOptions): VuetifyProMessageComponent
  
    error(text: string, options?: VuetifyProMessageOptions): VuetifyProMessageComponent
  }

  loading(text: string, options?: VuetifyProMessageLoadingOptions): VuetifyProMessageComponent

  closeAll(): void
}

export interface VuetifyProDialogMessage {
  message: {
    (text: string, options?: VuetifyProMessageOptions): VuetifyProMessageComponent

    success(text: string, options?: VuetifyProMessageOptions): VuetifyProMessageComponent

    warning(text: string, options?: VuetifyProMessageOptions): VuetifyProMessageComponent

    info(text: string, options?: VuetifyProMessageOptions): VuetifyProMessageComponent

    error(text: string, options?: VuetifyProMessageOptions): VuetifyProMessageComponent
  }

  notify: {
    (text: string, options?: VuetifyProMessageOptions): VuetifyProMessageComponent

    success(text: string, options?: VuetifyProMessageOptions): VuetifyProMessageComponent

    warning(text: string, options?: VuetifyProMessageOptions): VuetifyProMessageComponent
  
    info(text: string, options?: VuetifyProMessageOptions): VuetifyProMessageComponent
  
    error(text: string, options?: VuetifyProMessageOptions): VuetifyProMessageComponent
  }

  loading(text: string, options?: VuetifyProMessageLoadingOptions): VuetifyProMessageComponent

  closeAll(): void
}
