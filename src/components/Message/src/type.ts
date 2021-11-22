import Vue from 'vue'

export type MessageType = 'success' | 'warning' | 'info' | 'error' | 'loading'

export type MessagePosition = 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

export interface MessageProps {
  timeout: number
  position: MessagePosition
  multiLine: boolean
  vertical: boolean
  elevation: number | string
  flat: boolean
  centered: boolean
  rounded: boolean | string
  outlined: boolean
  shaped: boolean
  text: string | (() => string)
  type: MessageType
  color: string
  onClose: () => void
  showClose: boolean
  showIcon: boolean
}

export declare class MessageComponent extends Vue implements Partial<MessageProps> {
  timeout?: number
  position?: MessagePosition
  text?: string | (() => string)
  type?: MessageType

  $el: HTMLElement
  id: string
  key?: string
  verticalOffset: number
  isActive: boolean
  top: number
  close(): void
  resetTimer?(): void
}

export interface CloseEventHandler {
  (instance: MessageComponent): void
}

export interface MessageOptions extends Partial<Omit<MessageProps, 'onClose'>> {
  key?: string
  onClose?: CloseEventHandler
}
