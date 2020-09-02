interface DecypherMe {
  _cypheringTable: string[][];
  _stringToEncode: string;
  _stringToDecode: string;
  _getTable: boolean;
  outputBase: number;
  alphabet: Array<string>;
}

interface DecypherMeConfig {
  cypheringTable?: string[][];
  toEncode?: string;
  toDecode?: string;
  returnTable?: boolean;
  outputBase?: string;
}

interface OutputObj {
  table: string[][];
  encoded: string;
  decoded: string;
}

class DecypherMe {
  constructor(obj: DecypherMeConfig) {
    this._cypheringTable = obj.cypheringTable || null;
    this._stringToEncode = obj.toEncode || null; // zakódovat -- mám vlastní tabulku, nebo vygenerovat novou tabulku
    this._stringToDecode = obj.toDecode || null; // odkódovat -- potřebuje tabulku
    this._getTable = obj.returnTable; // když je cyphering table null; zakódovat i odkódovat
    this.outputBase = parseInt(obj.outputBase) || 5;
    this.alphabet = "abcdefghijklmnoprstuvwyxz".split("");
  }

  get stringToEncode() {
    if (this._stringToEncode) return this.prepareInput(this._stringToEncode);
  }

  get stringToDecode() {
    return this._stringToDecode;
  }

  get cypheringTable() {
    const table = this._cypheringTable;
    const checkInsideArrays = (array) => {
      return array.length === 5;
    };

    if (!table) {
      return this.createCypheringTable();
    }

    if (
      table &&
      Array.isArray(table) &&
      table.length === 5 &&
      table.every(checkInsideArrays)
    ) {
      return table;
    }

    throw "Inserted table is corrupt, check if the table is 5x5 and contains 25 characters.";
  }

  get getTable() {
    if (this._getTable && typeof this._getTable === "boolean") {
      return this._getTable;
    }
  }

  prepareInput = (string: string): string => {
    string = string.toLowerCase();
    string = string.replace(/\W/g, "");

    return string;
  };

  prepareOutput = (string: string): string => {
    const outputBase = this.outputBase;
    let output = "";
    let slicer = this.outputBase;
    let strStart = 0;

    if (string.length % outputBase !== 0) {
      console.error("String cannot be divided by " + outputBase + ".");
      return;
    }

    for (let i = 0; i < string.length / outputBase; i++) {
      let remainingString = string.slice(slicer);
      output += string.slice(strStart, slicer);
      output += " ";

      slicer = slicer + outputBase;
      strStart = strStart + outputBase;
    }

    output = output.trim();
    output = output.toUpperCase();

    return output;
  };

  createCypheringTable = (): string[][] => {
    const workingTable = [];
    const alphabet = this.alphabet;

    for (let i = 0; i < 5; i++) {
      let array = [];
      for (let y = 0; y < 5; y++) {
        let rand = Math.floor(Math.random() * alphabet.length);
        let letter = alphabet.splice(rand, 1).toString();
        array.push(letter);
      }
      workingTable.push(array);
    }

    return workingTable;
  };

  encodeToNums = (
    stringToEncode: string,
    decypheringTable: string[][]
  ): string => {
    const string = this.prepareInput(stringToEncode);
    let output = "";
    let workingString = string.split("");

    // iteration over letters
    for (let i = 0; i < workingString.length; i++) {
      // finding index of the letter
      for (let y = 0; y < 5; y++) {
        if (decypheringTable[y].indexOf(workingString[i]) < 0) continue;
        output += decypheringTable[y].indexOf(workingString[i]);
        output += y;
      }
    }

    return output;
  };

  encodeToLetters = (stringToEncode: string, decypheringTable: string[][]) => {
    let output = "";
    const workingString = stringToEncode.split("");
    const iterationLength = workingString.length;

    for (let i = 0; i < iterationLength / 2; i++) {
      let coord1 = workingString.shift();
      let coord2 = workingString.shift();
      output += decypheringTable[coord2][coord1];
    }

    return output;
  };

  /**
   * @todo work on some formatting and render output at clusters of 5
   * @param {string} stringToEncode
   * @param {array} decypheringTable
   */
  encode = (stringToEncode: string, decypheringTable: string[][]) => {
    const first = this.encodeToNums(stringToEncode, decypheringTable);
    let workingSecond = Math.floor(Math.random() * 5).toString();
    workingSecond += first;
    workingSecond += Math.floor(Math.random() * 5).toString();

    if (workingSecond.length % this.outputBase !== 0) {
      // const iterations = 6-(workingSecond.length % 6);
      // Compensates number of letters, so they are dividable by 6 / outputBase
      const iterations =
        (this.outputBase - ((workingSecond.length / 2) % this.outputBase)) * 2;
      for (let i = 0; i < iterations; i++) {
        workingSecond += Math.floor(Math.random() * 5).toString();
      }
    }

    let output = this.encodeToLetters(workingSecond, decypheringTable);

    output = this.prepareOutput(output);

    return output;
  };

  decode = (stringToDecode: string, decypheringTable: Array<Array<string>>) => {
    const string = stringToDecode.replace(/\s/g, "");
    string.toLowerCase();
    const first = this.encodeToNums(string, decypheringTable);
    let workingSecond = first.slice(1, first.length - 1);
    const second = this.encodeToLetters(workingSecond, decypheringTable);

    return second;
  };

  /**
   * Variables come in play here - I'll decide which process should be run here.
   */
  run = (): object => {
    const output = {} as OutputObj;
    if (this.getTable) {
      output.table = this.cypheringTable;
    }

    if (this.stringToEncode && !this.stringToDecode) {
      output.encoded = this.encode(this.stringToEncode, this.cypheringTable);
    }

    if (!this.stringToEncode && this.stringToDecode) {
      output.decoded = this.decode(this.stringToDecode, this.cypheringTable);
    }

    if (this.stringToEncode && this.stringToDecode) {
      throw "Input either string to encode or to decode.";
    }

    return output;
  };
}

const string =
  "At the time of the murder Qahtani was Crown Prince Mohammed bin Salman's senior adviser. His role included directing media operations and an online campaign against the government's critics, including Khashoggi, according to US officials.";
const string2 =
  "APTNW PTLXV CRNWK XITVF DKRDP SGEKN FYHUC ITRMV KXMBK MXPFP RMDFM CPMNY PSWHD PAULY FNRLI YHXPR MFXTV PPPGY KPTRH LXPPB VCYFD PTWSM DPSAP XSHSR XKAKC DPGRC FBPRM TTNWF WCZFT MXPSN NFTRT LKTRM FXTPR HBMBK NWHGR BKKVH TPRHR YXNYC BRLPB FMTUX";

const testTable = [
  ["a", "b", "c", "d", "e"],
  ["f", "g", "h", "i", "j"],
  ["k", "l", "m", "n", "o"],
  ["p", "r", "s", "t", "u"],
  ["v", "w", "x", "y", "z"],
];

const obj = {
  toDecode: string2,
  // toEncode: string,
  // returnTable: true,
  cypheringTable: testTable,
};

const a = new DecypherMe(obj);
console.log(a.run());
