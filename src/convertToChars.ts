import { Table } from './types'

export const convertToChars = (input: string, table: Table) => {
  let output = ''
  const workingString = input.split('')
  const iterationLength = workingString.length

  for (let i = 0; i < iterationLength / 2; i++) {
    const coord1 = parseInt(workingString.shift()!)
    const coord2 = parseInt(workingString.shift()!)
    output += table[coord2][coord1]
  }

  return output
}
