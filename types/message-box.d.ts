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

export interface VuetifyProMessageBox {
  msgbox: {
    alert(text: string, title: string, options?: VuetifyProMessageBoxAlertNoTitleOptions): Promise<boolean>

    alert(text: string, options?: VuetifyProMessageBoxAlertOptions): Promise<boolean>
  
    confirm(text: string, title: string, options?: VuetifyProMessageBoxConfirmNoTitleOptions): Promise<boolean>
  
    confirm(text: string, options?: VuetifyProMessageBoxConfirmOptions): Promise<boolean>
  
    prompt(text: string, options?: VuetifyProMessageBoxPromptOptions): Promise<boolean>
  
    prompt(text: string, title: string, options?: VuetifyProMessageBoxPromptNoTitleOptions): Promise<boolean>

    closeAll(): void
  }

  alert(text: string, title: string, options?: VuetifyProMessageBoxAlertNoTitleOptions): Promise<boolean>

  alert(text: string, options?: VuetifyProMessageBoxAlertOptions): Promise<boolean>

  confirm(text: string, title: string, options?: VuetifyProMessageBoxConfirmNoTitleOptions): Promise<boolean>

  confirm(text: string, options?: VuetifyProMessageBoxConfirmOptions): Promise<boolean>

  prompt(text: string, options?: VuetifyProMessageBoxPromptOptions): Promise<boolean>

  prompt(text: string, title: string, options?: VuetifyProMessageBoxPromptNoTitleOptions): Promise<boolean>
}
