import { removeWhitespace } from './cleanInput'
import { Table } from './types'

export const convertToNums = (input: string, table: Table) => {
  const cleanedInput = removeWhitespace(input)

  let output = ''
  const workingString = cleanedInput.split('')

  // iteration over letters
  for (let i = 0; i < workingString.length; i++) {
    // finding index of the letter
    for (let y = 0; y < 5; y++) {
      if (table[y].indexOf(workingString[i]) < 0) continue
      output += table[y].indexOf(workingString[i])
      output += y
    }
  }

  return output
}
