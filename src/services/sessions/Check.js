import ServiceBase  from '../Base';

export default class SessionsCheck extends ServiceBase {
    static LOG_LEVEL = 'verbose'

    static rules = {
        documentId : [ 'required', 'uuid' ],
        repository : [ 'required', { 'one_of': [ 'cds', 'rpi' ] } ],
        token      : [ 'required', 'string' ] // TODO jwt rule
    };

    async execute({ token }) {
        console.log('token: ', token);


        return {
        };
    }
}
