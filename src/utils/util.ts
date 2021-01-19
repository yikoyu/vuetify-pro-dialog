/**
 * 深拷贝
 * @param {Object} obj
 * @return {*}
 */
export const deepCopy = (obj: any) => {
  const target: any = Array.isArray(obj) ? [] : {}
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        target[key] = deepCopy(obj[key])
      } else {
        target[key] = obj[key]
      }
    }
  }
  return target
}

/**
 * 赋予值响应式能力
 * @template T
 * @param {T} value
 * @return {*} 
 */
export function ref<T = any>(value: T): { value: T } {
  const val = new Object()
  return Object.defineProperty(val, 'value', {
    get() {
      return value
    },
    set(val: T) {
      value = val
    },
    configurable: true,
    enumerable: true
  })
}