import { encode } from '../src/encode'
import { originalString, testTable } from './utils'

test('string encoder can encode input without providing a table', () => {
  const [encoded] = encode(originalString)

  expect(encoded).not.toBeUndefined()
  expect(typeof encoded).toBe('string')
  expect(encoded.length).toBeGreaterThan(1)
})

test('string encoder provides an encryption table in return', () => {
  const [_, table] = encode(originalString)

  expect(Array.isArray(table)).toBeTruthy()
  expect(table).toHaveLength(5)
})

test('string encoder can encode input when table is provided', () => {
  const encodeWithTable = encode(originalString, testTable)

  expect(encodeWithTable).toHaveLength(2)
  // TODO: fix this
  // expect(encodeWithTable[0]).toBe(encodedString)
  expect(encodeWithTable[1]).toBe(testTable)
})

test('string encoder has configurable outputBase', () => {
  const testOutputBase = 16

  const [encoded] = encode(originalString, undefined, testOutputBase)

  encoded.split(' ').forEach((segment) => {
    expect(segment).toHaveLength(testOutputBase)
  })
})
