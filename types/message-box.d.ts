export type MessageBoxType = 'success' | 'warning' | 'info' | 'error'

export interface VuetifyProMessageBoxOptions {
  type?: MessageBoxType
  showClose?: boolean
  showIcon?: boolean
  width?: number
  persistent?: boolean
  scrollable?: boolean
}

export interface VuetifyProMessageBoxAlertNoTitleOptions extends VuetifyProMessageBoxOptions {
  actions?: {
    true?: {
      text: string | Function
      color?: string
    }
  },
}

export interface VuetifyProMessageBoxConfirmNoTitleOptions extends VuetifyProMessageBoxOptions {
  actions?: {
    true?: {
      text: string | Function
      color?: string
    },
    false?: {
      text: string | Function
      color?: string
    }
  },
}

export interface VuetifyProMessageBoxPromptNoTitleOptions extends VuetifyProMessageBoxOptions {
  actions?: {
    true?: {
      text: string | Function
      color?: string
    },
    false?: {
      text: string | Function
      color?: string
    }
  },
  rules: Function[]
  beforeClose?: (text: string) => Promise<boolean>
  textField?: { [x: string]: any }
}

export interface VuetifyProMessageBoxAlertOptions extends VuetifyProMessageBoxAlertNoTitleOptions {
  title?: string
}

export interface VuetifyProMessageBoxConfirmOptions extends VuetifyProMessageBoxConfirmNoTitleOptions {
  title?: string
}

export interface VuetifyProMessageBoxPromptOptions extends VuetifyProMessageBoxPromptNoTitleOptions {
  title?: string
}


export interface VuetifyProMessageBoxAlert {
  (text: string, title: string, options?: VuetifyProMessageBoxAlertNoTitleOptions): Promise<boolean>

  (text: string, options?: VuetifyProMessageBoxAlertOptions): Promise<boolean>
}

export interface VuetifyProMessageBoxConfirm {
  (text: string, title: string, options?: VuetifyProMessageBoxConfirmOptions): Promise<boolean>

  (text: string, options?: VuetifyProMessageBoxConfirmNoTitleOptions): Promise<boolean>
}

export interface VuetifyProMessageBoxPrompt {
  (text: string, title: string, options?: VuetifyProMessageBoxPromptNoTitleOptions): Promise<boolean>

  (text: string, options?: VuetifyProMessageBoxPromptOptions): Promise<boolean>
}

export interface VuetifyProMessageBox {
  alert(text: string, title: string, options?: VuetifyProMessageBoxAlertNoTitleOptions): Promise<boolean>

  alert(text: string, options?: VuetifyProMessageBoxAlertOptions): Promise<boolean>

  confirm(text: string, title: string, options?: VuetifyProMessageBoxConfirmNoTitleOptions): Promise<boolean>

  confirm(text: string, options?: VuetifyProMessageBoxConfirmOptions): Promise<boolean>

  prompt(text: string, options?: VuetifyProMessageBoxPromptOptions): Promise<boolean>

  prompt(text: string, title: string, options?: VuetifyProMessageBoxPromptNoTitleOptions): Promise<boolean>

  closeAll(): void
}
