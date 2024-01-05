import { decode } from '../src'
import { decodedString, encodedString, testTable } from './utils'

test('string decoder can decode encoded input', () => {
  const decodeWithoutTable = decode(encodedString, testTable)

  expect(decodeWithoutTable).toBe(decodedString)
})
