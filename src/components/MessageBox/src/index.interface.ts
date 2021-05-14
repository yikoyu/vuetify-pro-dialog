export type MessageBoxType = 'success' | 'warning' | 'info' | 'error'

export interface MessageBoxOption {
  text?: string
  title?: string
  type?: string
  $type?: string
  showClose?: boolean
  showIcon?: boolean
  actions?: {
    false?: {
      text: string | (() => string)
      color?: string
    }
    true?: {
      text: string | (() => string)
      color?: string
    }
  }
  width?: number
  persistent?: boolean
  scrollable?: boolean
  rules?: any[]
  beforeClose?: Promise<boolean>
  textField?: { [x: string]: any }
}
