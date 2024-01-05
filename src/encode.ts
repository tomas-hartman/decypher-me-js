import { cleanOutput } from './cleanOutput'
import { convertToChars } from './convertToChars'
import { convertToNums } from './convertToNums'
import { createTable } from './createTable'
import { Table } from './types'

const getRandomInt = () => Math.floor(Math.random() * 5).toString()

export const encode = (
  stringToEncode: string,
  decypheringTable?: Table,
  outputBase = 5,
) => {
  const workingTable = decypheringTable || createTable()
  const firstTransform = convertToNums(stringToEncode, workingTable)

  let firstTransformWithSalt = getRandomInt() + firstTransform + getRandomInt()

  if (firstTransformWithSalt.length % outputBase !== 0) {
    // const iterations = 6-(workingSecond.length % 6);
    // Compensates number of letters, so they are dividable by 6 / outputBase
    const iterations =
      (outputBase - ((firstTransformWithSalt.length / 2) % outputBase)) * 2
    for (let i = 0; i < iterations; i++) {
      firstTransformWithSalt += Math.floor(Math.random() * 5).toString()
    }
  }

  const output = cleanOutput(
    convertToChars(firstTransformWithSalt, workingTable),
    outputBase,
  )

  return [output, workingTable] as const
}
