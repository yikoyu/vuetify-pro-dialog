import Vuetify from 'vuetify/lib'
import type { VuetifyPreset } from 'vuetify/types'
import merge from 'lodash.merge'

let vuetifyInstance: Vuetify
export function getVuetifyInstance(instance?: Vuetify, preset?: VuetifyPreset) {
  if (vuetifyInstance) return vuetifyInstance

  if (instance) {
    return (vuetifyInstance = instance)
  }

  return (vuetifyInstance = new Vuetify(preset || {}))
}

export function setVuetifyInstance(instance: Vuetify) {
  if (!instance || !instance.constructor || instance.constructor.name !== 'Vuetify') {
    console.warn('[vuetify-pro-dialog]: invalid vuetify instance')
    return false
  }
  vuetifyInstance = instance
  return true
}

export { merge }
