import { convertToChars } from './convertToChars'
import { convertToNums } from './convertToNums'
import { Decode } from './types'

export const decode: Decode = (stringToDecode, decypheringTable) => {
  const string = stringToDecode.replace(/\s/g, '').toLowerCase()

  const first = convertToNums(string, decypheringTable)
  const workingSecond = first.slice(1, first.length - 1)
  const second = convertToChars(workingSecond, decypheringTable)

  return second
}
