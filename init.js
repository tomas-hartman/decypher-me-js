(function (){
    const alphabet = "abcdefghijklmnoprstuvwyxz".split("");
    let string = "Ahoj Barboro, jak se mas?";
    const outputBase = 5; // how big segments should be the output formatted into

    const createDecypheringTable = () => {
        const workingTable = [];
        for(let i=0;i<5;i++){
            let array = [];
            for(let y=0;y<5;y++){
                let rand = Math.floor(Math.random()*alphabet.length);
                let letter = alphabet.splice(rand,1).toString();
                array.push(letter);
            }
            workingTable.push(array);
        }

        return workingTable;
    }
    const table = createDecypheringTable();

    /**
     * @todo Doesn't work with digits and special chars like žščřě etc.
     * @param {string} string 
     */
    const prepareStr = (string) => {
        string = string.toLowerCase();
        string = string.replace(/\W/g, '');

        return string;
    }

    const prepareOutput = (string) => {
        let output = "";
        let slicer = outputBase;
        let strStart = 0;

        if(string.length % outputBase !== 0){
            console.error("String cannot be divided by "+outputBase+".");
            return;
        } 

        for(let i=0;i<string.length/outputBase;i++){
            remainingString = string.slice(slicer);
            output += string.slice(strStart, slicer);
            output += " ";

            slicer = slicer + outputBase;
            strStart = strStart + outputBase;
        }

        output = output.trim();
        output = output.toUpperCase();
        
        return output;
    }

    const encodeToNums = (stringToEncode, decypheringTable) => {
        const string = prepareStr(stringToEncode); 
        let output = "";
        let workingString = string.split("");

        // iteration over letters
        for(let i=0;i<workingString.length;i++){ 
            // finding index of the letter
            for(let y=0;y<5;y++){
                    if(decypheringTable[y].indexOf(workingString[i]) < 0 ) continue;
                    output += decypheringTable[y].indexOf(workingString[i]);
                    output += y;
            }
        }

        return output;
    }
    // let encodedString = encodeToNums(string, table);

    const encodeToLetters = (stringToEncode, decypheringTable) => {
        let output = "";
        const workingString = stringToEncode.split("");
        const iterationLength = workingString.length;

        for(let i=0;i<iterationLength/2;i++){
            let coord1 = workingString.shift();
            let coord2 = workingString.shift();
            output += decypheringTable[coord2][coord1];
        }

        return output;
    }
    // let encodedStringTwice = encodeToLetters(encodedString, table);

    /**
     * @todo work on some formatting and render output at clusters of 5
     * @param {string} stringToEncode 
     * @param {array} decypheringTable 
     */
    const encode = (stringToEncode, decypheringTable) => {
        const first = encodeToNums(stringToEncode, decypheringTable);
        let workingSecond = (Math.floor(Math.random()*5)).toString();
            workingSecond += first;
            workingSecond += (Math.floor(Math.random()*5)).toString();

        if(workingSecond.length % outputBase !== 0){
            // const iterations = 6-(workingSecond.length % 6);
            // Compensates number of letters, so they are dividable by 6 / outputBase 
            const iterations = (outputBase -(workingSecond.length / 2) % outputBase) * 2;
            for(let i=0;i<iterations;i++){
                workingSecond += (Math.floor(Math.random()*5)).toString();
            }
        }

        let output = encodeToLetters(workingSecond, decypheringTable);

        output = prepareOutput(output);

        return output;
    }
    let properlyEncoded = encode(string, table);

    const decode = (stringToDecode, decypheringTable) => {
        const string = stringToDecode.replace(/\s/g, '');
        string.toLowerCase();
        const first = encodeToNums(string, decypheringTable);
        let workingSecond = first.slice(1,first.length-1);
        const second = encodeToLetters(workingSecond, decypheringTable);

        return second;
    }
    let properlyDecoded = decode(properlyEncoded, table);
    debugger;

})();