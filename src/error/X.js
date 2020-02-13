import { inspect } from 'util';
import { UNKNOWN_ERROR_CODE, ERROR_CODES } from 'src/constants';

export default class X extends Error {
    #code;
    #payload;

    constructor(code, data) {
        super();
        const actualErrorName = this.constructor.name;

        this.name = actualErrorName === 'X'
            ? code
            : actualErrorName;

        Error.captureStackTrace(this, this.constructor);

        this.#code = code;
        this.#payload = data;

        if (data?.fields) {
            this.fields = data.fields;
        }
    }

    get payload() {
        return  this.#payload;
    }

    static stringify(data) {
        return inspect(data, {
            showHidden  : false,
            depth       : null,
            breakLength : 'Infinity'
        });
    }

    render() {
        const error = {
            code    : this.#payload?.code || ERROR_CODES[this.#code] ||  ERROR_CODES[UNKNOWN_ERROR_CODE],
            message : this.#code
        };

        if (this.fields) {
            error.fields = this.fields;
        }

        return error;
    }

    static render(error) {
        if (error instanceof X) {
            return error.render();
        }
        const message = UNKNOWN_ERROR_CODE;

        return {
            code : ERROR_CODES[message],
            message
        };
    }
}
