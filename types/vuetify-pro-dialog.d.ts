import Vue from 'vue'

import { VuetifyProMessage, VuetifyProDialogMessage } from './message'
import { VuetifyProMessageBox } from './message-box'

export interface VuetifyProDialog extends VuetifyProDialogMessage, VuetifyProMessageBox {
  changeRtl: (type: boolean) => void
  setLocale: (locale: string) => void
  setLocaleMessage: (locale: string, msg: { [x: string]: string }) => void
}

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

export declare const zhCN: { [x: string]: string }

export declare const enUS: { [x: string]: string }

export declare function setLocale(locale: string): void

export declare function setLocaleMessage(locale: string, msg: { [x: string]: string }): void

export function install (vue: typeof Vue, options: InstallationOptions): void

export const Message: VuetifyProMessage

export const MessageBox: VuetifyProMessageBox

declare module 'vue/types/vue' {
  interface Vue {
    $dialog: VuetifyProDialog
  }
}