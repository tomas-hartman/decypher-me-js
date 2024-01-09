import { convertToChars } from './convertToChars'
import { convertToNums } from './convertToNums'
import { Table } from './types'

const cleanBeforeDecode = (stringToDecode: string) => {
  return stringToDecode.replace(/\s/g, '').toLowerCase()
}

export const decode = (stringToDecode: string, decypheringTable: Table) => {
  const string = cleanBeforeDecode(stringToDecode)

  const firstTransform = convertToNums(string, decypheringTable)
  const workingSecond = firstTransform.slice(1, firstTransform.length - 1)
  const secondTransform = convertToChars(workingSecond, decypheringTable)

  return secondTransform
}
