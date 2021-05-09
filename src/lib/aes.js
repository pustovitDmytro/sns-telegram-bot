import crypto from 'crypto';
import { cipher as cipherCongig } from 'src/config';

const IV_LENGTH = 16;
const HEX_MULTIPLIER = 2;
const IV_STRING_LENGTH = HEX_MULTIPLIER * IV_LENGTH;

function pad(num, size) {
    const zeros = (new Array(size)).fill('0').join('');

    return (`${zeros}${num}`).substr(-size);
}

class AES {
    constructor({ algorithm, key }) {
        this.algorithm = algorithm;
        this.key = key;
    }

    encrypt(text) {
        const iv = crypto.randomBytes(IV_LENGTH);
        const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);

        let crypted = cipher.update(text, 'utf8', 'hex');

        crypted += cipher.final('hex');
        const ivString = iv.toString('hex');

        return `${ivString}.${crypted}`;
    }

    decrypt(text) {
        const [ iv, encrypted ] = text.split('.');
        const ivString = pad(iv, IV_STRING_LENGTH);
        const vec = new Buffer.from(ivString, 'hex');
        const decipher = crypto.createDecipheriv(this.algorithm, this.key, vec);

        let dec = decipher.update(encrypted, 'hex', 'utf8');

        dec += decipher.final('utf8');

        return dec;
    }
}

function toNumber(cipher, alphabet) {
    let result = BigInt(0);

    cipher
        .split('')
        .map(s => alphabet.findIndex(e => e === s))
        .forEach((n, index) => {
            const power = BigInt(cipher.length - index - 1);

            result += BigInt(n) * BigInt(BigInt(alphabet.length) ** power);
        });

    return result;
}

function toSymbols(num, alphabet) {
    const base = BigInt(alphabet.length);
    const remainder = num % base;
    const quotient = (num - remainder) / base;
    const symbol = alphabet[remainder];

    return quotient === BigInt(0)
        ? [ symbol ]
        : [ ...toSymbols(quotient, alphabet), symbol ];
}


class Cipher extends AES {
    outAlphabet = [
        ...'abcdefghijklmnopqrstuvwxyz',
        ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        ...'0123456789'
    ]

    inAlphabet = [ ...'0123456789abcdef.' ]

    encrypt(payload) {
        const string = JSON.stringify(payload);
        const encrypted = super.encrypt(string);

        return this.short(encrypted);
    }

    decrypt(text) {
        const long = this.long(text);
        const decrypted = super.decrypt(long);

        return JSON.parse(decrypted);
    }

    short(hex) {
        return toSymbols(toNumber(hex, this.inAlphabet), this.outAlphabet).join('');
    }

    long(text) {
        return toSymbols(toNumber(text, this.outAlphabet), this.inAlphabet).join('');
    }
}

export default new Cipher(cipherCongig);
