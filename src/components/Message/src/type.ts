import Vue, { VNodeChildren, VNode } from 'vue'

export type MessageType = 'success' | 'warning' | 'info' | 'error' | 'loading'

export type MessagePosition = 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

interface Fn<T = any, R = T> {
  (...arg: T[]): R
}

export interface CloseEventHandler {
  (instance: MessageComponent): void
}

export interface MessageOptions {
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
  text: string | (() => string | VNodeChildren | VNode | undefined)
  type: MessageType
  color: string
  showIcon: boolean
  action: boolean | ((props: { attrs: Record<string, any>; on: { click: Fn } }) => any)
  key: string
  onClose?: CloseEventHandler
}

export interface MessageProps extends Omit<MessageOptions, 'key'> {
  onClose: () => void
}

export declare class MessageComponent extends Vue implements Partial<MessageProps> {
  timeout: number
  position: MessagePosition
  vertical: boolean
  text: string | (() => string)
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
