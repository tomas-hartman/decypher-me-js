import { createTable } from '../src/createTable'

const testTable = createTable()

console.log(testTable)
console.log(new Set(testTable.flat()).size)
