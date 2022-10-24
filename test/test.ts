import { DecypherMe } from '../src/init.js';
import { Table } from '../src/types.js';

const string = 'At the time of the murder Qahtani was Crown Prince Mohammed bin Salman\'s senior adviser. His role included directing media operations and an online campaign against the government\'s critics, including Khashoggi, according to US officials.';
const string2 = 'APTNW PTLXV CRNWK XITVF DKRDP SGEKN FYHUC ITRMV KXMBK MXPFP RMDFM CPMNY PSWHD PAULY FNRLI YHXPR MFXTV PPPGY KPTRH LXPPB VCYFD PTWSM DPSAP XSHSR XKAKC DPGRC FBPRM TTNWF WCZFT MXPSN NFTRT LKTRM FXTPR HBMBK NWHGR BKKVH TPRHR YXNYC BRLPB FMTUX';

const testTable: Table = [
  ['a','b','c','d','e'],
  ['f','g','h','i','j'],
  ['k','l','m','n','o'],
  ['p','r','s','t','u'],
  ['v','w','x','y','z']
];

const obj = {
  toDecode: string2,
  // toEncode: string,
  // returnTable: true,
  cypheringTable: testTable
};

const a = new DecypherMe(obj);
console.log(a.run());