// TODO: merge removeWhitespace and replaceSpecialChars into one function

export const removeWhitespace = (input: string) =>
  input.toLowerCase().replace(/\W/g, '')

export const cleanInput = (input: string) => {
  const lowerCaseInput = input.toLowerCase()

  const before = 'žščřďťňáéíóúíůäëïöüľĺŕćńóśźěığçşţâêîôûàèùąęłżőűãõåø'
  const after = 'zscrdtnaeiouiuaeioullrcnoszeigcstaeiouaeuaelzouaoao'

  // const specialChars = '.,?!\'"()[]{}<>@#€&-=_\\/:; '
  // const specialChars = '.,?!\'"()[]{}<> '
  const specialChars = '.,?!\'" '

  const match = new RegExp(`[${before}${specialChars}]`, 'g')
  const specialCharsMatch = new RegExp(`[${specialChars}]`, 'g')
  const outputMatch = /[^a-z]/

  const replacer = (char: string) => {
    if (char.match(specialCharsMatch)) return ''

    return after[before.indexOf(char)]
  }

  const output = lowerCaseInput.replace(match, replacer)

  if (outputMatch.test(output)) {
    throw Error(
      `Character ${output.match(
        outputMatch,
      )} cannot be used in input. Only ASCII-characters and some extended latin characters are allowed.`,
    )
  }

  return output
}
