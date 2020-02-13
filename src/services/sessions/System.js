import { apiKey } from 'src/config';
import ServiceBase  from '../Base';

export default class SystemSessionsCheck extends ServiceBase {
    static LOG_LEVEL = 'verbose'

    static rules = {
        token : [ 'required', { eq: apiKey } ]
    };

    async execute() {}
}
