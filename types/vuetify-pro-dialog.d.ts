import Vue from 'vue'

import { VuetifyProMessage, VuetifyProDialogMessage } from './message'
import { VuetifyProMessageBox } from './message-box'

export interface VuetifyProDialog extends VuetifyProDialogMessage, VuetifyProMessageBox {}

export interface InstallationOptions {
  vuetify: any
  confirm?: {
    false?: {
      text?: string
    }
    true: {
      text?: string
      color?: string
    },
    width?: number
  }

  alert?: {
    true?: {
      text?: string
      color?: string
    }
    width?: number
  }
}

export function install (vue: typeof Vue, options: InstallationOptions): void

export const Message: VuetifyProMessage

export const MessageBox: VuetifyProMessageBox

declare module 'vue/types/vue' {
  interface Vue {
    $dialog: VuetifyProDialog
  }
}