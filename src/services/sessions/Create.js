import ms from 'ms';
import { jwt, appUrl, prefix }      from 'src/config.js';
import ServiceBase  from '../Base';

export default class SessionsCreate extends ServiceBase {
    static rules = {
        mode : [ 'required', { 'one_of': [ 'view', 'edit' ] }  ]
    };

    static permissions = [ 'read_content' ]

    async execute({ mode }) {
        return {
            data : {
            }
        };
    }
}
