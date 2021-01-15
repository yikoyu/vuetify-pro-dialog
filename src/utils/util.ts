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