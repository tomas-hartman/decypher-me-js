export const alphabet = 'abcdefghijklmnžšýěíěoprstuvwyxz'.split('')

export const angle = 360 / alphabet.length

const text = 'hello'.split('')
export const position = alphabet.findIndex((value) => value === text[0]) * angle

export const positions = text.map((value) => {
  return alphabet.findIndex((letter) => letter === value) * angle
})
