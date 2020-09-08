const cleanText = (str) => {
    let text = str.toLowerCase();
    const replaceLetters = (match, _offset, _string) => {
        const before = "žščřďťňáéíóúíůäëïöüľĺŕćńóśźěığçşţâêîôûàèùąęłżőűãõåø".split("");
        const after = "zscrdtnaeiouiuaeioullrcnoszeigcstaeiouaeuaelzouaoao".split("");
        const index = before.indexOf(match);
        return after[index];
    };
    text = text.replace(/[žščřďťňáéíóúíůäëïöüľĺŕćńóśźěığçşţâêîôûàèùąęłżőűãõåø]/g, replaceLetters);
    text = text.replace(/[.,... ?();]/g, "");
    text = text.replace(/[0-9]/g, "");
    return text;
};
const analyzeSegments = (str, isLetters = true) => {
    const text = isLetters ? cleanText(str) : str.toLowerCase();
    const arr = isLetters ? text.split("") : text.split(" ");
    const output = [];
    for (let i = 0; i < arr.length; i++) {
        const letter = arr[i];
        const letterId = output.findIndex((item) => item[0].includes(letter));
        if (letterId >= 0) {
            const count = output[letterId][1];
            output[letterId][1] = count + 1;
        }
        else {
            output.push([letter, 1]);
        }
    }
    output.sort((a, b) => {
        return b[1] - a[1];
    });
    return output;
};
const decypher = (str, key1, key2) => {
    const text = cleanText(str);
    // const text = str.toLowerCase();
    const arr = text.split("");
    const resultArr = arr.map((letter) => {
        const frequencyIndex = key1.findIndex((item) => item[0].includes(letter));
        if (frequencyIndex >= 0) {
            return key2[frequencyIndex][0];
        }
        else
            return " ";
    });
    return resultArr.join("");
};
const analyzeDuplets = (str) => {
    const text = cleanText(str);
    // 2 loops
    // 2nd loop with offset +1
    const duplets = [];
    for (let i = 0; i < text.length; i += 2) {
        duplets.push(`${text[i]}${text[i + 1]}`);
        duplets.push(`${text[i + 1]}${text[i + 2]}`);
    }
    const output = [];
    for (let i = 0; i < duplets.length; i++) {
        const letter = duplets[i];
        const letterId = output.findIndex((item) => item[0].includes(letter));
        if (letterId >= 0) {
            const count = output[letterId][1];
            output[letterId][1] = count + 1;
        }
        else {
            output.push([letter, 1]);
        }
    }
    output.sort((a, b) => {
        return b[1] - a[1];
    });
    return output;
};
const createKeyForCzech = () => {
    const obj = {
        a: 134675829,
        c: 42120335,
        b: 24944593,
        e: 153141622,
        d: 53015496,
        g: 3087128,
        f: 2458624,
        i: 93903002,
        h: 35075708,
        k: 49549907,
        j: 32383080,
        m: 50636489,
        l: 80345129,
        o: 112776769,
        n: 83104322,
        q: 83322,
        p: 43747863,
        s: 78451777,
        r: 61750942,
        u: 50265458,
        t: 75633324,
        w: 762129,
        v: 55510103,
        y: 40132126,
        x: 504334,
        z: 46383740,
    };
    const arr = Object.keys(obj).map((item) => {
        return [item, obj[item]];
    });
    arr.sort((a, b) => {
        return b[1] - a[1];
    });
    return arr;
};
const myKey = "qwertzuiopasdfghjklyxcvbnm";
const myKey2 = "abcdefghijklmnopqrstuvwxyz";
/**
 * translates text from one alphabet to another
 * @param textToEncode Text that should be encoded/decoded
 * @param key1 Alphabet that should be the text translated into
 * @param key2 Alphabet that should be the text translated from / original alphabet
 */
const encode = (textToEncode, key1, key2) => {
    // TBA: if not key: create random key
    const alphabet1 = key2.split("");
    const alphabet2 = key1.split("");
    const text = cleanText(textToEncode);
    let encodedText = "";
    for (let i = 0; i < text.length; i++) {
        const letter = text[i];
        const index = alphabet1.findIndex((itemFromAlphabet) => itemFromAlphabet === letter);
        encodedText += alphabet2[index];
    }
    return encodedText;
};
/**
 * analyzes encrypted text
 * @param text Text to analyze
 * @param options Which aspects should be analyzed
 */
const analyze = (text, options = {
    words: true,
    letters: true,
    duplets: true,
    original: true,
    suggestion: true,
}) => {
    const { words, letters, duplets, original, suggestion } = options;
    if (words) {
        console.log("\nMost frequent words in text:");
        console.log(analyzeSegments(str, false));
    }
    if (letters) {
        console.log("\nMost frequent letters in text:");
        console.log(analyzeSegments(str));
    }
    if (duplets) {
        console.log("\nMost frequent duplets:");
        console.log(analyzeDuplets(str));
    }
    if (original) {
        console.log("\nOriginal encoded text:");
        console.log(str);
    }
    if (suggestion) {
        const key1 = analyzeSegments(str);
        // const key2 = analyzeSegments(czText);
        const key2 = createKeyForCzech();
        console.log("\nSuggested translation:");
        console.log(decypher(str, key1, key2));
    }
};
let str = `RSWOJ SBELZ LPNFOUBSF WFOVKJ AFKNFOB RPDJUVN, LUFSF WF NOF RSUCFI WZWPMBM, OFA GJMNV KBLP UBLPWFNV. OFLPMJL EFTJUFL NJOVU TF TIMVLMP RSBLUJDLZ EP RBS WUFSJO. EP MVTLOVUJ RSTUV, EP ISULZ TFUJO TFLVOEZ, OFA HPPHMF OBMFAOF IFTMP FOJHNB, LUFSF TJ KJTUF WBMOB DBTU A WBT WZIMFEB RP TLPODFOJ GJMNV, RPLVE UP UFEZ KFTUF OFVEFMBMB ESJWF. ALSBULB UZ OFDFMF EWF IPEJOZ OB RMBUOF TF TOBE BOJ TWPV TUPRBAJ OFEPLBAJ NFSJU WJDF OFA KFEOJN OBEFDIFN B KFEOJN WZEFDIFN, UPMJLP EFMLPV BROPF, KFMJLPA PE RSWOJIP PLBNAJLV WBN TOJNFL WFANF EFDI. TA EMPVIP NF OFDP UPMJL OFWUBIMP EP EFKF B KB NBSOF RSFNJUBN, W DFN ULWJ UB NBHJF, UP VNFOJ WZWPMBU MBDOPTU RP LBAEFN EBMTJN EJBMPHV, RP OBTMFEVKJDJ TDFOF. UMVLPU TSEDF B WASVTFOJ RP USJ DUWSUJOA EFKF W LPNCJOBDJ T IVNPSFN TVDIZN KBLP CSJUTLF NBSUJOJ. LSJTUBMPWB EPLPOBMPTU TOJNLV KF VNPDOFOB OB NJSV TJUPV JVECPV, DIZUSZN DBTUJOHFN, OFPECZUPV WZRSBWPV B DJUMJWPV LBNFSPV. B BCZ UPIP OFCZMP NBMP, TOJNFL WBN OFEB TRBU BOJ RP PRVTUFOJ LJOB B OVUJ L ABNZTMFOJ OBE MJETUWFN, MJETLPTUJ B LPOFDOF J OBE TFCPV TBNZN. TLVUFDOF EFMBNF NBYJNVN WF TWZDI AJWPUFDI, OFCP TF TRPLPKJNF T RPIPEMOPV OPSNBMOPTUJ… ?`;
let czText = `Hrobka faraona Snofrua Červená pyramida, nebo také Severní pyramida či Netopýří pyramida, (arabsky) je pyramida, která se nachází v nekropoli Dáhšúr v Egyptě. Jejím stavebníkem byl faraon Snofru (vládl přibližně mezi lety 2670 a 2620 př. n. l.), který nechal vystavět i Lomenou pyramidu a pyramidu v Médúmu. Na přesnou dataci výstavby nemají badatelé jednotný názor. Červená pyramida má nejpozvolnější stoupání stěn ze všech egyptských pyramid (43°), což zřejmě svědčí o snaze stavitelů o co nejlepší statické zabezpečení stavby. Je vysoká 99,4 metru a jednotlivé strany jsou dlouhé 213 metrů. Po svém dokončení se stala nejvyšší egyptskou pyramidou; nyní je celkově třetí nejvyšší po Chufuově a Rachefově pyramidě. Její název pochází od načervenalého kamene, z něhož je zhotovena. Původně měla obložení z bílého vápence z Tury. Červená pyramida je první egyptskou pyramidou, která byla od počátku plánovaná jako pravá (nestupňovitá). U její stavby Egypťané poprvé…`;
console.log("\nANALYZED TEXT");
analyze(str);
console.log("\nENCODED TEXT");
console.log(encode("Ahoj Barborko jakpak se máš zlatíčko moje?", myKey, myKey2));
