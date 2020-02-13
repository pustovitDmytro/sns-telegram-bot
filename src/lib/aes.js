import crypto from 'crypto';
import { cipher as cipherCongig } from 'src/config';

class AES {
    constructor({ algorithm, key }) {
        this.algorithm = algorithm;
        this.key = key;
    }

    encrypt(text) {
        const cipher = crypto.createCipher(this.algorithm, this.key);

        let crypted = cipher.update(text, 'utf8', 'hex');

        crypted += cipher.final('hex');

        return crypted;
    }

    decrypt(encrypted) {
        const decipher = crypto.createDecipher(this.algorithm, this.key);

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
    inAlphabet = [ ...'0123456789abcdef' ]

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
