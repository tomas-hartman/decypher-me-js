import { alphabet, angle, positions } from '../src/circularTable'

test('circularTable', () => {
  console.log(positions)
  console.log(angle)

  const currentPosition = 81.29032258064517 / angle
  const currentPosition2 = 127.7419354839 / angle

  console.log(alphabet[currentPosition])

  console.log(Math.round(currentPosition2))
  console.log(alphabet[Math.round(currentPosition2)])

  const positions2 = [2 * angle, ...positions]

  // add one of the arrays to the other

  const added = positions2.map((value, id) => {
    if (!positions[id]) return value

    return value + positions[id]
  })

  console.log(added)

  const trans = added.map((value) => {
    console.log(value)

    return alphabet[Math.round(value / angle)]
  })

  console.log(trans)

  expect(true).toBe(true)
})

// 81.29032258064517,
// 46.45161290322581,
// 127.74193548387098,
// 127.74193548387098,
// 232.25806451612902

// 81.29032258064517,
// 46.45161290322581, + 81.29032258064517 = 127.7419354839
// 127.74193548387098, + 46.45161290322581 = 174.1935483871
// 127.74193548387098, + 127.74193548387098 = 255.4838709677
// 232.25806451612902 + 127.74193548387098 = 360
// + 232.25806451612902

// rand number between 0 and 360 - from what numbers I can use
// 81.29032258064517 // + rand number
// 127.7419354839
// 174.1935483871
// 255.4838709677
// 360
// 232.25806451612902

// // -------

// 81.29032258064517 /
