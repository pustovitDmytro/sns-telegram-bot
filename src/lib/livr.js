import LIVR         from 'livr';
import extraRules   from 'livr-extra-rules';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const defaultRules = {
    ...extraRules,
    'date'() {
        return (value, params, outputArr) => {
            if (value === undefined || value === null || value === '') return;
            const date = dayjs.utc(value);

            if (!date.isValid()) return 'WRONG_DATE';
            outputArr.push(date);

            return;
        };
    }
};

export default defaultRules;

LIVR.Validator.registerDefaultRules(defaultRules);
