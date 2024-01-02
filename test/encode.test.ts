import { encode } from '../src/encode'
import { Table } from '../src/types'

const string =
  "At the time of the murder Qahtani was Crown Prince Mohammed bin Salman's senior adviser. His role included directing media operations and an online campaign against the government's critics, including Khashoggi, according to US officials."
// const string2 = 'APTNW PTLXV CRNWK XITVF DKRDP SGEKN FYHUC ITRMV KXMBK MXPFP RMDFM CPMNY PSWHD PAULY FNRLI YHXPR MFXTV PPPGY KPTRH LXPPB VCYFD PTWSM DPSAP XSHSR XKAKC DPGRC FBPRM TTNWF WCZFT MXPSN NFTRT LKTRM FXTPR HBMBK NWHGR BKKVH TPRHR YXNYC BRLPB FMTUX';

console.log('WITHOUT TABLE')
const encodeWithoutTable = encode(string)

console.log(encodeWithoutTable)

console.log('\nWITH TABLE')

const testTable: Table = [
  ['a', 'b', 'c', 'd', 'e'],
  ['f', 'g', 'h', 'i', 'j'],
  ['k', 'l', 'm', 'n', 'o'],
  ['p', 'r', 's', 't', 'u'],
  ['v', 'w', 'x', 'y', 'z'],
]

const encodeWithTable = encode(string, testTable)

console.log(encodeWithTable)
