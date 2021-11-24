import Vue from 'vue'

import type { InputValidationRules } from 'vuetify/types'

export type MessageBoxType = 'confirm' | 'alert' | 'prompt'
export type MessageBoxColorType = 'success' | 'warning' | 'info' | 'error'
export interface MessageBoxActions {
  false?: {
    text?: string | (() => string)
    color?: string
  }
  true?: {
    text?: string | (() => string)
    color?: string
  }
}

export interface InstallationMessageOptions extends MessageBoxActions {
  alert?: Pick<MessageBoxActions, 'true'> & { width?: number }
  prompt?: MessageBoxActions & { width?: number }
  confirm?: MessageBoxActions & { width?: number }
}

export interface MessageBoxOptions {
  type: MessageBoxColorType
  width: number
  persistent: boolean
  scrollable: boolean
  color: string
  text: string | (() => string)
  title: string | (() => string) | false
  contentClass: string
  actions: Partial<MessageBoxActions>
  icon: string | boolean
  showClose: boolean
  showIcon: boolean
  rules: InputValidationRules
  beforeClose: (text: string) => Promise<boolean>
  textFieldProps: Record<string, any>
}

export interface MessageBoxProps extends MessageBoxOptions {
  $type: MessageBoxType
}

export declare class MessageBoxComponent extends Vue implements Partial<MessageBoxProps> {
  id: string
  isActive: boolean
  disabled: boolean
  handleAction: (key: 'cancel' | 'confirm') => void
  type?: MessageBoxColorType
}
