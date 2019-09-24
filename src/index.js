const MORSE_TABLE = {
    '.-': 'a',
    '-...': 'b',
    '-.-.': 'c',
    '-..': 'd',
    '.': 'e',
    '..-.': 'f',
    '--.': 'g',
    '....': 'h',
    '..': 'i',
    '.---': 'j',
    '-.-': 'k',
    '.-..': 'l',
    '--': 'm',
    '-.': 'n',
    '---': 'o',
    '.--.': 'p',
    '--.-': 'q',
    '.-.': 'r',
    '...': 's',
    '-': 't',
    '..-': 'u',
    '...-': 'v',
    '.--': 'w',
    '-..-': 'x',
    '-.--': 'y',
    '--..': 'z',
    '.----': '1',
    '..---': '2',
    '...--': '3',
    '....-': '4',
    '.....': '5',
    '-....': '6',
    '--...': '7',
    '---..': '8',
    '----.': '9',
    '-----': '0',
};
class Coder {
    constructor() {
        this.ENGLISH_MORSE_TABLE = new Object();

        this.REPLACEMAPPER = {
            ".": "10",
            "-": "11",
            " ": "**********"
        }

    }
    enrich() {
        this.ENGLISH_MORSE_TABLE[" "] = " ";
        Object.keys(MORSE_TABLE).forEach(x => this.ENGLISH_MORSE_TABLE[MORSE_TABLE[x]] = x);
    }
    getArray(expr) {
        return Array.from(expr)
    }

    ReturnReplacedArray(val) {

        return this.ENGLISH_MORSE_TABLE[val];
    }
    ReplaceDotsAndMinus(arr) {
        let temp = Array.from(arr).map(x => this.REPLACEMAPPER[x]).join("");
        return temp;
    }
    enrichArrayWithZero(arr) {
        let ar = Array.from(arr);
        let len = ar.length;
        let addedarray = Array(10 - len).fill(0);
        let temp = addedarray.concat(ar);
        return temp.join("");

    }
    code(expr) {
        this.enrich();
        console.log(expr);
        let arrayfromstring = this.getArray(expr);
        let correctArrayReplaced = arrayfromstring.map(x => this.ReturnReplacedArray(x));
        let correctArrayReplacedNumber = correctArrayReplaced.map(x => this.ReplaceDotsAndMinus(x));
        let enrichedarray = correctArrayReplacedNumber.map(x => this.enrichArrayWithZero(x));
        let stringArray = enrichedarray.join("");
        return stringArray;
    }
}
class Decoder {
    constructor() {
        MORSE_TABLE["**********"] = " ";
    }
    ReturnSlicedArray(expr) {
        let temparray = new Array();
        for (let i = 0; i < expr.length;) {
            temparray.push(expr.slice(i, i + 10));
            i = i + 10;
        }
        return temparray
    }
    ReturnArrayWithoutZero(expr) {
        let temp = expr.map(x => x.indexOf("*") >= 0 ? x : parseInt(x));
        return temp;

    }

    RepelaceToMorze(expr) {

        return expr.map(x => x.toString().replace(/10/g, ".")).map(y => y.toString().replace(/11/g, "-"));
    }

    GetSymbol(expr) {
        return expr.map(x => MORSE_TABLE[x]);
    }
    decode(expr) {
        let changeSpace = this.ReturnSlicedArray(expr);
        let arrayWithoutZeros = this.ReturnArrayWithoutZero(changeSpace);
        let morze = this.RepelaceToMorze(arrayWithoutZeros);
        let symbols = this.GetSymbol(morze);
        return symbols.join("");
    }
}



function decode(expr) {
    // write your solution here
    // let val = new Coder().code(expr)
    let val = new Decoder().decode(expr);
    return val;
}




// decode("00101010100000000010001011101000101110100000111111**********00001011110000111111000010111000101110100000111010")
module.exports = {
    decode
}

