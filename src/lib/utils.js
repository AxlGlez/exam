import camelCase from 'lodash/camelCase'
import snakeCase from 'lodash/snakeCase'
import isPlainObject from 'lodash/isPlainObject'

const camelCaseObject = (obj) => Object.keys(obj).reduce((reduce, key) => {
  let child = obj[key]
  return { ...reduce, [camelCase(key)]: isPlainObject(child) ? camelCaseObject(child) : child }
}, {})

const snakeCaseObject = (obj) => Object.keys(obj).reduce((reduce, key) => {
  let child = obj[key]
  return { ...reduce, [snakeCase(key)]: isPlainObject(child) ? snakeCaseObject(child) : child }
}, {})

export default {
  camelCaseObject,
  snakeCaseObject,
  camelCaseArray: (array) => array.map(value => camelCase(value)),
  camelCaseArrayOfObjects: (array) => array.map(value => camelCaseObject(value)),
  snakeCaseArray: (array) => array.map(value => snakeCase(value))
}
