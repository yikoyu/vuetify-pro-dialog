export interface Test {
  author: string
  msg: string
}

export function test(): Test {
  console.log('Hello World')
  return { author: 'test', msg: 'Hello World' }
}
