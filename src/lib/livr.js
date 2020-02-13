import LIVR         from 'livr';
import extraRules   from 'livr-extra-rules';

const defaultRules = {
    ...extraRules,
    'list_or_one'(rule) {
        return value => {
            if (value === undefined || value === null || value === '') return;
            const validator = new LIVR.Validator({
                value : {
                    'or' : [
                        rule,
                        { 'list_of': rule }
                    ]
                }
            });

            if (!validator.validate({ value })) {
                return validator.getErrors().value;
            }

            return;
        };
    },
    'template'() {
        return value => {
            if (value === undefined || value === null || value === '') return;
            // const validator = new LIVR.Validator({
            //     value : { 'one_of': TEMPLATES }
            // });

            // if (!validator.validate({ value })) {
            //     return validator.getErrors().value;
            // }

            return;
        };
    },
    'to_array'() {
        return (value, params, outputArr) => {
            if (value === undefined || value === null || value === '') return;

            if (!Array.isArray(value)) {
                outputArr.push([ value ]);

                return;
            }

            return;
        };
    }
};

export default defaultRules;

LIVR.Validator.registerDefaultRules(defaultRules);
