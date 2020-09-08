var string = "At the time of the murder Qahtani was Crown Prince Mohammed bin Salman's senior adviser. His role included directing media operations and an online campaign against the government's critics, including Khashoggi, according to US officials.";
var string2 = "APTNW PTLXV CRNWK XITVF DKRDP SGEKN FYHUC ITRMV KXMBK MXPFP RMDFM CPMNY PSWHD PAULY FNRLI YHXPR MFXTV PPPGY KPTRH LXPPB VCYFD PTWSM DPSAP XSHSR XKAKC DPGRC FBPRM TTNWF WCZFT MXPSN NFTRT LKTRM FXTPR HBMBK NWHGR BKKVH TPRHR YXNYC BRLPB FMTUX";
var testTable = [
    ["a", "b", "c", "d", "e"],
    ["f", "g", "h", "i", "j"],
    ["k", "l", "m", "n", "o"],
    ["p", "r", "s", "t", "u"],
    ["v", "w", "x", "y", "z"],
];
var testTable2 = [
    ["z", "j", "w", "r", "p"],
    ["e", "k", "b", "d", "x"],
    ["y", "n", "o", "s", "f"],
    ["u", "v", "a", "g", "m"],
    ["h", "c", "i", "t", "l"],
];
var obj = {
    // toDecode: string2,
    toEncode: string,
    // returnTable: true,
    cypheringTable: testTable2,
};
var a = new DecypherMe(obj);
console.log(a.run());
var cypher = function (_a) {
    var _b = _a.e, e = _b === void 0 ? null : _b, _c = _a.d, d = _c === void 0 ? null : _c, _d = _a.t, t = _d === void 0 ? null : _d;
    var instance = new DecypherMe({
        toDecode: d,
        toEncode: e,
        cypheringTable: t,
    });
    var output = instance.run();
    if (e)
        return output.encoded;
    else
        return output.decoded;
};
console.log(cypher({
    e: "toto je velmi obycejna zprava dokonce tak obycejna ze nikoho nezajima je hezky pocasi a mame se tu dobre",
    t: testTable2,
}));
console.log(cypher({
    d: "UFAFB ZKRCL SFOJB PKEOR HUYDS GNBNB BPVFD NOJBP KEORZ KOXNW FBWJY DYLSD ZJPJE JIYBF GOFTS TRVWV PGNOV ZVTRW",
    t: testTable2,
}));
console.log(cypher({
    e: "Well now. I'm not gonna talk about Judy; in fact, we're not gonna talk about Judy at all, we're gonna keep her out of it!",
    t: testTable2,
}));
console.log(cypher({
    d: "FZCLX OOYLD OAMSB BOGFT XNSNW GXZGJ OXIOD MFZVZ KOAMS BBOGF TXNSN WGXZG JOGFT LFZVZ VSBBO DJJCZ PVYWG FIOMM",
    t: testTable2,
}));
