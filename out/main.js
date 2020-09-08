var DecypherMe = /** @class */ (function () {
    function DecypherMe(obj) {
        var _this = this;
        this.prepareInput = function (string) {
            string = string.toLowerCase();
            string = string.replace(/\W/g, "");
            return string;
        };
        this.prepareOutput = function (string) {
            var outputBase = _this.outputBase;
            var output = "";
            var slicer = _this.outputBase;
            var strStart = 0;
            if (string.length % outputBase !== 0) {
                console.error("String cannot be divided by " + outputBase + ".");
                return;
            }
            for (var i = 0; i < string.length / outputBase; i++) {
                var remainingString = string.slice(slicer);
                output += string.slice(strStart, slicer);
                output += " ";
                slicer = slicer + outputBase;
                strStart = strStart + outputBase;
            }
            output = output.trim();
            output = output.toUpperCase();
            return output;
        };
        this.createCypheringTable = function () {
            var workingTable = [];
            var alphabet = _this.alphabet;
            for (var i = 0; i < 5; i++) {
                var array = [];
                for (var y = 0; y < 5; y++) {
                    var rand = Math.floor(Math.random() * alphabet.length);
                    var letter = alphabet.splice(rand, 1).toString();
                    array.push(letter);
                }
                workingTable.push(array);
            }
            return workingTable;
        };
        this.encodeToNums = function (stringToEncode, decypheringTable) {
            var string = _this.prepareInput(stringToEncode);
            var output = "";
            var workingString = string.split("");
            // iteration over letters
            for (var i = 0; i < workingString.length; i++) {
                // finding index of the letter
                for (var y = 0; y < 5; y++) {
                    if (decypheringTable[y].indexOf(workingString[i]) < 0)
                        continue;
                    output += decypheringTable[y].indexOf(workingString[i]);
                    output += y;
                }
            }
            return output;
        };
        this.encodeToLetters = function (stringToEncode, decypheringTable) {
            var output = "";
            var workingString = stringToEncode.split("");
            var iterationLength = workingString.length;
            for (var i = 0; i < iterationLength / 2; i++) {
                var coord1 = workingString.shift();
                var coord2 = workingString.shift();
                output += decypheringTable[coord2][coord1];
            }
            return output;
        };
        /**
         * @todo work on some formatting and render output at clusters of 5
         * @param {string} stringToEncode
         * @param {array} decypheringTable
         */
        this.encode = function (stringToEncode, decypheringTable) {
            var first = _this.encodeToNums(stringToEncode, decypheringTable);
            var workingSecond = Math.floor(Math.random() * 5).toString();
            workingSecond += first;
            workingSecond += Math.floor(Math.random() * 5).toString();
            if (workingSecond.length % _this.outputBase !== 0) {
                // const iterations = 6-(workingSecond.length % 6);
                // Compensates number of letters, so they are dividable by 6 / outputBase
                var iterations = (_this.outputBase - ((workingSecond.length / 2) % _this.outputBase)) * 2;
                for (var i = 0; i < iterations; i++) {
                    workingSecond += Math.floor(Math.random() * 5).toString();
                }
            }
            var output = _this.encodeToLetters(workingSecond, decypheringTable);
            output = _this.prepareOutput(output);
            return output;
        };
        this.decode = function (stringToDecode, decypheringTable) {
            var string = stringToDecode.replace(/\s/g, "");
            string.toLowerCase();
            var first = _this.encodeToNums(string, decypheringTable);
            var workingSecond = first.slice(1, first.length - 1);
            var second = _this.encodeToLetters(workingSecond, decypheringTable);
            return second;
        };
        /**
         * Variables come in play here - I'll decide which process should be run here.
         */
        this.run = function () {
            var output = {};
            if (_this.getTable) {
                output.table = _this.cypheringTable;
            }
            if (_this.stringToEncode && !_this.stringToDecode) {
                output.encoded = _this.encode(_this.stringToEncode, _this.cypheringTable);
            }
            if (!_this.stringToEncode && _this.stringToDecode) {
                output.decoded = _this.decode(_this.stringToDecode, _this.cypheringTable);
            }
            if (_this.stringToEncode && _this.stringToDecode) {
                throw "Input either string to encode or to decode.";
            }
            return output;
        };
        this._cypheringTable = obj.cypheringTable || null;
        this._stringToEncode = obj.toEncode || null; // zakódovat -- mám vlastní tabulku, nebo vygenerovat novou tabulku
        this._stringToDecode = obj.toDecode || null; // odkódovat -- potřebuje tabulku
        this._getTable = obj.returnTable; // když je cyphering table null; zakódovat i odkódovat
        this.outputBase = parseInt(obj.outputBase) || 5;
        this.alphabet = "abcdefghijklmnoprstuvwyxz".split("");
    }
    Object.defineProperty(DecypherMe.prototype, "stringToEncode", {
        get: function () {
            if (this._stringToEncode)
                return this.prepareInput(this._stringToEncode);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DecypherMe.prototype, "stringToDecode", {
        get: function () {
            return this._stringToDecode;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DecypherMe.prototype, "cypheringTable", {
        get: function () {
            var table = this._cypheringTable;
            var checkInsideArrays = function (array) {
                return array.length === 5;
            };
            if (!table) {
                return this.createCypheringTable();
            }
            if (table &&
                Array.isArray(table) &&
                table.length === 5 &&
                table.every(checkInsideArrays)) {
                return table;
            }
            throw "Inserted table is corrupt, check if the table is 5x5 and contains 25 characters.";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DecypherMe.prototype, "getTable", {
        get: function () {
            if (this._getTable && typeof this._getTable === "boolean") {
                return this._getTable;
            }
        },
        enumerable: false,
        configurable: true
    });
    return DecypherMe;
}());
