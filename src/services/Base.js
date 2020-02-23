import LIVR from 'livr';
import Error from 'src/error';

export default class ServiceBase {
    static LOG_LEVEL = 'info'

    constructor(args) {
        this.context = args.context || {};
    }

    sanitizeContext({ context }) {
        if (!context) return;

        return context;
    }

    sanitizeParams(params) {
        return params;
    }

    checkPermissions() {
        const required = this.constructor.permissions;

        if (!required) return;
        const { user } = this.context;
        const notAllowed = !user || !user.permissions?.isAllowed(required);

        if (notAllowed) {
            throw new Error('ACTION_NOT_PERMITTED');
        }
    }

    async run(params) {
        await this.checkPermissions();

        const cleanParams = await this.validate(params);

        try {
            const result = await this.execute(cleanParams);

            return result;
        } catch (error) {
            throw error;
        }
    }

    validate(data) {
        return this.doValidation(data, this.constructor.rules);
    }

    doValidation(data, rules) {
        const validator = new LIVR.Validator(rules).prepare();

        return this._doValidationWithValidator(data, validator);
    }

    _doValidationWithValidator(data, validator) {
        const result = validator.validate(data);

        if (!result) {
            const fields = validator.getErrors();

            throw new Error('VALIDATION_FAILED', { fields });
        }

        return result;
    }
}
