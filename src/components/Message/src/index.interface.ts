export type MessageType = 'success' | 'warning' | 'info' | 'error'

export type MessagePosition = 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

export interface MessageOption {
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
  onClose?: () => void
}
