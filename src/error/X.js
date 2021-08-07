import { inspect } from 'util';
import { UNKNOWN_ERROR_CODE, ERROR_CODES } from 'src/constants';

export default class X extends Error {
    #payload;

    constructor(payload) {
        super();

        this.name = this.constructor.name;
        this.#payload = payload;

        Error.captureStackTrace(this, this.constructor);
    }

    get payload() {
        return this.#payload;
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
            code    : this.code || ERROR_CODES[this.name] ||  ERROR_CODES.UNKNOWN_ERROR,
            message : this.message
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

        return {
            code    : ERROR_CODES.UNKNOWN_ERROR,
            message : UNKNOWN_ERROR_CODE
        };
    }
}
