import aes from 'lib/aes';
import ServiceBase  from '../Base';

export default class TgSessionsCheck extends ServiceBase {
    static LOG_LEVEL = 'verbose';

    static rules = {
        token : [ 'required', 'string' ]
    };

    async execute({ token }) {
        const decrypted = aes.decrypt(token);

        return { telegram : {
            chat      : decrypted.c,
            user      : decrypted.u,
            createdAt : decrypted.d
        } };
    }
}
