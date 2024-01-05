import { createTable } from '../src/createTable'

test('createTable returns a 5x5 table', () => {
  const testTable = createTable()

  expect(testTable).toHaveLength(5)

  testTable.forEach((row) => {
    expect(row).toHaveLength(5)
  })
})
