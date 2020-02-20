import aes from 'lib/aes';
import ServiceBase  from '../Base';

export default class SessionsCheck extends ServiceBase {
    static LOG_LEVEL = 'verbose'

    static rules = {
        token : [ 'required', 'string' ]
    };

    async execute({ token }) {
        return { telegram: aes.decrypt(token) };
    }
}
