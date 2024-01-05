import { convertToChars } from './convertToChars'
import { convertToNums } from './convertToNums'
import { Table } from './types'

export const decode = (stringToDecode: string, decypheringTable: Table) => {
  const string = stringToDecode.replace(/\s/g, '').toLowerCase()

  const firstTransform = convertToNums(string, decypheringTable)
  const workingSecond = firstTransform.slice(1, firstTransform.length - 1)
  const secondTransform = convertToChars(workingSecond, decypheringTable)

  return secondTransform
}
