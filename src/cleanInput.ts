export const cleanInput = (input: string) => {
  input = input.toLowerCase()
  input = input.replace(/\W/g, '')

  return input
}
