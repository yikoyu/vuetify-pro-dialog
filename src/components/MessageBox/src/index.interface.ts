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
      text: string | Function
      color?: string
    }
    true?: {
      text: string | Function
      color?: string
    }
  },
  width?: number
  persistent?: boolean
  scrollable?: boolean
  rules?: Function[]
  beforeClose?: Promise<boolean>
  textField?: { [x: string]: any }
}