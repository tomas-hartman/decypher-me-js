import { decode } from '../src'
import { cleanInput } from '../src/cleanInput'
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

test('`cleanInput` should replace special characters with their ASCII counterparts', () => {
  const stringWithSpecialLetters = 'Ať tě provází Síla, Luku!'
  const expectedString = 'atteprovazisilaluku'

  const output = cleanInput(stringWithSpecialLetters)

  expect(output).toBe(expectedString)
})

test('string with non-ASCII characters should be encoded if the letter is whitelisted', () => {
  const stringWithSpecialLetters = 'Ať tě provází Síla, Luku!'
  const expectedDecodedString = 'atteprovazisilaluku'

  const [encoded, table] = encode(stringWithSpecialLetters)
  const decoded = decode(encoded, table)

  expect(decoded).toBe(expectedDecodedString)
})

test('`cleanInput` should throw an error if non-whitelisted characters are found', () => {
  const stringWithSpecialLetters = 'Hello, 世界'

  const t = () => {
    cleanInput(stringWithSpecialLetters)
  }

  expect(t).toThrow(
    /Character . cannot be used in input. Only ASCII-characters and some extended latin characters are allowed./s,
  )
})

test('string with non-ASCII characters should not be encoded if the letter is not whitelisted', () => {
  const testString = 'Hello, 世界'

  const t = () => {
    encode(testString)
  }

  expect(t).toThrow(
    /Character . cannot be used in input. Only ASCII-characters and some extended latin characters are allowed./s,
  )
})
